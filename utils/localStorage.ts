export interface Alternative {
  id: string
  text: string
  isCorrect: boolean
  explanation: string
}

export interface Question {
  id: string
  faculty?: string
  year?: string
  title?: string
  area?: string
  theme?: string
  question: string
  alternatives: Alternative[]
  explanation?: string
}

export interface UserProfile {
  name: string
  email: string
  institution: string
  graduationYear: string
  specialty: string
}

export interface UserNote {
  questionId: string
  note: string
  timestamp: number
}

export interface SimuladoResult {
  id: string
  name: string
  date: string
  totalQuestions: number
  correctAnswers: number
  incorrectAnswers: number
  timeSpent: number
  questions: {
    questionId: string
    selectedAnswer: string
    isCorrect: boolean
    timeSpent: number
  }[]
}

export interface AppData {
  questions: Question[]
  favorites: string[]
  saved: string[]
  notes: UserNote[]
  simuladoResults: SimuladoResult[]
  statistics: {
    totalAnswered: number
    totalCorrect: number
    totalIncorrect: number
    averageTime: number
    areaStats: {
      [area: string]: {
        answered: number
        correct: number
        incorrect: number
      }
    }
  }
  drLuzaumChat: {
    questionId: string
    messages: {
      role: 'user' | 'assistant'
      content: string
      timestamp: number
    }[]
  }[]
}

const STORAGE_KEY = 'rota-r1-data'

// Initialize question bank with sample questions
export function initializeQuestionBank(questions: Question[]) {
  try {
    const existingData = getAppData()
    
    // A VERIFICAÇÃO CRÍTICA: Se não houver questões no localStorage, popule-o.
    // A verificação "existingData.questions?.length" agora é segura.
    if (!existingData.questions || existingData.questions.length === 0) {
      console.log("Inicializando o banco de questões no localStorage...");
      const newData: AppData = {
        ...existingData, // Mantém outros dados como favoritos, se existirem
        questions: questions, // Popula com as questões fornecidas
        statistics: {
          totalAnswered: 0,
          totalCorrect: 0,
          totalIncorrect: 0,
          averageTime: 0,
          areaStats: {},
        }, // Zera as estatísticas
      };
      saveAppData(newData);
      console.log("Banco de questões inicializado com sucesso!");
    } else {
      console.log("Banco de questões já existe no localStorage.");
    }
  } catch (error) {
    console.error("Erro ao inicializar banco de questões:", error);
    // Em caso de erro, tenta criar um estado inicial limpo
    try {
      const cleanData: AppData = {
        questions: questions,
        favorites: [],
        saved: [],
        notes: [],
        simuladoResults: [],
        statistics: {
          totalAnswered: 0,
          totalCorrect: 0,
          totalIncorrect: 0,
          averageTime: 0,
          areaStats: {},
        },
        drLuzaumChat: [],
      };
      saveAppData(cleanData);
      console.log("Banco de questões criado com estado limpo após erro.");
    } catch (fallbackError) {
      console.error("Erro crítico ao criar banco de questões:", fallbackError);
    }
  }
}

// Get all app data
export function getAppData(): AppData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Erro ao carregar dados do localStorage:', error)
  }
  
  return {
    questions: [],
    favorites: [],
    saved: [],
    notes: [],
    simuladoResults: [],
    statistics: {
      totalAnswered: 0,
      totalCorrect: 0,
      totalIncorrect: 0,
      averageTime: 0,
      areaStats: {},
    },
    drLuzaumChat: [],
  }
}

// Save all app data
export function saveAppData(data: AppData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Erro ao salvar dados no localStorage:', error)
  }
}

// Question management
export function getQuestionsByArea(area: string | null): Question[] {
  const data = getAppData()
  if (!area) return data.questions
  return data.questions.filter(q => q.area?.toLowerCase() === area.toLowerCase())
}

export function getQuestionsByTheme(theme: string): Question[] {
  const data = getAppData()
  return data.questions.filter(q => q.theme?.toLowerCase() === theme.toLowerCase())
}

// Favorites management
export function getFavoriteQuestions(): Question[] {
  const data = getAppData()
  return data.questions.filter(q => data.favorites.includes(q.id))
}

export function isFavorite(questionId: string): boolean {
  const data = getAppData()
  return data.favorites.includes(questionId)
}

export function toggleFavorite(questionId: string): boolean {
  const data = getAppData()
  const index = data.favorites.indexOf(questionId)
  
  if (index > -1) {
    data.favorites.splice(index, 1)
  } else {
    data.favorites.push(questionId)
  }
  
  saveAppData(data)
  return !isFavorite(questionId)
}

// Saved questions management
export function getSavedQuestions(): Question[] {
  const data = getAppData()
  return data.questions.filter(q => data.saved.includes(q.id))
}

export function isSaved(questionId: string): boolean {
  const data = getAppData()
  return data.saved.includes(questionId)
}

export function toggleSaved(questionId: string): boolean {
  const data = getAppData()
  const index = data.saved.indexOf(questionId)
  
  if (index > -1) {
    data.saved.splice(index, 1)
  } else {
    data.saved.push(questionId)
  }
  
  saveAppData(data)
  return !isSaved(questionId)
}

// Notes management
export function getNote(questionId: string): string {
  const data = getAppData()
  const note = data.notes.find(n => n.questionId === questionId)
  return note?.note || ''
}

export function saveNote(questionId: string, note: string) {
  const data = getAppData()
  const existingIndex = data.notes.findIndex(n => n.questionId === questionId)
  
  if (existingIndex > -1) {
    data.notes[existingIndex].note = note
    data.notes[existingIndex].timestamp = Date.now()
  } else {
    data.notes.push({
      questionId,
      note,
      timestamp: Date.now(),
    })
  }
  
  saveAppData(data)
}

// Statistics management
export function updateStatistics(questionId: string, isCorrect: boolean, timeSpent: number) {
  const data = getAppData()
  const question = data.questions.find(q => q.id === questionId)
  
  if (question) {
    data.statistics.totalAnswered++
    if (isCorrect) {
      data.statistics.totalCorrect++
    } else {
      data.statistics.totalIncorrect++
    }
    
    // Update average time
    const totalTime = data.statistics.averageTime * (data.statistics.totalAnswered - 1) + timeSpent
    data.statistics.averageTime = totalTime / data.statistics.totalAnswered
    
    // Update area statistics
    if (question.area) {
      if (!data.statistics.areaStats[question.area]) {
        data.statistics.areaStats[question.area] = {
          answered: 0,
          correct: 0,
          incorrect: 0,
        }
      }
      
      data.statistics.areaStats[question.area].answered++
      if (isCorrect) {
        data.statistics.areaStats[question.area].correct++
      } else {
        data.statistics.areaStats[question.area].incorrect++
      }
    }
  }
  
  saveAppData(data)
}

// Simulado results management
export function saveSimuladoResult(result: SimuladoResult) {
  const data = getAppData()
  data.simuladoResults.push(result)
  saveAppData(data)
}

export function getSimuladoResults(): SimuladoResult[] {
  const data = getAppData()
  return data.simuladoResults.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Dr. Luzaum chat management
export function getDrLuzaumChat(questionId: string) {
  const data = getAppData()
  const chat = data.drLuzaumChat.find(c => c.questionId === questionId)
  return chat?.messages || []
}

export function saveDrLuzaumMessage(questionId: string, role: 'user' | 'assistant', content: string) {
  const data = getAppData()
  let chat = data.drLuzaumChat.find(c => c.questionId === questionId)
  
  if (!chat) {
    chat = {
      questionId,
      messages: [],
    }
    data.drLuzaumChat.push(chat)
  }
  
  chat.messages.push({
    role,
    content,
    timestamp: Date.now(),
  })
  
  saveAppData(data)
}



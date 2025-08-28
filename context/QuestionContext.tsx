import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { SimpleQuestion, AnswerStatistic } from '../types'; // Usando SimpleQuestion para compatibilidade
import { sampleQuestions } from '../data/sampleQuestions'; // Seu banco de dados inicial de questões

const LOCAL_STORAGE_KEY = 'rota-r1-data';

/**
 * Estrutura de dados que será salva no localStorage.
 * Mantemos apenas os IDs para economizar espaço e desacoplar os dados.
 */
interface StoredData {
  favorites: string[];
  saved: string[];
  notes: Record<string, string>; // Mapeia: questionId -> texto da nota
  statistics: Record<string, AnswerStatistic>; // questionId -> { attempts: number, correct: number }
  // Outros dados podem ser adicionados aqui no futuro
}

/**
 * Função segura para carregar o estado inicial.
 * Ela lê o banco de questões e aplica os estados 'isFavorited' e 'isSaved'
 * com base no que está salvo no localStorage.
 */
const loadInitialState = (): { questions: SimpleQuestion[], statistics: Record<string, AnswerStatistic> } => {
  try {
    const storedItem = localStorage.getItem(LOCAL_STORAGE_KEY);
    const storedData: StoredData = storedItem ? JSON.parse(storedItem) : { favorites: [], saved: [], notes: {}, statistics: {} };
    
    // Garante que os arrays existam para evitar erros
    const favorites = new Set(storedData.favorites || []);
    const saved = new Set(storedData.saved || []);
    const notes = storedData.notes || {};
    const statistics = storedData.statistics || {};

    const questions = sampleQuestions.map(q => ({
      ...q,
      isFavorited: favorites.has(q.id),
      isSaved: saved.has(q.id),
      note: notes[q.id] || '', // Carrega a anotação salva
    }));

    return { questions, statistics };
  } catch (error) {
    console.error('Falha ao carregar estado do localStorage. Usando estado padrão.', error);
    // Em caso de erro, retorna o estado limpo para evitar que o app quebre.
    return { 
      questions: sampleQuestions.map(q => ({ ...q, isFavorited: false, isSaved: false, note: '' })), 
      statistics: {} 
    };
  }
};

// --- Definição do Contexto, Tipos e Reducer ---

type State = {
  questions: SimpleQuestion[];
  statistics: Record<string, AnswerStatistic>;
};

type Action =
  | { type: 'TOGGLE_FAVORITE'; payload: { questionId: string } }
  | { type: 'TOGGLE_SAVE'; payload: { questionId: string } }
  | { type: 'UPDATE_NOTE'; payload: { questionId: string; note: string } }
  | { type: 'RECORD_ANSWER'; payload: { questionId: string; isCorrect: boolean } }
  | { type: 'RESET_STATISTICS' }; // Ação para zerar as estatísticas

type Dispatch = (action: Action) => void;

const QuestionStateContext = createContext<State | undefined>(undefined);
const QuestionDispatchContext = createContext<Dispatch | undefined>(undefined);

const questionReducer = (state: State, action: Action): State => {
  let newState: State;

  // 1. Calcula o próximo estado com base na ação
  switch (action.type) {
    case 'TOGGLE_FAVORITE': {
      newState = {
        ...state,
        questions: state.questions.map(q =>
          q.id === action.payload.questionId ? { ...q, isFavorited: !q.isFavorited } : q
        ),
      };
      break;
    }
    case 'TOGGLE_SAVE': {
      newState = {
        ...state,
        questions: state.questions.map(q =>
          q.id === action.payload.questionId ? { ...q, isSaved: !q.isSaved } : q
        ),
      };
      break;
    }
    case 'UPDATE_NOTE': { // Lógica para a nova ação
      newState = {
        ...state,
        questions: state.questions.map(q =>
          q.id === action.payload.questionId ? { ...q, note: action.payload.note } : q
        ),
      };
      break;
    }
    case 'RECORD_ANSWER': {
      const { questionId, isCorrect } = action.payload;
      const currentStat = state.statistics[questionId] || { attempts: 0, correct: 0 };
      const newStat = {
        attempts: currentStat.attempts + 1,
        correct: currentStat.correct + (isCorrect ? 1 : 0),
      };
      newState = {
        ...state,
        statistics: {
          ...state.statistics,
          [questionId]: newStat,
        },
      };
      break;
    }
    case 'RESET_STATISTICS': {
      newState = { ...state, statistics: {} };
      break;
    }
    default:
      // Se a ação for desconhecida, não faz nada.
      return state;
  }
  
  // 2. Efeito colateral: Sincroniza o novo estado com o localStorage
  try {
    const favorites = newState.questions.filter(q => q.isFavorited).map(q => q.id);
    const saved = newState.questions.filter(q => q.isSaved).map(q => q.id);
    const notes = newState.questions.reduce((acc, q) => {
      if (q.note) {
        acc[q.id] = q.note;
      }
      return acc;
    }, {} as Record<string, string>);
    
    const storedItem = localStorage.getItem(LOCAL_STORAGE_KEY);
    const fullData = storedItem ? JSON.parse(storedItem) : {};

    const dataToStore: StoredData = { ...fullData, favorites, saved, notes, statistics: newState.statistics };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToStore));
  } catch (error) {
    console.error('Falha ao sincronizar estado com localStorage:', error);
  }

  // 3. Retorna o novo estado para a UI
  return newState;
};

// --- Provedor e Hooks ---

export const QuestionProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(questionReducer, loadInitialState());

  return (
    <QuestionStateContext.Provider value={state}>
      <QuestionDispatchContext.Provider value={dispatch}>
        {children}
      </QuestionDispatchContext.Provider>
    </QuestionStateContext.Provider>
  );
};

export const useQuestionState = () => {
  const context = useContext(QuestionStateContext);
  if (context === undefined) {
    throw new Error('useQuestionState deve ser usado dentro de um QuestionProvider');
  }
  return context;
};

export const useQuestionDispatch = () => {
  const context = useContext(QuestionDispatchContext);
  if (context === undefined) {
    throw new Error('useQuestionDispatch deve ser usado dentro de um QuestionProvider');
  }
  return context;
};

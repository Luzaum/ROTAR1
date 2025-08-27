import React, { useEffect, useState, useCallback } from 'react'
import { Minimize, Star, Bookmark, Clock, ChevronRight } from 'lucide-react'
import { DrLuzaumModal } from './DrLuzaumModal'
import { ActionButton } from '../ui/ActionButton'
import {
  toggleFavorite,
  toggleSaved,
  saveNote,
  getNote,
  isFavorite,
  isSaved,
  updateStatistics,
} from '../../utils/localStorage'

interface Alternative {
  id: string
  text: string
  isCorrect: boolean
  explanation: string
}

interface Question {
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

interface QuestionCardProps {
  question: Question
  isFocusMode: boolean
  onExitFocusMode: () => void
  onNextQuestion?: () => void
}

export function QuestionCard({
  question,
  isFocusMode,
  onExitFocusMode,
  onNextQuestion,
}: QuestionCardProps) {
  // Estados principais para controlar o fluxo da questão
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isRevealed, setIsRevealed] = useState<boolean>(false)
  
  // Estados secundários
  const [isFav, setIsFav] = useState<boolean>(false)
  const [isSav, setIsSav] = useState<boolean>(false)
  const [note, setNote] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [timer, setTimer] = useState<number>(0)
  const [timerActive, setTimerActive] = useState<boolean>(true)

  // Carregar estado inicial quando a questão muda
  useEffect(() => {
    // Resetar estados principais
    setSelectedAnswer(null)
    setIsRevealed(false)
    
    // Carregar estados do localStorage
    try {
      setIsFav(isFavorite(question.id))
      setIsSav(isSaved(question.id))
      setNote(getNote(question.id))
    } catch (error) {
      console.error('Erro ao carregar dados do localStorage:', error)
      // Fallback para valores padrão
      setIsFav(false)
      setIsSav(false)
      setNote('')
    }
    
    // Resetar timer
    setTimer(0)
    setTimerActive(true)
  }, [question.id])

  // Timer effect
  useEffect(() => {
    if (!timerActive) return

    const intervalId = setInterval(() => {
      setTimer((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [timerActive])

  // Função para selecionar uma resposta
  const handleSelectAnswer = useCallback((answerId: string) => {
    if (!isRevealed) {
      setSelectedAnswer(answerId)
    }
  }, [isRevealed])

  // Função para confirmar e revelar a resposta
  const handleConfirmAnswer = useCallback(() => {
    if (selectedAnswer && !isRevealed) {
      setIsRevealed(true)
      setTimerActive(false)
      
      try {
        // Atualizar estatísticas
        const isCorrect = question.alternatives.find(alt => alt.id === selectedAnswer)?.isCorrect || false
        updateStatistics(question.id, isCorrect, timer)
      } catch (error) {
        console.error('Erro ao atualizar estatísticas:', error)
      }
    }
  }, [selectedAnswer, isRevealed, question.id, question.alternatives, timer])

  // Função para alternar favorito
  const handleToggleFavorite = useCallback(() => {
    try {
      const newState = toggleFavorite(question.id)
      setIsFav(newState)
    } catch (error) {
      console.error('Erro ao alternar favorito:', error)
    }
  }, [question.id])

  // Função para alternar salvo
  const handleToggleSaved = useCallback(() => {
    try {
      const newState = toggleSaved(question.id)
      setIsSav(newState)
    } catch (error) {
      console.error('Erro ao alternar salvo:', error)
    }
  }, [question.id])

  // Função para salvar nota
  const handleSaveNote = useCallback(() => {
    try {
      saveNote(question.id, note)
    } catch (error) {
      console.error('Erro ao salvar nota:', error)
    }
  }, [question.id, note])

  // Função para próxima questão
  const handleNextQuestion = useCallback(() => {
    if (onNextQuestion) {
      onNextQuestion()
    }
  }, [onNextQuestion])

  // Formatar tempo
  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }, [])

  // Criar título da questão
  const questionTitle = question.faculty && question.year && question.area && question.theme
    ? `(${question.faculty}-${question.year}) ${question.area} - ${question.theme}`
    : question.title || ''

  return (
    <div
      className={`bg-card border rounded-lg shadow-card ${
        isFocusMode ? 'max-w-4xl mx-auto' : ''
      }`}
    >
      {/* Cabeçalho da Questão */}
      <div className="p-4 md:p-6 border-b flex justify-between items-start">
        <div>
          <h2 className="font-bold text-primary">{questionTitle}</h2>
          <p className="mt-2 text-lg">{question.question}</p>
        </div>
        <div className="flex items-start gap-2">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock size={16} />
            <span className="text-sm">{formatTime(timer)}</span>
          </div>
          {isFocusMode && (
            <button
              onClick={onExitFocusMode}
              className="p-2 rounded-md hover:bg-accent shrink-0 ml-4"
              title="Sair do Modo Foco"
            >
              <Minimize size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Alternativas */}
      <div className="p-4 md:p-6">
        <div className="space-y-4">
          {question.alternatives.map((alt) => {
            let bgColor = 'bg-card'
            let borderColor = 'border-border'
            let textColor = 'text-foreground'
            
            if (isRevealed) {
              if (alt.isCorrect) {
                bgColor = 'bg-green-100 dark:bg-green-900/30'
                borderColor = 'border-green-500'
                textColor = 'text-green-800 dark:text-green-200'
              } else if (selectedAnswer === alt.id && !alt.isCorrect) {
                bgColor = 'bg-red-100 dark:bg-red-900/30'
                borderColor = 'border-red-500'
                textColor = 'text-red-800 dark:text-red-200'
              }
            } else if (selectedAnswer === alt.id) {
              borderColor = 'border-primary'
            }
            
            return (
              <div
                key={alt.id}
                className={`p-4 border rounded-md cursor-pointer ${bgColor} ${borderColor} ${textColor} transition-colors duration-200 ease-in-out shadow-card hover:shadow-card-hover`}
                onClick={() => handleSelectAnswer(alt.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/50 flex items-center justify-center shrink-0 mt-0.5">
                    {alt.id.toUpperCase()}
                  </div>
                  <div>
                    <p>{alt.text}</p>
                    {isRevealed && (
                      <div className="mt-2 text-sm">
                        <p className="text-muted-foreground">
                          {alt.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Botões de Ação */}
        {!isRevealed ? (
          <div className="mt-6">
            <button
              onClick={handleConfirmAnswer}
              disabled={!selectedAnswer}
              className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 px-6 py-2 rounded-md font-medium transition-colors shadow-card-hover"
            >
              Confirmar Resposta
            </button>
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            {/* Performance dos Pares */}
            <div className="text-sm text-muted-foreground">
              📊 68% dos usuários acertaram esta questão.
            </div>

            {/* Explicação */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">
                🧠 Como Pensar na Questão
              </h3>
              <p>
                Identifique a Classe do Fármaco Principal: A Furosemida é o
                diurético de alça de Henle mais famoso e utilizado.
              </p>
              <p>
                Entenda o Cenário Clínico: O cão se tornou "refratário" à
                furosemida, um fenômeno comum no tratamento crônico da
                insuficiência cardíaca congestiva (ICC). Isso significa que
                doses cada vez maiores de furosemida não estão mais produzindo o
                efeito diurético desejado.
              </p>
              <p>
                Entenda o Comando: A pergunta pede por outro diurético de alça
                para substituir ou ser usado em casos refratários.
              </p>

              <h3 className="font-semibold text-lg">
                🔬 Análise Detalhada das Alternativas
              </h3>
              <ul className="space-y-2 list-disc pl-5">
                {question.alternatives.map((alt) => (
                  <li key={alt.id}>
                    <span className="font-medium">{alt.id.toUpperCase()}:</span>{' '}
                    {alt.explanation}
                  </li>
                ))}
              </ul>
            </div>

            {/* Ações da Questão */}
            <div className="border-t pt-4 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <ActionButton
                  isToggled={isFav}
                  onClick={handleToggleFavorite}
                  toggledClassName="text-yellow-400 fill-yellow-400"
                >
                  <Star size={18} />
                </ActionButton>
                <span className={isFav ? 'text-yellow-500' : ''}>
                  {isFav ? 'Favoritada' : 'Favoritar'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ActionButton
                  isToggled={isSav}
                  onClick={handleToggleSaved}
                  toggledClassName="text-blue-500 fill-blue-500"
                >
                  <Bookmark size={18} />
                </ActionButton>
                <span className={isSav ? 'text-primary' : ''}>
                  {isSav ? 'Salva' : 'Salvar'}
                </span>
              </div>
              <div className="flex-1">
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  onBlur={handleSaveNote}
                  placeholder="Adicionar Notas Pessoais..."
                  className="w-full p-3 border rounded-md bg-background resize-none h-24 transition-colors focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex justify-between">
              {/* Botão Dr. Luzaum */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-medium transition-colors shadow-card-hover"
              >
                Revisão Completa com Dr. Luzaum
              </button>

              {/* Botão Próxima Questão */}
              {onNextQuestion && (
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-3 rounded-md font-medium transition-colors shadow-card-hover"
                >
                  <span>Próxima Questão</span>
                  <ChevronRight size={18} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal Dr. Luzaum */}
      <DrLuzaumModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        questionId={question.id}
      />
    </div>
  )
}



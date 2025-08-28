import React, { useState } from 'react'
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react'
import { DrLuzaumModal } from '../study/DrLuzaumModal'
import { ActionIconButton } from '../ui/ActionIconButton'
import { useQuestionDispatch } from '../../context/QuestionContext'

interface Alternative {
  id: string
  text: string
  isCorrect: boolean
  explanation: string
}

import { SimpleQuestion } from '../../types'

interface Question extends SimpleQuestion {}

interface AcervoQuestionCardProps {
  question: Question
}

export function AcervoQuestionCard({ question }: AcervoQuestionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const dispatch = useQuestionDispatch()

  // Encontrar a alternativa correta
  const correctAlternative = question.alternatives.find(alt => alt.isCorrect)

  // Criar título da questão
  const questionTitle = question.faculty && question.year && question.area && question.theme
    ? `(${question.faculty}-${question.year}) ${question.area} - ${question.theme}`
    : question.title || ''

  // Funções para alternar favorito e salvo
  const handleToggleFavorite = () => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: { questionId: question.id } })
  }

  const handleToggleSaved = () => {
    dispatch({ type: 'TOGGLE_SAVE', payload: { questionId: question.id } })
  }

  return (
    <div className="bg-card border rounded-lg shadow-card hover:shadow-card-hover transition-all duration-200">
      {/* Cabeçalho da Questão */}
      <div className="p-4 md:p-6 border-b">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-primary mb-2">{questionTitle}</h3>
            <p className="text-lg leading-relaxed">{question.question}</p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-4 p-2 rounded-md hover:bg-accent transition-colors"
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      {/* Conteúdo Expandido */}
      {isExpanded && (
        <div className="p-4 md:p-6 space-y-6">
          {/* Alternativas */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Alternativas:</h4>
            {question.alternatives.map((alt) => (
              <div
                key={alt.id}
                className={`p-4 border rounded-md transition-colors ${
                  alt.isCorrect
                    ? 'bg-green-100 dark:bg-green-900/30 border-green-500'
                    : 'bg-red-100 dark:bg-red-900/30 border-red-500'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    alt.isCorrect
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}>
                    {alt.id.toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${
                      alt.isCorrect
                        ? 'text-green-800 dark:text-green-200'
                        : 'text-red-800 dark:text-red-200'
                    }`}>
                      {alt.text}
                    </p>
                    <div className="mt-2 text-sm">
                      <p className="text-muted-foreground">
                        {alt.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resposta Correta */}
          {correctAlternative && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                ✅ Resposta Correta: {correctAlternative.id.toUpperCase()}
              </h4>
              <p className="text-green-700 dark:text-green-300">
                {correctAlternative.text}
              </p>
            </div>
          )}

          {/* Explicação Geral */}
          {question.explanation && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                📚 Explicação Geral
              </h4>
              <p className="text-blue-700 dark:text-blue-300">
                {question.explanation}
              </p>
            </div>
          )}

          {/* Ações da Questão */}
          <div className="flex flex-wrap gap-4 justify-center">
            <ActionIconButton
              type="favorite"
              isToggled={question.isFavorited || false}
              onClick={handleToggleFavorite}
            />
            <ActionIconButton
              type="save"
              isToggled={question.isSaved || false}
              onClick={handleToggleSaved}
            />
          </div>

          {/* Botão Dr. Luzaum */}
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-medium transition-colors shadow-card-hover"
            >
              <BookOpen size={18} />
              <span>Revisão com Dr. Luzaum</span>
            </button>
          </div>
        </div>
      )}

      {/* Modal Dr. Luzaum */}
      <DrLuzaumModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        questionId={question.id}
      />
    </div>
  )
}

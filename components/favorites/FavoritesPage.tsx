import React, { useState } from 'react'
import { Star, Trash2 } from 'lucide-react'
import { useQuestionState, useQuestionDispatch } from '../../context/QuestionContext'
import { ExpandableQuestion } from '../review/ExpandableQuestion'
import { DrLuzaumPanel } from '../DrLuzaumPanel'
import { SimpleQuestion } from '../../types'

export function FavoritesPage() {
  const [editMode, setEditMode] = useState(false)
  const [selectedToDelete, setSelectedToDelete] = useState<string[]>([])
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [questionForReview, setQuestionForReview] = useState<SimpleQuestion | null>(null)

  const { questions } = useQuestionState()
  const dispatch = useQuestionDispatch()
  
  const favoriteQuestions = questions.filter(q => q.isFavorited)

  const openDrLuzaum = (question: SimpleQuestion) => {
    setQuestionForReview(question);
  };

  const closeDrLuzaum = () => {
    setQuestionForReview(null);
  };



  const handleToggleSelection = (questionId: string) => {
    setSelectedToDelete(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    )
  }

  const handleDeleteSelected = () => {
    selectedToDelete.forEach(questionId => {
      dispatch({ type: 'TOGGLE_FAVORITE', payload: { questionId } })
    })
    setSelectedToDelete([])
    setEditMode(false)
    setShowConfirmDialog(false)
  }

  return (
    <div className="w-full p-6 md:p-8 bg-background">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Questões Favoritas</h1>
        <div className="flex gap-2">
          {favoriteQuestions.length > 0 && (
            <button
              onClick={() => setEditMode(!editMode)}
              className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              {editMode ? 'Cancelar' : 'Editar'}
            </button>
          )}
          {editMode && selectedToDelete.length > 0 && (
            <button
              onClick={() => setShowConfirmDialog(true)}
              className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
            >
              Excluir ({selectedToDelete.length})
            </button>
          )}
        </div>
      </div>

      {favoriteQuestions.length === 0 ? (
        <div className="text-center py-12">
          <Star className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Nenhuma questão favoritada</h3>
          <p className="text-muted-foreground">
            As questões que você favoritar aparecerão aqui para fácil acesso.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {favoriteQuestions.map((question) => (
            <div key={question.id} className="relative">
              {editMode && (
                <div className="absolute top-2 left-2 z-10">
                  <input
                    type="checkbox"
                    checked={selectedToDelete.includes(question.id)}
                    onChange={() => handleToggleSelection(question.id)}
                    className="w-4 h-4"
                  />
                </div>
              )}
              <ExpandableQuestion 
                question={question} 
                onDrLuzaumClick={() => openDrLuzaum(question)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
          <div className="relative bg-card border rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirmar exclusão</h3>
            <p className="text-muted-foreground mb-6">
              Tem certeza que deseja remover {selectedToDelete.length} questão(ões) dos favoritos?
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/90"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteSelected}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Dr. Luzaum */}
      {questionForReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={closeDrLuzaum} />
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <DrLuzaumPanel
              question={questionForReview as any}
              onClose={closeDrLuzaum}
            />
          </div>
        </div>
      )}
    </div>
  )
}




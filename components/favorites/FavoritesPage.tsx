import React, { useState } from 'react'
import { getFavoriteQuestions, toggleFavorite, getNote } from '../../utils/localStorage'
import { Star, Trash2 } from 'lucide-react'

export function FavoritesPage() {
  const [editMode, setEditMode] = useState(false)
  const [selectedToDelete, setSelectedToDelete] = useState<string[]>([])
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const favoriteQuestions = getFavoriteQuestions()

  const handleToggleSelection = (questionId: string) => {
    setSelectedToDelete(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    )
  }

  const handleDeleteSelected = () => {
    selectedToDelete.forEach(questionId => {
      toggleFavorite(questionId)
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
            <div
              key={question.id}
              className={`bg-card border rounded-lg p-4 transition-colors ${
                editMode && selectedToDelete.includes(question.id)
                  ? 'border-primary bg-primary/5'
                  : 'hover:bg-accent/50'
              }`}
            >
              <div className="flex items-start gap-4">
                {editMode && (
                  <input
                    type="checkbox"
                    checked={selectedToDelete.includes(question.id)}
                    onChange={() => handleToggleSelection(question.id)}
                    className="mt-1"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-muted-foreground">
                      {question.faculty} - {question.year}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {question.area} - {question.theme}
                    </span>
                  </div>
                  <h3 className="font-medium mb-2">{question.question}</h3>
                  {getNote(question.id) && (
                    <div className="bg-muted/50 rounded p-2 text-sm">
                      <strong>Nota:</strong> {getNote(question.id)}
                    </div>
                  )}
                </div>
                {editMode && (
                  <button
                    onClick={() => handleToggleSelection(question.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
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
    </div>
  )
}



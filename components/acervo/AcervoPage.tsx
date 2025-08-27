import React, { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import { getAppData } from '../../utils/localStorage'
import { AcervoQuestionCard } from './AcervoQuestionCard'

export function AcervoPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedArea, setSelectedArea] = useState<string>('Todas')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const appData = getAppData()
  const questions = appData.questions

  const areas = ['Todas', 'Clínica Médica', 'Clínica Cirúrgica', 'Diagnóstico por Imagem', 'Anestesiologia', 'Laboratório Clínico', 'Saúde Pública']

  // Filter questions
  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.area?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.theme?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesArea = selectedArea === 'Todas' || question.area === selectedArea

    return matchesSearch && matchesArea
  })

  return (
    <div className="w-full p-6 md:p-8 bg-background">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Acervo de Questões</h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Buscar questões..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 border rounded-md bg-card hover:bg-accent/50"
          >
            <Filter size={16} />
            <span>{selectedArea}</span>
          </button>
          {isFilterOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-card z-10">
              <div className="py-1">
                {areas.map((area) => (
                  <button
                    key={area}
                    className="block w-full text-left px-4 py-2 hover:bg-accent"
                    onClick={() => {
                      setSelectedArea(area)
                      setIsFilterOpen(false)
                    }}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhuma questão encontrada</h3>
            <p className="text-muted-foreground">
              Tente ajustar os filtros ou termos de busca.
            </p>
          </div>
        ) : (
          <>
            <div className="text-sm text-muted-foreground mb-4">
              {filteredQuestions.length} questão(ões) encontrada(s)
            </div>
            {filteredQuestions.map((question) => (
              <AcervoQuestionCard key={question.id} question={question} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}



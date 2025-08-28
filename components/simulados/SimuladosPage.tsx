import React, { useState } from 'react'
import { Clock, Users, BarChart3 } from 'lucide-react'

interface Area {
  id: string
  name: string
}

// Função segura para carregar resultados de simulados
const loadSimuladoResults = () => {
  try {
    const stored = localStorage.getItem('rota-r1-simulado-results');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function SimuladosPage() {
  const [activeTab, setActiveTab] = useState<'create' | 'history'>('create')
  const [simuladoName, setSimuladoName] = useState('')
  const [totalQuestions, setTotalQuestions] = useState(20)
  const [timeLimit, setTimeLimit] = useState(60)
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])
  const [countsByArea, setCountsByArea] = useState<Record<string, number>>({})
  
  const simuladoResults = loadSimuladoResults()

  const areas: Area[] = [
    { id: 'clinica-medica', name: 'Clínica Médica' },
    { id: 'clinica-cirurgica', name: 'Clínica Cirúrgica' },
    { id: 'diagnostico-imagem', name: 'Diagnóstico por Imagem' },
    { id: 'anestesiologia', name: 'Anestesiologia' },
    { id: 'laboratorio-clinico', name: 'Laboratório Clínico' },
    { id: 'saude-publica', name: 'Saúde Pública' },
  ]

  const handleSelectArea = (areaId: string) => {
    if (selectedAreas.includes(areaId)) {
      setSelectedAreas(selectedAreas.filter(id => id !== areaId))
      const newCounts = { ...countsByArea }
      delete newCounts[areaId]
      setCountsByArea(newCounts)
    } else {
      setSelectedAreas([...selectedAreas, areaId])
    }
  }

  const handleCountChange = (areaId: string, count: number) => {
    setCountsByArea(prev => ({ ...prev, [areaId]: isNaN(count) ? 0 : count }))
  }

  const allocatedQuestions = Object.values(countsByArea).reduce((sum, count) => sum + count, 0)
  const remainingQuestions = totalQuestions - allocatedQuestions

  return (
    <div className="w-full p-6 md:p-8 bg-background">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Simulados</h1>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab('create')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'create'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Criar Simulado
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'history'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Histórico
        </button>
      </div>

      {activeTab === 'create' ? (
        <div className="space-y-6">
          {/* Quick Start */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Início Rápido</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 border rounded-lg hover:bg-accent/50 transition-colors text-left">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-medium">Simulado Completo</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  60 questões em 3 horas
                </p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-accent/50 transition-colors text-left">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-medium">Por Área</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Questões específicas por área
                </p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-accent/50 transition-colors text-left">
                <div className="flex items-center gap-3 mb-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <span className="font-medium">Personalizado</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Configure seu próprio simulado
                </p>
              </button>
            </div>
          </div>

          {/* Custom Simulado */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Simulado Personalizado</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nome do Simulado
                </label>
                <input
                  type="text"
                  placeholder="Ex: Simulado Clínica Médica"
                  value={simuladoName}
                  onChange={(e) => setSimuladoName(e.target.value)}
                  className="w-full p-3 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Número de Questões
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={totalQuestions}
                    onChange={(e) => setTotalQuestions(parseInt(e.target.value) || 0)}
                    className="w-full p-3 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tempo Limite (minutos)
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="300"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(parseInt(e.target.value) || 0)}
                    className="w-full p-3 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              {/* Contador de Questões */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Questões alocadas: {allocatedQuestions} / {totalQuestions}
                  </span>
                  <span className={`text-sm font-medium ${
                    remainingQuestions >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    Restantes: {remainingQuestions}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Áreas e Distribuição
                </label>
                <div className="space-y-3">
                  {areas.map((area) => (
                    <div key={area.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <label className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          checked={selectedAreas.includes(area.id)}
                          onChange={() => handleSelectArea(area.id)}
                          className="rounded"
                        />
                        <span className="text-sm font-medium">{area.name}</span>
                      </label>
                      {selectedAreas.includes(area.id) && (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            className="w-20 p-2 border rounded text-sm"
                            placeholder="Qtd."
                            min="0"
                            max={totalQuestions}
                            value={countsByArea[area.id] || ''}
                            onChange={(e) => handleCountChange(area.id, parseInt(e.target.value) || 0)}
                          />
                          <span className="text-xs text-muted-foreground">questões</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <button 
                className={`w-full py-3 rounded-md font-medium transition-colors ${
                  remainingQuestions === 0 && selectedAreas.length > 0 && simuladoName.trim()
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={remainingQuestions !== 0 || selectedAreas.length === 0 || !simuladoName.trim()}
              >
                {remainingQuestions === 0 && selectedAreas.length > 0 && simuladoName.trim()
                  ? 'Criar e Iniciar Simulado'
                  : 'Complete a configuração para iniciar'
                }
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {simuladoResults.length === 0 ? (
            <div className="text-center py-12">
              <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum simulado realizado</h3>
              <p className="text-muted-foreground">
                Complete seu primeiro simulado para ver o histórico aqui.
              </p>
            </div>
          ) : (
            simuladoResults.map((result) => (
              <div key={result.id} className="bg-card border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{result.name}</h3>
                  <span className="text-sm text-muted-foreground">
                    {new Date(result.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Questões:</span>
                    <span className="ml-1 font-medium">{result.totalQuestions}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Acertos:</span>
                    <span className="ml-1 font-medium text-green-600">
                      {result.correctAnswers}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Taxa de Acerto:</span>
                    <span className="ml-1 font-medium">
                      {Math.round((result.correctAnswers / result.totalQuestions) * 100)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tempo:</span>
                    <span className="ml-1 font-medium">
                      {Math.round(result.timeSpent / 60)}min
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}



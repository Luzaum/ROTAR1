import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { PerformanceRadarChart } from '../dashboard/PerformanceRadarChart'
import { ProgressRings } from '../dashboard/ProgressRings'
import { ChevronDown, TrendingUp, TrendingDown, Target } from 'lucide-react'

interface ThemeStats {
  name: string
  answered: number
  correct: number
  incorrect: number
  percentage: number
}

export function EstatisticasPage() {
  const [searchParams] = useSearchParams()
  const [selectedArea, setSelectedArea] = useState<string>('clinica-medica')
  const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false)
  
  // Função segura para carregar dados de estatísticas
  const loadStatistics = () => {
    try {
      const stored = localStorage.getItem('rota-r1-data');
      const data = stored ? JSON.parse(stored) : {};
      return data.statistics || {};
    } catch {
      return {};
    }
  }

  const stats = loadStatistics()

  // Áreas disponíveis
  const areas = [
    { id: 'clinica-medica', name: 'Clínica Médica' },
    { id: 'clinica-cirurgica', name: 'Clínica Cirúrgica' },
    { id: 'diagnostico-imagem', name: 'Diagnóstico por Imagem' },
    { id: 'anestesiologia', name: 'Anestesiologia' },
    { id: 'laboratorio-clinico', name: 'Laboratório Clínico' },
    { id: 'saude-publica', name: 'Saúde Pública' },
  ]

  // Dados simulados para temas (em um app real, viriam do backend)
  const getThemeStats = (areaId: string): ThemeStats[] => {
    const themesByArea: Record<string, ThemeStats[]> = {
      'clinica-medica': [
        { name: 'Cardiologia', answered: 45, correct: 38, incorrect: 7, percentage: 84 },
        { name: 'Nefrologia', answered: 32, correct: 25, incorrect: 7, percentage: 78 },
        { name: 'Gastroenterologia', answered: 28, correct: 20, incorrect: 8, percentage: 71 },
        { name: 'Endocrinologia', answered: 35, correct: 29, incorrect: 6, percentage: 83 },
        { name: 'Dermatologia', answered: 22, correct: 18, incorrect: 4, percentage: 82 },
      ],
      'clinica-cirurgica': [
        { name: 'Ortopedia', answered: 38, correct: 30, incorrect: 8, percentage: 79 },
        { name: 'Neurologia', answered: 25, correct: 19, incorrect: 6, percentage: 76 },
        { name: 'Oftalmologia', answered: 20, correct: 16, incorrect: 4, percentage: 80 },
        { name: 'Urologia', answered: 15, correct: 12, incorrect: 3, percentage: 80 },
      ],
      'diagnostico-imagem': [
        { name: 'Radiografia', answered: 30, correct: 25, incorrect: 5, percentage: 83 },
        { name: 'Ultrassonografia', answered: 25, correct: 20, incorrect: 5, percentage: 80 },
        { name: 'Tomografia', answered: 18, correct: 14, incorrect: 4, percentage: 78 },
      ],
      'anestesiologia': [
        { name: 'Anestesia Geral', answered: 22, correct: 18, incorrect: 4, percentage: 82 },
        { name: 'Anestesia Local', answered: 18, correct: 15, incorrect: 3, percentage: 83 },
        { name: 'Monitoramento', answered: 15, correct: 12, incorrect: 3, percentage: 80 },
      ],
      'laboratorio-clinico': [
        { name: 'Hematologia', answered: 28, correct: 23, incorrect: 5, percentage: 82 },
        { name: 'Bioquímica', answered: 25, correct: 20, incorrect: 5, percentage: 80 },
        { name: 'Microbiologia', answered: 20, correct: 16, incorrect: 4, percentage: 80 },
      ],
      'saude-publica': [
        { name: 'Epidemiologia', answered: 20, correct: 16, incorrect: 4, percentage: 80 },
        { name: 'Vigilância Sanitária', answered: 18, correct: 14, incorrect: 4, percentage: 78 },
        { name: 'Zoonoses', answered: 15, correct: 12, incorrect: 3, percentage: 80 },
      ],
    }
    
    return themesByArea[areaId] || []
  }

  // Obter recomendações baseadas no desempenho
  const getRecommendations = (): string[] => {
    const allThemes = areas.flatMap(area => getThemeStats(area.id))
    const worstThemes = allThemes
      .filter(theme => theme.answered >= 10) // Mínimo de questões respondidas
      .sort((a, b) => a.percentage - b.percentage)
      .slice(0, 3)
    
    return worstThemes.map(theme => theme.name)
  }

  // Pré-selecionar área baseada na URL
  useEffect(() => {
    const areaFromUrl = searchParams.get('area')
    if (areaFromUrl && areas.find(area => area.id === areaFromUrl)) {
      setSelectedArea(areaFromUrl)
    }
  }, [searchParams, areas])

  const currentArea = areas.find(area => area.id === selectedArea)
  const themeStats = getThemeStats(selectedArea)
  const recommendations = getRecommendations()

  return (
    <div className="w-full p-6 md:p-8 bg-background">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Estatísticas Detalhadas</h1>

      {/* Seção 1: Visão Geral */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Performance Geral</h2>
          <PerformanceRadarChart />
        </div>
        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Progresso por Área</h2>
          <ProgressRings />
        </div>
      </div>

      {/* Seção 2: Análise Detalhada por Tema */}
      <div className="bg-card border rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Análise por Tema</h2>
          <div className="relative">
            <button
              onClick={() => setIsAreaDropdownOpen(!isAreaDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 border rounded-md bg-background hover:bg-accent/50"
            >
              <span>{currentArea?.name}</span>
              <ChevronDown size={16} />
            </button>
            {isAreaDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-card z-10 border">
                {areas.map((area) => (
                  <button
                    key={area.id}
                    className="block w-full text-left px-4 py-2 hover:bg-accent"
                    onClick={() => {
                      setSelectedArea(area.id)
                      setIsAreaDropdownOpen(false)
                    }}
                  >
                    {area.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {themeStats.map((theme) => (
            <div key={theme.name} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{theme.name}</h3>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground">
                    {theme.answered} questões
                  </span>
                  <span className={`font-medium ${
                    theme.percentage >= 80 ? 'text-green-600' : 
                    theme.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {theme.percentage}% acerto
                  </span>
                </div>
              </div>
              
              {/* Barra de Progresso */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div className="flex h-full">
                  <div 
                    className="bg-green-500 h-full transition-all duration-300"
                    style={{ width: `${(theme.correct / theme.answered) * 100}%` }}
                  />
                  <div 
                    className="bg-red-500 h-full transition-all duration-300"
                    style={{ width: `${(theme.incorrect / theme.answered) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{theme.correct} acertos</span>
                <span>{theme.incorrect} erros</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seção 3: Recomendações de Estudo */}
      <div className="bg-card border rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Recomendações de Estudo 🧠</h2>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-blue-800 dark:text-blue-200 mb-3">
            Com base no seu desempenho, recomendamos focar nos seguintes temas:
          </p>
          <ul className="space-y-2">
            {recommendations.map((theme, index) => (
              <li key={theme} className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                <span className="w-6 h-6 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </span>
                <span className="font-medium">{theme}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                Melhor Área
              </p>
              <p className="text-xs text-green-600 dark:text-green-400">
                Cardiologia (84%)
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <Target className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Foco Principal
              </p>
              <p className="text-xs text-yellow-600 dark:text-yellow-400">
                Gastroenterologia (71%)
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <TrendingDown className="h-5 w-5 text-red-600" />
            <div>
              <p className="text-sm font-medium text-red-800 dark:text-red-200">
                Precisa Melhorar
              </p>
              <p className="text-xs text-red-600 dark:text-red-400">
                Nefrologia (78%)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

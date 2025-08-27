import React, { useEffect, useState } from 'react'
import { QuestionCard } from './QuestionCard'
import { Filter, Maximize } from 'lucide-react'
import {
  getQuestionsByArea,
  getQuestionsByTheme,
} from '../../utils/localStorage'

export function StudyPage() {
  const [isFocusMode, setIsFocusMode] = useState(false)
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
  const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false)
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false)
  const [questions, setQuestions] = useState<any[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const areas = [
    'Todas',
    'Clínica Médica',
    'Clínica Cirúrgica',
    'Diagnóstico por Imagem',
    'Anestesiologia',
    'Laboratório Clínico',
    'Saúde Pública',
  ]

  const themes = [
    'Todos',
    'Cardiologia',
    'Nefrologia',
    'Neurologia',
    'Gastroenterologia',
    'Farmacologia',
  ]

  // Load questions based on selected filters
  useEffect(() => {
    let filteredQuestions = []
    if (selectedTheme && selectedTheme !== 'Todos') {
      filteredQuestions = getQuestionsByTheme(selectedTheme)
    } else if (selectedArea && selectedArea !== 'Todas') {
      filteredQuestions = getQuestionsByArea(selectedArea)
    } else {
      filteredQuestions = getQuestionsByArea(null)
    }

    // Shuffle questions for random selection
    const shuffledQuestions = [...filteredQuestions].sort(
      () => Math.random() - 0.5,
    )
    setQuestions(shuffledQuestions)
    setCurrentQuestionIndex(0)
  }, [selectedArea, selectedTheme])

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // If we've reached the end, shuffle and restart
      const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5)
      setQuestions(shuffledQuestions)
      setCurrentQuestionIndex(0)
    }
  }

  const currentQuestion =
    questions.length > 0
      ? questions[currentQuestionIndex]
      : {
          id: '123',
          faculty: 'UFV',
          year: '2022',
          area: 'CLÍNICA MÉDICA',
          theme: 'FARMACOLOGIA',
          question:
            'Assinale a alternativa que representa um diurético de alça utilizado em cães que se tornam refratários a altas doses de furosemida no tratamento crônico da insuficiência cardíaca.',
          alternatives: [
            {
              id: 'a',
              text: 'Espironolactona',
              isCorrect: false,
              explanation:
                'Incorreta. A espironolactona é um diurético poupador de potássio, que atua como antagonista da aldosterona no túbulo distal. É usado como terapia adjuvante na ICC por seus efeitos antifibróticos e neuro-hormonais, não como diurético principal.',
            },
            {
              id: 'b',
              text: 'Clorotiazida',
              isCorrect: false,
              explanation:
                'Incorreta. A clorotiazida é um diurético tiazídico, que atua no túbulo contorcido distal. Eles são usados em combinação com a furosemida para criar um "bloqueio sequencial do néfron" em casos refratários, mas não são diuréticos de alça.',
            },
            {
              id: 'c',
              text: 'Hidrocloratiazida',
              isCorrect: false,
              explanation:
                'Incorreta. A hidrocloratiazida é um diurético tiazídico, que atua no túbulo contorcido distal. Eles são usados em combinação com a furosemida para criar um "bloqueio sequencial do néfron" em casos refratários, mas não são diuréticos de alça.',
            },
            {
              id: 'd',
              text: 'Torsemida',
              isCorrect: true,
              explanation:
                'Correta. A torsemida é um diurético de alça, assim como a furosemida. No entanto, possui maior biodisponibilidade oral (é melhor absorvida) e uma duração de ação mais longa. É a alternativa de escolha quando se desenvolve resistência à furosemida.',
            },
          ],
          explanation:
            'A torsemida é um diurético de alça, assim como a furosemida. No entanto, possui maior biodisponibilidade oral (é melhor absorvida) e uma duração de ação mais longa. É a alternativa de escolha quando se desenvolve resistência à furosemida.',
        }

  return (
    <div
      className={`w-full bg-background ${isFocusMode ? 'p-0' : 'p-6 md:p-8'}`}
    >
      {!isFocusMode && (
        <>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Estudo Direto</h1>
            <div className="flex items-center gap-3">
              <div className="relative inline-block">
                <button
                  className="flex items-center gap-2 px-4 py-2 border rounded-md bg-card hover:bg-accent/50"
                  onClick={() => setIsAreaDropdownOpen(!isAreaDropdownOpen)}
                >
                  <Filter size={16} />
                  <span>{selectedArea || 'Todas as áreas'}</span>
                </button>
                {isAreaDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-card z-10">
                    <div className="py-1">
                      {areas.map((area) => (
                        <button
                          key={area}
                          className="block w-full text-left px-4 py-2 hover:bg-accent"
                          onClick={() => {
                            setSelectedArea(area === 'Todas' ? null : area)
                            setIsAreaDropdownOpen(false)
                          }}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative inline-block">
                <button
                  className="flex items-center gap-2 px-4 py-2 border rounded-md bg-card hover:bg-accent/50"
                  onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
                >
                  <Filter size={16} />
                  <span>{selectedTheme || 'Todos os temas'}</span>
                </button>
                {isThemeDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-card z-10">
                    <div className="py-1">
                      {themes.map((theme) => (
                        <button
                          key={theme}
                          className="block w-full text-left px-4 py-2 hover:bg-accent"
                          onClick={() => {
                            setSelectedTheme(theme === 'Todos' ? null : theme)
                            setIsThemeDropdownOpen(false)
                          }}
                        >
                          {theme}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsFocusMode(true)}
                className="p-2 rounded-md hover:bg-accent"
                title="Modo Foco"
              >
                <Maximize size={20} />
              </button>
            </div>
          </div>
        </>
      )}

      <QuestionCard
        question={currentQuestion}
        isFocusMode={isFocusMode}
        onExitFocusMode={() => setIsFocusMode(false)}
        onNextQuestion={handleNextQuestion}
      />
    </div>
  )
}



import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useQuestionState } from '../../context/QuestionContext';
import { QuestionCard } from './QuestionCard';
import { Filter, Maximize } from 'lucide-react';
import { SimpleQuestion } from '../../types';

export function StudyPage() {
  const { questions: allQuestions } = useQuestionState();
  
  // Estados para os filtros
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);

  // ESTADO CRÍTICO: Índice da questão na lista filtrada. Gerenciado LOCALMENTE.
  const [currentIndex, setCurrentIndex] = useState(0);



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

  // MEMOIZATION: A lista de questões filtradas só é recalculada se os filtros ou a lista mestre mudarem.
  // Isso impede que a lista mude apenas por um toggle de favorito/salvo.
  const filteredQuestions = useMemo(() => {
    console.log("Recalculando lista de questões filtradas...");
    return allQuestions.filter(q => {
      const areaMatch = !selectedArea || selectedArea === 'Todas' || q.area === selectedArea;
      const themeMatch = !selectedTheme || selectedTheme === 'Todos' || q.theme === selectedTheme;
      return areaMatch && themeMatch;
    });
  }, [allQuestions, selectedArea, selectedTheme]);

  // Efeito para resetar o índice QUANDO OS FILTROS MUDAM
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedArea, selectedTheme]);

  // Função para avançar para a próxima questão. ESTA É A ÚNICA FUNÇÃO QUE MUDA O ÍNDICE.
  const handleNextQuestion = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % filteredQuestions.length);
  }, [filteredQuestions.length]);

  // A questão atual é derivada do estado local e da lista memoizada.
  const currentQuestion = filteredQuestions[currentIndex];

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



      {currentQuestion ? (
        <QuestionCard
          // A chave (key) é crucial. Ela força o React a remontar o componente
          // quando o ID da questão muda, garantindo que o estado interno dele seja resetado.
          key={currentQuestion.id} 
          question={currentQuestion}
          isFocusMode={isFocusMode}
          onExitFocusMode={() => setIsFocusMode(false)}
          onNextQuestion={handleNextQuestion}
        />
      ) : (
        <div className="text-center py-12">
          <div className="bg-card border rounded-lg p-8 max-w-md mx-auto">
            <h3 className="text-lg font-medium mb-2">Nenhuma questão encontrada</h3>
            <p className="text-muted-foreground mb-4">
              Não há questões disponíveis com os filtros selecionados.
            </p>
            <button
              onClick={() => {
                setSelectedArea(null)
                setSelectedTheme(null)
              }}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        </div>
      )}
    </div>
  )
}



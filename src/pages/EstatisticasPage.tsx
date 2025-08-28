import React from 'react';
import { useQuestionState, useQuestionDispatch } from '../../context/QuestionContext';
import { SimpleQuestion } from '../../types';

// Supondo que você tenha componentes de gráfico, ex: RadarChart, ProgressRings
// import { RadarChart } from '../components/charts/RadarChart'; 
// import { ProgressRings } from '../components/charts/ProgressRings';

export function EstatisticasPage() {
  const { questions, statistics } = useQuestionState();
  const dispatch = useQuestionDispatch();

  // Lógica para calcular o desempenho geral por área
  const performanceByArea: Record<string, { total: number; correct: number; attempts: number }> = questions.reduce((acc, q) => {
    const areaKey = q.area || 'Geral';
    if (!acc[areaKey]) {
      acc[areaKey] = { total: 0, correct: 0, attempts: 0 };
    }
    const stat = statistics[q.id];
    if (stat) {
      acc[areaKey].correct += stat.correct;
      acc[areaKey].attempts += stat.attempts;
    }
    acc[areaKey].total += 1;
    return acc;
  }, {} as Record<string, { total: number; correct: number; attempts: number }>);

  const handleResetStats = () => {
    if (window.confirm("Você tem certeza que deseja zerar todas as suas estatísticas? Esta ação não pode ser desfeita.")) {
      dispatch({ type: 'RESET_STATISTICS' });
    }
  };

  // Calcular estatísticas gerais
  const totalAttempts = Object.values(performanceByArea).reduce((sum, area) => sum + area.attempts, 0);
  const totalCorrect = Object.values(performanceByArea).reduce((sum, area) => sum + area.correct, 0);
  const overallPercentage = totalAttempts > 0 ? ((totalCorrect / totalAttempts) * 100).toFixed(1) : '0.0';

  return (
    <div className="p-6 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Meu Desempenho</h1>
        <button 
          onClick={handleResetStats} 
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
        >
          Zerar Estatísticas
        </button>
      </div>

      {/* Estatísticas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Total de Tentativas</h3>
          <p className="text-3xl font-bold text-primary">{totalAttempts}</p>
        </div>
        <div className="bg-card border rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Acertos</h3>
          <p className="text-3xl font-bold text-green-600">{totalCorrect}</p>
        </div>
        <div className="bg-card border rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Taxa de Acerto</h3>
          <p className="text-3xl font-bold text-blue-600">{overallPercentage}%</p>
        </div>
      </div>

      {/* Gráficos e Análise Detalhada */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Visão Geral</h2>
          {/* <RadarChart data={performanceByArea} /> */}
          <div className="text-center text-muted-foreground py-8">
            <p>Componente do Gráfico de Radar aqui.</p>
            <p className="text-sm">Gráfico interativo mostrando desempenho por área</p>
          </div>
        </div>
        
        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Desempenho por Área</h2>
          {/* <ProgressRings data={performanceByArea} /> */}
          <div className="space-y-4">
            {Object.entries(performanceByArea).map(([area, data]) => {
              const percentage = data.attempts > 0 ? ((data.correct / data.attempts) * 100).toFixed(1) : '0.0';
              return (
                <div key={area} className="flex justify-between items-center p-3 bg-background rounded-md">
                  <div>
                    <p className="font-medium">{area}</p>
                    <p className="text-sm text-muted-foreground">
                      {data.correct}/{data.attempts} acertos
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{percentage}%</p>
                    <p className="text-xs text-muted-foreground">
                      {data.total} questões
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Questões Mais Respondidas */}
      <div className="mt-8 bg-card border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Questões Mais Praticadas</h2>
        <div className="space-y-3">
          {Object.entries(statistics)
            .sort(([,a], [,b]) => (b as any).attempts - (a as any).attempts)
            .slice(0, 10)
            .map(([questionId, stat]) => {
              const question = questions.find(q => q.id === questionId);
              if (!question) return null;
              
              const statTyped = stat as { attempts: number; correct: number };
              const percentage = statTyped.attempts > 0 ? ((statTyped.correct / statTyped.attempts) * 100).toFixed(1) : '0.0';
              return (
                <div key={questionId} className="flex justify-between items-center p-3 bg-background rounded-md">
                  <div className="flex-1">
                    <p className="font-medium truncate">{question.question}</p>
                    <p className="text-sm text-muted-foreground">{question.area}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-bold">{percentage}%</p>
                    <p className="text-xs text-muted-foreground">
                      {statTyped.correct}/{statTyped.attempts}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

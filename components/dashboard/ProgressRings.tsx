import React from 'react'

interface ProgressRingProps {
  percentage: number
  size: number
  strokeWidth: number
  color: string
  label: string
}

function ProgressRing({ percentage, size, strokeWidth, color, label }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-semibold">{percentage}%</span>
        </div>
      </div>
      <span className="text-sm text-muted-foreground mt-2 text-center">{label}</span>
    </div>
  )
}

export function ProgressRings() {
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

  // Calculate percentages
  const totalQuestions = stats.totalAnswered
  const correctPercentage = totalQuestions > 0 ? Math.round((stats.totalCorrect / totalQuestions) * 100) : 0
  const incorrectPercentage = totalQuestions > 0 ? Math.round((stats.totalIncorrect / totalQuestions) * 100) : 0

  // Calculate area-specific performance
  const getAreaPerformance = (areaName: string) => {
    const areaStats = stats.areaStats[areaName]
    if (!areaStats || areaStats.answered === 0) return 0
    return Math.round((areaStats.correct / areaStats.answered) * 100)
  }

  const areas = [
    {
      name: 'Clínica Médica',
      performance: getAreaPerformance('CLÍNICA MÉDICA'),
      color: 'hsl(142 76% 36%)',
    },
    {
      name: 'Clínica Cirúrgica',
      performance: getAreaPerformance('CLÍNICA CIRÚRGICA'),
      color: 'hsl(221 83% 53%)',
    },
    {
      name: 'Diagnóstico por Imagem',
      performance: getAreaPerformance('DIAGNÓSTICO POR IMAGEM'),
      color: 'hsl(262 83% 58%)',
    },
    {
      name: 'Anestesiologia',
      performance: getAreaPerformance('ANESTESIOLOGIA'),
      color: 'hsl(47 95% 57%)',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Overall Performance */}
      <div>
        <h3 className="text-lg font-medium mb-4">Desempenho Geral</h3>
        <div className="grid grid-cols-2 gap-6">
          <ProgressRing
            percentage={correctPercentage}
            size={80}
            strokeWidth={8}
            color="hsl(142 76% 36%)"
            label="Acertos"
          />
          <ProgressRing
            percentage={incorrectPercentage}
            size={80}
            strokeWidth={8}
            color="hsl(0 84% 60%)"
            label="Erros"
          />
        </div>
      </div>

      {/* Area Performance */}
      <div>
        <h3 className="text-lg font-medium mb-4">Desempenho por Área</h3>
        <div className="grid grid-cols-2 gap-4">
          {areas.map((area) => (
            <ProgressRing
              key={area.name}
              percentage={area.performance}
              size={60}
              strokeWidth={6}
              color={area.color}
              label={area.name}
            />
          ))}
        </div>
      </div>

      {/* Statistics Summary */}
      <div className="bg-muted/50 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-3">Resumo</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Total de questões:</span>
            <span className="ml-2 font-medium">{totalQuestions}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Tempo médio:</span>
            <span className="ml-2 font-medium">
              {stats.averageTime > 0 ? `${Math.round(stats.averageTime)}s` : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}



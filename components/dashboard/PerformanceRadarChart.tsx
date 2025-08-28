import React from 'react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { useNavigate } from 'react-router-dom'


export function PerformanceRadarChart() {
  const navigate = useNavigate()

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

  const statistics = loadStatistics()

  // Calculate performance data from statistics
  const calculateAreaPerformance = (areaName: string) => {
    const stats = statistics.areaStats?.[areaName]
    if (!stats || stats.answered === 0) return 0
    return Math.round((stats.correct / stats.answered) * 100)
  }

  const data = [
    {
      subject: 'Clínica Médica',
      A: calculateAreaPerformance('CLÍNICA MÉDICA'),
      fullMark: 100,
    },
    {
      subject: 'Clínica Cirúrgica',
      A: calculateAreaPerformance('CLÍNICA CIRÚRGICA'),
      fullMark: 100,
    },
    {
      subject: 'Diagnóstico por Imagem',
      A: calculateAreaPerformance('DIAGNÓSTICO POR IMAGEM'),
      fullMark: 100,
    },
    {
      subject: 'Anestesiologia',
      A: calculateAreaPerformance('ANESTESIOLOGIA'),
      fullMark: 100,
    },
    {
      subject: 'Laboratório Clínico',
      A: calculateAreaPerformance('LABORATÓRIO CLÍNICO'),
      fullMark: 100,
    },
    {
      subject: 'Saúde Pública',
      A: calculateAreaPerformance('SAÚDE PÚBLICA'),
      fullMark: 100,
    },
    {
      subject: 'Patologia',
      A: calculateAreaPerformance('PATOLOGIA'),
      fullMark: 100,
    },
  ]

  const handleAreaClick = (area: string) => {
    const areaMap: Record<string, string> = {
      'Clínica Médica': 'clinica-medica',
      'Clínica Cirúrgica': 'clinica-cirurgica',
      'Diagnóstico por Imagem': 'diagnostico-imagem',
      'Anestesiologia': 'anestesiologia',
      'Laboratório Clínico': 'laboratorio-clinico',
      'Saúde Pública': 'saude-publica',
      'Patologia': 'patologia',
    }
    
    const areaId = areaMap[area]
    if (areaId) {
      navigate(`/estatisticas?area=${areaId}`)
    }
  }

  // Detectar se é dispositivo móvel
  const isMobile = window.innerWidth <= 768

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart 
        cx="50%" 
        cy="50%" 
        outerRadius={isMobile ? "60%" : "80%"} 
        data={data}
      >
        <PolarGrid />
        <PolarAngleAxis
          dataKey="subject"
          tick={{
            fill: 'currentColor',
            fontSize: isMobile ? 10 : 12,
          }}
          style={{
            cursor: 'pointer',
          }}
          onClick={(e) => {
            if (e && e.index !== undefined) {
              handleAreaClick(data[e.index].subject)
            }
          }}
        />
        <Radar
          name="Proficiência"
          dataKey="A"
          stroke="hsl(221.2 83.2% 53.3%)"
          fill="hsl(221.2 83.2% 53.3%)"
          fillOpacity={0.5}
        />
        <Tooltip
          formatter={(value) => [`${value}%`, 'Proficiência']}
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            borderColor: 'hsl(var(--border))',
            fontSize: isMobile ? '12px' : '14px',
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}



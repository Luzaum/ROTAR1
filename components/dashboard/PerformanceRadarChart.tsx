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
import { getAppData } from '../../utils/localStorage'

export function PerformanceRadarChart() {
  const navigate = useNavigate()
  const appData = getAppData()

  // Calculate performance data from statistics
  const calculateAreaPerformance = (areaName: string) => {
    const stats = appData.statistics.areaStats[areaName]
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
    navigate('/estatisticas', {
      state: {
        selectedArea: area,
      },
    })
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis
          dataKey="subject"
          tick={{
            fill: 'currentColor',
            fontSize: 12,
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
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}



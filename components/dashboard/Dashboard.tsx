import React from 'react'
import { PerformanceRadarChart } from './PerformanceRadarChart'
import { ProgressRings } from './ProgressRings'
import { BookOpen, FileText, BarChart2, Bot } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Dashboard() {
  const featureCards = [
    {
      title: 'Estudo Direto',
      description:
        'Pratique com questões de provas de residência veterinária dos últimos anos, com explicações detalhadas e análise de desempenho.',
      icon: <BookOpen className="text-primary w-6 h-6" />,
      path: '/estudo',
    },
    {
      title: 'Simulados',
      description:
        'Crie simulados personalizados com questões das áreas que você precisa reforçar, ou use nossos simulados pré-configurados.',
      icon: <FileText className="text-primary w-6 h-6" />,
      path: '/simulados',
    },
    {
      title: 'Estatísticas',
      description:
        'Acompanhe seu desempenho por área e tema, identificando seus pontos fortes e fracos para um estudo direcionado.',
      icon: <BarChart2 className="text-primary w-6 h-6" />,
      path: '/estatisticas',
    },
    {
      title: 'Dr. Luzaum',
      description:
        'Assistente de estudos inteligente que responde dúvidas e fornece explicações detalhadas sobre conceitos veterinários.',
      icon: <Bot className="text-primary w-6 h-6" />,
      path: '/drluzaum',
    },
  ]

  return (
    <div className="w-full p-6 md:p-8 bg-background">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">
        Olá futuro residente, o que vamos aprender hoje?
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {featureCards.map((card, index) => (
          <Link to={card.path} key={index} className="block">
            <div className="bg-secondary/30 border border-primary/20 rounded-lg p-5 hover:bg-secondary/50 transition-colors">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  {card.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{card.title}</h3>
                  <p className="text-muted-foreground">{card.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Performance Dashboard */}
      <div className="bg-card border rounded-lg shadow-sm p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-6">Desempenho por Área</h2>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left column: Radar Chart */}
          <div className="w-full lg:w-2/5">
            <Link to="/estatisticas">
              <div className="bg-card border rounded-lg shadow-sm p-4 h-full hover:bg-accent/50 transition-colors cursor-pointer">
                <h3 className="text-lg font-medium mb-4">
                  Perfil de Competência
                </h3>
                <div className="h-80">
                  <PerformanceRadarChart />
                </div>
              </div>
            </Link>
          </div>

          {/* Right column: Progress Rings */}
          <div className="w-full lg:w-3/5">
            <Link to="/estatisticas">
              <div className="hover:bg-accent/50 transition-colors cursor-pointer rounded-lg p-2">
                <ProgressRings />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}



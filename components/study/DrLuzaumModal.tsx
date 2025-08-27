import React, { useEffect, useState, memo } from 'react'
import { X } from 'lucide-react'

interface DrLuzaumModalProps {
  isOpen: boolean
  onClose: () => void
  questionId: string
}

export function DrLuzaumModal({
  isOpen,
  onClose,
  questionId,
}: DrLuzaumModalProps) {
  const [stage, setStage] = useState<'initial' | 'loading' | 'content'>(
    'initial',
  )
  const [progress, setProgress] = useState(0)

  // Reset stage when modal opens
  useEffect(() => {
    if (isOpen) {
      setStage('initial')
      setProgress(0)
    }
  }, [isOpen])

  useEffect(() => {
    if (stage === 'loading') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setStage('content')
            return 100
          }
          return prev + 2
        })
      }, 50)
      return () => clearInterval(interval)
    }
  }, [stage])

  // Prevent memory leaks
  useEffect(() => {
    return () => {
      setStage('initial')
      setProgress(0)
    }
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-md saturate-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card/80 backdrop-blur-md border rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-hidden z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold text-lg">Dr. Luzaum</h2>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-accent">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-4rem)]">
          {stage === 'initial' && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 8V4H8" />
                  <rect width="16" height="12" x="4" y="8" rx="2" />
                  <path d="M2 14h2" />
                  <path d="M20 14h2" />
                  <path d="M15 13v2" />
                  <path d="M9 13v2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Revisão Avançada com Dr. Luzaum
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                O Dr. Luzaum irá analisar esta questão em profundidade,
                apresentando conceitos-chave, explicações detalhadas e dicas
                para memorização.
              </p>
              <button
                onClick={() => setStage('loading')}
                className="px-6 py-3 rounded-md font-medium text-black bg-primary/90 hover:bg-primary shadow-[0_0_10px_rgba(34,197,94,0.5)] transition-all animate-pulse"
              >
                Iniciar Análise Avançada
              </button>
            </div>
          )}

          {stage === 'loading' && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-full max-w-md mb-4">
                <div className="h-2 w-full bg-accent rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
                <p className="text-right text-sm text-muted-foreground mt-1">
                  {progress}%
                </p>
              </div>
              <p className="text-muted-foreground">
                Analisando questão e preparando revisão...
              </p>
            </div>
          )}

          {stage === 'content' && (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <h2>Diuréticos de Alça na Insuficiência Cardíaca Canina</h2>
              
              <h3>Conceitos Fundamentais</h3>
              <p>
                A insuficiência cardíaca congestiva (ICC) em cães frequentemente
                requer o uso de diuréticos para controlar o acúmulo de fluidos.
                A furosemida é o diurético de alça mais comumente utilizado, mas
                com o tratamento crônico, pode ocorrer resistência.
              </p>

              <h3>Mecanismo de Ação dos Diuréticos</h3>
              <ul>
                <li>
                  <strong>Diuréticos de Alça (Furosemida, Torsemida):</strong>{' '}
                  Inibem o cotransportador Na+/K+/2Cl- na alça ascendente de
                  Henle
                </li>
                <li>
                  <strong>
                    Diuréticos Tiazídicos (Clorotiazida, Hidroclorotiazida):
                  </strong>{' '}
                  Inibem o cotransportador Na+/Cl- no túbulo contorcido distal
                </li>
                <li>
                  <strong>
                    Diuréticos Poupadores de Potássio (Espironolactona):
                  </strong>{' '}
                  Antagonizam a aldosterona no túbulo distal
                </li>
              </ul>

              <h3>Resistência à Furosemida</h3>
              <p>
                O desenvolvimento de resistência à furosemida (também chamada de
                "escape de diurético") ocorre por diversos mecanismos:
              </p>
              <ol>
                <li>
                  Hipertrofia do túbulo distal levando a maior reabsorção de
                  sódio
                </li>
                <li>Ativação do sistema renina-angiotensina-aldosterona</li>
                <li>Redução do fluxo sanguíneo renal</li>
                <li>
                  Redução da biodisponibilidade da furosemida em estados
                  edematosos
                </li>
              </ol>

              <h3>Vantagens da Torsemida</h3>
              <ul>
                <li>
                  Maior potência (aproximadamente 10 vezes mais potente que a
                  furosemida)
                </li>
                <li>
                  Maior biodisponibilidade oral (80-100% vs. 50% da furosemida)
                </li>
                <li>
                  Meia-vida mais longa (6-8 horas vs. 1-2 horas da furosemida)
                </li>
                <li>Efeito anti-aldosterona adicional</li>
                <li>Menor excreção de potássio por volume de diurese</li>
              </ul>

              <h3>Aplicação Clínica</h3>
              <p>A torsemida é particularmente útil em cães com:</p>
              <ul>
                <li>ICC avançada refratária à furosemida</li>
                <li>
                  Necessidade de altas doses de furosemida (&gt;4 mg/kg BID)
                </li>
                <li>
                  Baixa adesão do proprietário (devido à posologia menos
                  frequente)
                </li>
                <li>Hiponatremia ou risco de desequilíbrios eletrolíticos</li>
              </ul>

              <h3>Pontos para Memorização</h3>
              <ul>
                <li>
                  A <strong>torsemida</strong> é o diurético de alça alternativo
                  para casos refratários à furosemida
                </li>
                <li>
                  Espironolactona é um <strong>poupador de potássio</strong>,
                  não um diurético de alça
                </li>
                <li>
                  Clorotiazida e hidroclorotiazida são{' '}
                  <strong>tiazídicos</strong>, atuam no túbulo contorcido distal
                </li>
                <li>
                  O "bloqueio sequencial do néfron" combina diuréticos de
                  diferentes classes para potencializar o efeito diurético
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}



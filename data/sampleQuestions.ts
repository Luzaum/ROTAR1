import { SimpleQuestion } from '../types'

export const sampleQuestions: SimpleQuestion[] = [
  {
    id: '1',
    faculty: 'UFV',
    year: '2022',
    area: 'CLÍNICA MÉDICA',
    theme: 'FARMACOLOGIA',
    question: 'Assinale a alternativa que representa um diurético de alça utilizado em cães que se tornam refratários a altas doses de furosemida no tratamento crônico da insuficiência cardíaca.',
    alternatives: [
      {
        id: 'a',
        text: 'Espironolactona',
        isCorrect: false,
        explanation: 'Incorreta. A espironolactona é um diurético poupador de potássio, que atua como antagonista da aldosterona no túbulo distal. É usado como terapia adjuvante na ICC por seus efeitos antifibróticos e neuro-hormonais, não como diurético principal.',
      },
      {
        id: 'b',
        text: 'Clorotiazida',
        isCorrect: false,
        explanation: 'Incorreta. A clorotiazida é um diurético tiazídico, que atua no túbulo contorcido distal. Eles são usados em combinação com a furosemida para criar um "bloqueio sequencial do néfron" em casos refratários, mas não são diuréticos de alça.',
      },
      {
        id: 'c',
        text: 'Hidrocloratiazida',
        isCorrect: false,
        explanation: 'Incorreta. A hidrocloratiazida é um diurético tiazídico, que atua no túbulo contorcido distal. Eles são usados em combinação com a furosemida para criar um "bloqueio sequencial do néfron" em casos refratários, mas não são diuréticos de alça.',
      },
      {
        id: 'd',
        text: 'Torsemida',
        isCorrect: true,
        explanation: 'Correta. A torsemida é um diurético de alça, assim como a furosemida. No entanto, possui maior biodisponibilidade oral (é melhor absorvida) e uma duração de ação mais longa. É a alternativa de escolha quando se desenvolve resistência à furosemida.',
      },
    ],
    explanation: 'A torsemida é um diurético de alça, assim como a furosemida. No entanto, possui maior biodisponibilidade oral (é melhor absorvida) e uma duração de ação mais longa. É a alternativa de escolha quando se desenvolve resistência à furosemida.',
  },
  {
    id: '2',
    faculty: 'UFMG',
    year: '2021',
    area: 'CLÍNICA CIRÚRGICA',
    theme: 'CIRURGIA GERAL',
    question: 'Qual é a técnica cirúrgica mais adequada para o tratamento de um cão com torção gástrica?',
    alternatives: [
      {
        id: 'a',
        text: 'Gastrotomia simples',
        isCorrect: false,
        explanation: 'Incorreta. A gastrotomia simples não é suficiente para tratar a torção gástrica, pois não corrige a rotação do estômago.',
      },
      {
        id: 'b',
        text: 'Gastrectomia parcial',
        isCorrect: false,
        explanation: 'Incorreta. A gastrectomia parcial não é necessária na maioria dos casos de torção gástrica.',
      },
      {
        id: 'c',
        text: 'Gastropexia com gastrotomia',
        isCorrect: true,
        explanation: 'Correta. A gastropexia previne recidivas e a gastrotomia permite a descompressão e avaliação da viabilidade tecidual.',
      },
      {
        id: 'd',
        text: 'Laparotomia exploratória apenas',
        isCorrect: false,
        explanation: 'Incorreta. A laparotomia exploratória é necessária, mas deve ser seguida de correção cirúrgica adequada.',
      },
    ],
    explanation: 'A técnica mais adequada é a gastropexia com gastrotomia, pois a gastropexia previne recidivas e a gastrotomia permite a descompressão e avaliação da viabilidade tecidual.',
  },
  {
    id: '3',
    faculty: 'USP',
    year: '2023',
    area: 'DIAGNÓSTICO POR IMAGEM',
    theme: 'RADIOLOGIA',
    question: 'Em uma radiografia torácica de um cão com suspeita de cardiomegalia, qual é o sinal mais confiável para confirmar o diagnóstico?',
    alternatives: [
      {
        id: 'a',
        text: 'Aumento do índice cardíaco vertebral',
        isCorrect: true,
        explanation: 'Correta. O índice cardíaco vertebral (VHS) é o método mais confiável e reprodutível para avaliar o tamanho cardíaco em radiografias.',
      },
      {
        id: 'b',
        text: 'Aumento da silhueta cardíaca',
        isCorrect: false,
        explanation: 'Incorreta. A silhueta cardíaca pode variar com o posicionamento e não é um método quantitativo confiável.',
      },
      {
        id: 'c',
        text: 'Presença de derrame pleural',
        isCorrect: false,
        explanation: 'Incorreta. O derrame pleural é uma consequência, não um sinal específico de cardiomegalia.',
      },
      {
        id: 'd',
        text: 'Alteração da posição cardíaca',
        isCorrect: false,
        explanation: 'Incorreta. A posição cardíaca pode ser alterada por diversos fatores, não sendo específica para cardiomegalia.',
      },
    ],
    explanation: 'O índice cardíaco vertebral (VHS) é o método mais confiável e reprodutível para avaliar o tamanho cardíaco em radiografias, sendo considerado o padrão-ouro.',
  },
  {
    id: '4',
    faculty: 'UFPR',
    year: '2022',
    area: 'ANESTESIOLOGIA',
    theme: 'FARMACOLOGIA ANESTÉSICA',
    question: 'Qual é o agente anestésico inalatório com menor solubilidade no sangue, resultando em indução e recuperação mais rápidas?',
    alternatives: [
      {
        id: 'a',
        text: 'Isoflurano',
        isCorrect: false,
        explanation: 'Incorreta. O isoflurano tem solubilidade intermediária no sangue.',
      },
      {
        id: 'b',
        text: 'Sevoflurano',
        isCorrect: true,
        explanation: 'Correta. O sevoflurano tem a menor solubilidade no sangue entre os agentes inalatórios comuns, resultando em indução e recuperação mais rápidas.',
      },
      {
        id: 'c',
        text: 'Halotano',
        isCorrect: false,
        explanation: 'Incorreta. O halotano tem alta solubilidade no sangue, resultando em indução e recuperação mais lentas.',
      },
      {
        id: 'd',
        text: 'Desflurano',
        isCorrect: false,
        explanation: 'Incorreta. Embora o desflurano tenha baixa solubilidade, o sevoflurano é ainda menor.',
      },
    ],
    explanation: 'O sevoflurano tem a menor solubilidade no sangue entre os agentes inalatórios comuns, resultando em indução e recuperação mais rápidas.',
  },
  {
    id: '5',
    faculty: 'UFRGS',
    year: '2021',
    area: 'LABORATÓRIO CLÍNICO',
    theme: 'HEMATOLOGIA',
    question: 'Em um hemograma de um cão com anemia regenerativa, qual alteração é esperada?',
    alternatives: [
      {
        id: 'a',
        text: 'Aumento do número de reticulócitos',
        isCorrect: true,
        explanation: 'Correta. Na anemia regenerativa, há aumento da produção de reticulócitos como resposta compensatória.',
      },
      {
        id: 'b',
        text: 'Diminuição do VCM',
        isCorrect: false,
        explanation: 'Incorreta. Na anemia regenerativa, o VCM geralmente está aumentado devido à presença de reticulócitos.',
      },
      {
        id: 'c',
        text: 'Aumento da concentração de hemoglobina corpuscular média',
        isCorrect: false,
        explanation: 'Incorreta. A CHCM geralmente está diminuída na anemia regenerativa.',
      },
      {
        id: 'd',
        text: 'Diminuição do RDW',
        isCorrect: false,
        explanation: 'Incorreta. O RDW geralmente está aumentado na anemia regenerativa devido à anisocitose.',
      },
    ],
    explanation: 'Na anemia regenerativa, há aumento da produção de reticulócitos como resposta compensatória da medula óssea.',
  },
]



import type { ViewAsOption } from '@/constants/view-as'
import { PATIENT_JOURNEY_LABELS, type PatientJourneyType } from '@/types/patient-journey'
import type { SurgeryStatus } from '@/types/surgery'

export type ExamStatus = 'ok' | 'pending' | 'follow_up'

export type GoalEntryRating = 'adequado' | 'com_ressalvas' | 'pendente_avaliacao'

export type GoalProgressEntry = {
  id: string
  title: string
  date: string
  rating: GoalEntryRating
  evaluator: string
  notes: string
}

export type GoalItem = {
  id: string
  title: string
  target: number
  current: number
  unit: string
  professional: string
  /** Detalhes por sessão, dia ou item — exibidos ao expandir o card. */
  entries?: GoalProgressEntry[]
}

export type ExamItem = {
  id: string
  name: string
  status: ExamStatus
  note?: string
  /** Histórico / critérios ao expandir a linha. */
  detail?: {
    lastEvaluatedAt: string
    evaluator: string
    summary: string
    criteria?: string[]
  }
}

export type JourneyMoment = {
  id: string
  title: string
  status: string
  description: string
}

export type PatientDashboardMock = {
  journeyType: PatientJourneyType
  titleFirstPerson: string
  subtitleFirstPerson: string
  isObstetric: boolean
  goals: GoalItem[]
  exams?: ExamItem[]
  clinicalChecklist?: ExamItem[]
}

type MomentTemplate = { id: string; title: string; description: string }

const bariatricMomentTemplates: MomentTemplate[] = [
  {
    id: 'bar-prepare',
    title: 'Suas metas de preparo',
    description:
      'Exames, nutrição e atividade no ritmo combinado com a equipe — cada meta cumprida aproxima você do que alinharam juntos.',
  },
  {
    id: 'bar-focused',
    title: 'Cuidado concentrado com você',
    description:
      'A equipe está totalmente focada no seu bem-estar neste momento. Quando possível, alguém da unidade avisará a família.',
  },
  {
    id: 'bar-recover',
    title: 'Retomada com apoio',
    description:
      'Hidratação, movimento leve e descanso guiados pela equipe; suas metas diárias voltam a ser o centro do plano.',
  },
]

const cesareanMomentTemplates: MomentTemplate[] = [
  {
    id: 'ces-prenatal',
    title: 'Pré-natal e seu preparo',
    description:
      'Consultas, movimentos do bebê e sinais de alerta — avise a equipe se algo parecer diferente do habitual.',
  },
  {
    id: 'ces-birthday',
    title: 'O grande dia na maternidade',
    description:
      'Chegada, acolhimento e cuidado contínuo da equipe; seu plano de nascimento foi alinhado antes deste momento.',
  },
  {
    id: 'ces-post',
    title: 'Primeiros dias com o bebê',
    description:
      'Recuperação, amamentação quando for o caso e retornos — pequenas metas diárias ajudam a se sentir segura.',
  },
]

const vaginalMomentTemplates: MomentTemplate[] = [
  {
    id: 'vag-prenatal',
    title: 'Seu pré-natal em dia',
    description:
      'Consultas, vacinas e preparo emocional — você e a equipe constroem confiança a cada encontro.',
  },
  {
    id: 'vag-labor',
    title: 'Trabalho de parto e chegada do bebê',
    description:
      'Fases do parto, respiração e quando ir à maternidade: siga o que combinou com o time que te acompanha.',
  },
  {
    id: 'vag-after',
    title: 'Primeiras horas juntos',
    description:
      'Peles a pele, amamentação se possível e sinais de alerta — orientações claras para começar bem.',
  },
]

const preCareStatuses: SurgeryStatus[] = ['REQUESTED', 'APPROVED', 'SCHEDULED', 'ADMITTED']

/** Índice 0..2 = fase atual; 3 = todas concluídas (ex.: alta). */
export function mapCareStatusToStep(status: SurgeryStatus): number {
  if (status === 'DISCHARGED') return 3
  if (preCareStatuses.includes(status)) return 0
  if (status === 'IN_SURGERY') return 1
  if (status === 'IN_RECOVERY' || status === 'COMPLICATION') return 2
  if (status === 'CANCELLED') return 0
  return 0
}

function stepFromProgressWhenUnmatched(
  journey: PatientJourneyType,
  overallProgress: number,
): number {
  if (journey === 'vaginal_birth') {
    if (overallProgress < 42) return 0
    if (overallProgress < 74) return 1
    return 2
  }
  if (journey === 'cesarean') {
    if (overallProgress < 38) return 0
    if (overallProgress < 72) return 1
    return 2
  }
  if (overallProgress < 46) return 0
  if (overallProgress < 82) return 1
  return 2
}

/**
 * Momentos da jornada do paciente: estados dinâmicos (concluído / em foco / próximo) e linguagem centrada em objetivos.
 */
export function buildPatientMoments(
  journey: PatientJourneyType,
  careStatus: SurgeryStatus,
  overallProgress: number,
  matchedRecord: boolean,
): JourneyMoment[] {
  const activeStep = matchedRecord
    ? mapCareStatusToStep(careStatus)
    : stepFromProgressWhenUnmatched(journey, overallProgress)

  const templates =
    journey === 'bariatric'
      ? bariatricMomentTemplates
      : journey === 'cesarean'
        ? cesareanMomentTemplates
        : vaginalMomentTemplates

  return templates.map((t, index) => {
    let statusLabel: string
    if (activeStep >= 3) {
      statusLabel = 'Concluído'
    } else if (index < activeStep) {
      statusLabel = 'Concluído'
    } else if (index === activeStep) {
      statusLabel = 'Em foco agora'
    } else {
      statusLabel = 'Próximo passo'
    }

    let description = t.description
    if (index === activeStep && overallProgress >= 72 && activeStep === 0) {
      description += ' Suas metas estão bem encaminhadas — continue neste ritmo.'
    }
    if (careStatus === 'COMPLICATION' && index === activeStep && matchedRecord) {
      description +=
        ' Em situações especiais, mantenha contato direto com a equipe; eles orientam o próximo passo com segurança.'
    }

    return {
      id: t.id,
      title: t.title,
      status: statusLabel,
      description,
    }
  })
}

const byJourney: Record<PatientJourneyType, Omit<PatientDashboardMock, 'journeyType'>> = {
  bariatric: {
    titleFirstPerson: 'Seu plano de acompanhamento',
    subtitleFirstPerson:
      'Metas definidas pela sua equipe, momento da sua jornada e como está seu progresso — tudo em um só lugar.',
    isObstetric: false,
    goals: [
      {
        id: 'g-weight',
        title: 'Peso de referência (evolução)',
        target: 100,
        current: 108,
        unit: 'kg',
        professional: 'Dr. Lucas Lima',
        entries: [
          {
            id: 'g-w-e1',
            title: 'Consulta — linha de cuidado metabólico',
            date: '2026-02-10',
            rating: 'adequado',
            evaluator: 'Dr. Lucas Lima',
            notes: 'Perda gradual conforme plano; sem sinais de desidratação.',
          },
          {
            id: 'g-w-e2',
            title: 'Reavaliação nutricional',
            date: '2026-03-01',
            rating: 'adequado',
            evaluator: 'Nutri Ana Prado',
            notes: 'Aderência às porções; ajuste fino de proteínas.',
          },
          {
            id: 'g-w-e3',
            title: 'Pesagem ambulatorial',
            date: '2026-03-28',
            rating: 'com_ressalvas',
            evaluator: 'Enf. Paula Mendes',
            notes: 'Oscilação leve; reforçar registro semanal no app.',
          },
        ],
      },
      {
        id: 'g-walk',
        title: 'Atividade leve diária',
        target: 35,
        current: 20,
        unit: 'min',
        professional: 'Dr. Lucas Lima',
        entries: [
          {
            id: 'g-k-e1',
            title: 'Semana 1 — caminhada supervisionada',
            date: '2026-02-12',
            rating: 'adequado',
            evaluator: 'Dr. Lucas Lima',
            notes: '10 min/dia sem dispneia; FC de repouso estável.',
          },
          {
            id: 'g-k-e2',
            title: 'Semana 2 — progressão',
            date: '2026-02-19',
            rating: 'com_ressalvas',
            evaluator: 'Fisio. Roberto Dias',
            notes: 'Limitar inclines; alongar panturrilha pós-esforço.',
          },
          {
            id: 'g-k-e3',
            title: 'Semana 3 — meta intermediária',
            date: '2026-02-26',
            rating: 'pendente_avaliacao',
            evaluator: '—',
            notes: 'Aguardando retorno para fechar minutos alvo.',
          },
        ],
      },
      {
        id: 'g-hydration',
        title: 'Hidratação',
        target: 2000,
        current: 1400,
        unit: 'ml',
        professional: 'Enf. Paula Mendes',
        entries: [
          {
            id: 'g-h-e1',
            title: 'Orientação — fracionamento hídrico',
            date: '2026-02-08',
            rating: 'adequado',
            evaluator: 'Enf. Paula Mendes',
            notes: 'Meta1,5 L atingida na primeira semana.',
          },
          {
            id: 'g-h-e2',
            title: 'Check-in telefone',
            date: '2026-02-22',
            rating: 'com_ressalvas',
            evaluator: 'Enf. Paula Mendes',
            notes: 'Dias úteis abaixo da meta; sugerido alarme no celular.',
          },
        ],
      },
    ],
    exams: [
      {
        id: 'e1',
        name: 'Hemograma completo',
        status: 'ok',
        detail: {
          lastEvaluatedAt: '2026-02-05',
          evaluator: 'Dr. Lucas Lima',
          summary: 'Parâmetros dentro da normalidade para o pré-operatório.',
          criteria: ['Hb estável', 'Leucograma sem desvios'],
        },
      },
      {
        id: 'e2',
        name: 'Função renal e hepática',
        status: 'ok',
        detail: {
          lastEvaluatedAt: '2026-02-05',
          evaluator: 'Dr. Lucas Lima',
          summary: 'Clearance e enzimas hepáticas compatíveis com procedimento.',
        },
      },
      {
        id: 'e3',
        name: 'Glicemia / HbA1c',
        status: 'follow_up',
        note: 'Acompanhar conforme equipe',
        detail: {
          lastEvaluatedAt: '2026-02-20',
          evaluator: 'Dr. Lucas Lima',
          summary: 'HbA1c em faixa-alvo; manter monitoramento domiciliar.',
        },
      },
      {
        id: 'e4',
        name: 'Coagulograma',
        status: 'ok',
        detail: {
          lastEvaluatedAt: '2026-02-04',
          evaluator: 'Lab. hospitalar',
          summary: 'Sem alterações de coagulação relevantes.',
        },
      },
      {
        id: 'e5',
        name: 'Eletrocardiograma',
        status: 'pending',
        detail: {
          lastEvaluatedAt: '—',
          evaluator: '—',
          summary: 'Agendado para próxima etapa do preparo.',
        },
      },
    ],
  },
  cesarean: {
    titleFirstPerson: 'Seu acompanhamento nesta gestação',
    subtitleFirstPerson:
      'Metas do pré-natal e do grande dia, alinhadas com a sua equipe — o foco é o seu bem-estar e o do bebê.',
    isObstetric: true,
    goals: [
      {
        id: 'c-visits',
        title: 'Consultas de pré-natal',
        target: 8,
        current: 6,
        unit: 'consultas',
        professional: 'Dra. equipe obstétrica',
        entries: [
          {
            id: 'c-v-1',
            title: 'Consulta 1 — confirmação e planejamento',
            date: '2025-11-04',
            rating: 'adequado',
            evaluator: 'Dra. Helena Moura',
            notes: 'DUM e DPP alinhadas; exames iniciais solicitados.',
          },
          {
            id: 'c-v-2',
            title: 'Consulta 2 — morfologia',
            date: '2025-12-10',
            rating: 'adequado',
            evaluator: 'Dra. Helena Moura',
            notes: 'Crescimento fetal adequado; sem malformações relevantes.',
          },
          {
            id: 'c-v-3',
            title: 'Consulta 3 — TOTG / rastreamento',
            date: '2026-01-08',
            rating: 'com_ressalvas',
            evaluator: 'Dra. Helena Moura',
            notes: 'Orientação dietética preventiva; retorno em 2 semanas.',
          },
          {
            id: 'c-v-4',
            title: 'Consulta 4 — preparo para cesárea',
            date: '2026-02-12',
            rating: 'adequado',
            evaluator: 'Dra. Helena Moura',
            notes: 'Consentimento e horário cirúrgico esclarecidos.',
          },
          {
            id: 'c-v-5',
            title: 'Consulta 5 — pré-anestésico',
            date: '2026-03-01',
            rating: 'adequado',
            evaluator: 'Dr. Anestesista convidado',
            notes: 'Via aérea e jejum revisados; sem contraindicações.',
          },
          {
            id: 'c-v-6',
            title: 'Consulta 6 — última revisão',
            date: '2026-03-18',
            rating: 'pendente_avaliacao',
            evaluator: '—',
            notes: 'Aguardando descrição de movimentos fetais do dia.',
          },
        ],
      },
      {
        id: 'c-movement',
        title: 'Registro de movimentos fetais (dias)',
        target: 7,
        current: 5,
        unit: 'dias',
        professional: 'Enf. Paula Mendes',
        entries: [
          {
            id: 'c-m-1',
            title: 'Dia 1 — contagem de chutes',
            date: '2026-03-22',
            rating: 'adequado',
            evaluator: 'Enf. Paula Mendes',
            notes: '≥10 movimentos em 2h; padrão habitual.',
          },
          {
            id: 'c-m-2',
            title: 'Dia 2',
            date: '2026-03-23',
            rating: 'adequado',
            evaluator: 'Enf. Paula Mendes',
            notes: 'Sem queixas; registro enviado pelo app.',
          },
          {
            id: 'c-m-3',
            title: 'Dia 3',
            date: '2026-03-24',
            rating: 'com_ressalvas',
            evaluator: 'Enf. Paula Mendes',
            notes: 'Movimentos diminuídos à tarde; orientado estímulo e hidratação.',
          },
          {
            id: 'c-m-4',
            title: 'Dia 4',
            date: '2026-03-25',
            rating: 'adequado',
            evaluator: 'Enf. Paula Mendes',
            notes: 'Retorno ao padrão após orientação.',
          },
          {
            id: 'c-m-5',
            title: 'Dia 5',
            date: '2026-03-26',
            rating: 'adequado',
            evaluator: 'Enf. Paula Mendes',
            notes: 'Contagem dentro do esperado.',
          },
        ],
      },
      {
        id: 'c-bag',
        title: 'Itens do enxoval / mala (checklist)',
        target: 12,
        current: 9,
        unit: 'itens',
        professional: 'Equipe da maternidade',
        entries: [
          {
            id: 'c-b-1',
            title: 'Documentos e carteirinha',
            date: '2026-03-10',
            rating: 'adequado',
            evaluator: 'Recepção obstétrica',
            notes: 'Checklist impresso conferido com acompanhante.',
          },
          {
            id: 'c-b-2',
            title: 'Itens de higiene e conforto',
            date: '2026-03-12',
            rating: 'adequado',
            evaluator: 'Enf. Paula Mendes',
            notes: 'Falta apenas item descartável — compra orientada.',
          },
          {
            id: 'c-b-3',
            title: 'Roupinhas e saída maternidade',
            date: '2026-03-15',
            rating: 'com_ressalvas',
            evaluator: 'Enf. Paula Mendes',
            notes: 'Tamanho RN a revisar após ultrassom estimativa fetal.',
          },
        ],
      },
    ],
    clinicalChecklist: [
      {
        id: 'c1',
        name: 'Orientações sobre jejum / horário',
        status: 'ok',
        detail: {
          lastEvaluatedAt: '2026-03-16',
          evaluator: 'Enf. Paula Mendes',
          summary: 'Jejum de 8h e horário de chegada explicados à paciente e acompanhante.',
          criteria: ['Folheto assinado', 'Contato de urgência anotado'],
        },
      },
      {
        id: 'c2',
        name: 'Sinais de alerta (dor, sangramento, ausência de movimentos)',
        status: 'ok',
        detail: {
          lastEvaluatedAt: '2026-03-16',
          evaluator: 'Dra. Helena Moura',
          summary: 'Paciente verbalizou entendimento dos sinais de ir com urgência.',
        },
      },
      {
        id: 'c3',
        name: 'Tipo sanguíneo / cartão pré-natal',
        status: 'ok',
        detail: {
          lastEvaluatedAt: '2026-02-01',
          evaluator: 'Dra. Helena Moura',
          summary: 'Cartão digitalizado; tipo sanguíneo conferido com laboratório.',
        },
      },
      {
        id: 'c4',
        name: 'Avaliação de glicemia (se indicado)',
        status: 'follow_up',
        detail: {
          lastEvaluatedAt: '2026-03-20',
          evaluator: 'Dra. Helena Moura',
          summary: 'Curva em acompanhamento; manter dieta e retorno em 48h.',
        },
      },
    ],
  },
  vaginal_birth: {
    titleFirstPerson: 'Seu caminho até conhecer o bebê',
    subtitleFirstPerson:
      'Objetivos do pré-natal e preparo para o grande dia, conforme combinado com sua equipe.',
    isObstetric: true,
    goals: [
      {
        id: 'v-classes',
        title: 'Encontros de preparo para o parto',
        target: 4,
        current: 3,
        unit: 'sessões',
        professional: 'Equipe de educação em saúde',
        entries: [
          {
            id: 'v-cl-1',
            title: 'Sessão 1 — Acolhimento e mitos do parto',
            date: '2026-02-04',
            rating: 'adequado',
            evaluator: 'Enf. Carla Mota',
            notes: 'Participação ativa; esclarecidas dúvidas sobre dor e epidural.',
          },
          {
            id: 'v-cl-2',
            title: 'Sessão 2 — Fases do trabalho de parto',
            date: '2026-02-18',
            rating: 'adequado',
            evaluator: 'Enf. Carla Mota',
            notes: 'Boa compreensão dos sinais de evolução; prática de posições.',
          },
          {
            id: 'v-cl-3',
            title: 'Sessão 3 — Respiração e massagem',
            date: '2026-03-05',
            rating: 'com_ressalvas',
            evaluator: 'Enf. Carla Mota',
            notes: 'Técnica correta; sugerido treino diário 10 min com acompanhante.',
          },
          {
            id: 'v-cl-4',
            title: 'Sessão 4 — Pós-parto imediato e amamentação',
            date: '2026-03-28',
            rating: 'pendente_avaliacao',
            evaluator: '—',
            notes: 'Agendada; material de apoio enviado por e-mail.',
          },
        ],
      },
      {
        id: 'v-breathing',
        title: 'Prática de respiração / relaxamento',
        target: 14,
        current: 10,
        unit: 'dias',
        professional: 'Enf. Paula Mendes',
        entries: [
          {
            id: 'v-br-1',
            title: 'Dia 1 — linha de base',
            date: '2026-03-15',
            rating: 'adequado',
            evaluator: 'Enf. Paula Mendes',
            notes: 'Respiração 4-7-8 sem hiperventilação.',
          },
          {
            id: 'v-br-2',
            title: 'Dia 3 — com acompanhante',
            date: '2026-03-17',
            rating: 'adequado',
            evaluator: 'Enf. Paula Mendes',
            notes: 'Acompanhante auxilia contagem e contato verbal.',
          },
          {
            id: 'v-br-3',
            title: 'Dia 5 — sob leve estresse (simulação)',
            date: '2026-03-19',
            rating: 'com_ressalvas',
            evaluator: 'Enf. Paula Mendes',
            notes: 'Leve taquipneia; revisar ritmo e pausas.',
          },
          {
            id: 'v-br-4',
            title: 'Dia 7 — consistência semanal',
            date: '2026-03-21',
            rating: 'adequado',
            evaluator: 'Enf. Paula Mendes',
            notes: '7/7 dias com registro no diário.',
          },
          {
            id: 'v-br-5',
            title: 'Dia 10 — revisão',
            date: '2026-03-24',
            rating: 'adequado',
            evaluator: 'Enf. Paula Mendes',
            notes: 'Pronta para aplicar em trabalho de parto inicial.',
          },
        ],
      },
      {
        id: 'v-support',
        title: 'Plano de apoio no parto (acompanhante)',
        target: 5,
        current: 4,
        unit: 'itens',
        professional: 'Dra. equipe obstétrica',
        entries: [
          {
            id: 'v-sp-1',
            title: 'Papel do acompanhante na admissão',
            date: '2026-03-01',
            rating: 'adequado',
            evaluator: 'Dra. Helena Moura',
            notes: 'Definido quem preenche formulários e quem fica com a gestante.',
          },
          {
            id: 'v-sp-2',
            title: 'Hidratação e lanches leves',
            date: '2026-03-02',
            rating: 'adequado',
            evaluator: 'Enf. Paula Mendes',
            notes: 'Lista de alimentos permitidos na fase latente.',
          },
          {
            id: 'v-sp-3',
            title: 'Contatos de emergência',
            date: '2026-03-04',
            rating: 'adequado',
            evaluator: 'Dra. Helena Moura',
            notes: 'Telefones atualizados na pulseira e no prontuário.',
          },
          {
            id: 'v-sp-4',
            title: 'Plano B (transporte alternativo)',
            date: '2026-03-08',
            rating: 'com_ressalvas',
            evaluator: 'Dra. Helena Moura',
            notes: 'Segundo motorista ainda não confirmado — reforçar até 36 sem.',
          },
        ],
      },
    ],
    clinicalChecklist: [
      {
        id: 'v1',
        name: 'Plano de transporte para a maternidade',
        status: 'ok',
        detail: {
          lastEvaluatedAt: '2026-03-10',
          evaluator: 'Enf. Paula Mendes',
          summary: 'Rota e tempo estimado revisados; tanque cheio e contato do táxi anotado.',
        },
      },
      {
        id: 'v2',
        name: 'Reconhecimento de contrações regulares',
        status: 'ok',
        detail: {
          lastEvaluatedAt: '2026-03-12',
          evaluator: 'Enf. Carla Mota',
          summary: 'Casal demonstrou uso do app de marcação de contrações.',
        },
      },
      {
        id: 'v3',
        name: 'Hidratação e alimentação na fase inicial (orientação da equipe)',
        status: 'follow_up',
        detail: {
          lastEvaluatedAt: '2026-03-20',
          evaluator: 'Enf. Paula Mendes',
          summary: 'Revisar líquidos claros na fase latente; evitar frituras.',
        },
      },
      {
        id: 'v4',
        name: 'Sinais de ir com urgência (sangramento, dor intensa, alteração dos movimentos)',
        status: 'ok',
        detail: {
          lastEvaluatedAt: '2026-03-14',
          evaluator: 'Dra. Helena Moura',
          summary: 'Paciente e acompanhante repetiram os quatro sinais de alerta.',
        },
      },
    ],
  },
}

export function resolvePatientJourneyType(option: ViewAsOption | null): PatientJourneyType | null {
  if (!option) return null
  if (option.context === 'paciente') return option.patientJourney ?? null
  if (option.context === 'acompanhante') return option.linkedPatientJourney ?? null
  return null
}

export function getPatientDashboardMock(option: ViewAsOption | null): PatientDashboardMock | null {
  const journey =
    option?.context === 'paciente'
      ? (option.patientJourney ?? null)
      : option?.context === 'acompanhante'
        ? (option.linkedPatientJourney ?? null)
        : null
  if (!journey) return null
  const base = byJourney[journey]
  return { journeyType: journey, ...base }
}

export function goalEntryRatingLabel(rating: GoalEntryRating): string {
  switch (rating) {
    case 'adequado':
      return 'Adequado'
    case 'com_ressalvas':
      return 'Com ressalvas'
    case 'pendente_avaliacao':
      return 'Pendente de avaliação'
    default:
      return rating
  }
}

/** Badge (pill) — uso em listagens e cards. */
export function goalEntryRatingBadgeClass(rating: GoalEntryRating): string {
  switch (rating) {
    case 'adequado':
      return 'bg-emerald-100 text-emerald-900 ring-1 ring-emerald-200/90 dark:bg-emerald-900/45 dark:text-emerald-100 dark:ring-emerald-600/40'
    case 'com_ressalvas':
      return 'bg-amber-100 text-amber-950 ring-1 ring-amber-200/90 dark:bg-amber-900/40 dark:text-amber-100 dark:ring-amber-600/35'
    case 'pendente_avaliacao':
      return 'bg-sky-100 text-sky-950 ring-1 ring-sky-200/90 dark:bg-sky-950/55 dark:text-sky-100 dark:ring-sky-700/45'
    default:
      return 'bg-slate-100 text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-600'
  }
}

/** Fundo e borda lateral para linha inteira na tela de avaliações. */
export function goalEntryRatingRowClass(rating: GoalEntryRating): string {
  switch (rating) {
    case 'adequado':
      return 'border-l-4 border-emerald-500 bg-emerald-50/50 dark:border-emerald-400/80 dark:bg-emerald-950/25'
    case 'com_ressalvas':
      return 'border-l-4 border-amber-500 bg-amber-50/50 dark:border-amber-400/80 dark:bg-amber-950/25'
    case 'pendente_avaliacao':
      return 'border-l-4 border-sky-500 bg-sky-50/50 dark:border-sky-400/80 dark:bg-sky-950/25'
    default:
      return 'border-l-4 border-slate-300 bg-slate-50/80 dark:border-slate-600 dark:bg-slate-900/40'
  }
}

export function getJourneyLabel(type: PatientJourneyType | null): string {
  if (!type) return ''
  return PATIENT_JOURNEY_LABELS[type]
}

export type CompanionPhaseCard = {
  key: string
  title: string
  status: string
  details: string[]
}

export function getCompanionPhaseCards(
  journey: PatientJourneyType | null,
  surgeryPhase: string,
): CompanionPhaseCard[] {
  if (journey === 'cesarean' || journey === 'vaginal_birth') {
    return [
      {
        key: 'pre',
        title: 'Pré-natal / preparo',
        status: ['SCHEDULED', 'ADMITTED'].includes(surgeryPhase)
          ? 'Em acompanhamento'
          : 'Concluído',
        details: [
          'Consultas e orientações da equipe',
          'Sinais de alerta explicados à família',
          'Documentação e plano de ida à maternidade',
        ],
      },
      {
        key: 'birth',
        title: journey === 'cesarean' ? 'Cesárea' : 'Parto',
        status:
          surgeryPhase === 'IN_SURGERY'
            ? 'Em andamento'
            : surgeryPhase === 'IN_RECOVERY'
              ? 'Concluído'
              : 'Aguardando',
        details: [
          'Comunicação com a equipe na maternidade',
          'Atualizações quando permitido pela unidade',
          'Apoio emocional à gestante',
        ],
      },
      {
        key: 'post',
        title: 'Puerpério',
        status:
          surgeryPhase === 'IN_RECOVERY'
            ? 'Momento atual'
            : surgeryPhase === 'DISCHARGED'
              ? 'Concluído'
              : 'Aguardando',
        details: [
          'Recuperação e orientações de alta',
          'Amamentação e cuidados (se aplicável)',
          'Retornos agendados',
        ],
      },
    ]
  }

  return [
    {
      key: 'pre',
      title: 'Pré-operatório',
      status: ['SCHEDULED', 'ADMITTED'].includes(surgeryPhase) ? 'Em preparação' : 'Concluído',
      details: ['Checklist clínico', 'Orientações da equipe', 'Preparo do paciente'],
    },
    {
      key: 'intra',
      title: 'Intraoperatório',
      status:
        surgeryPhase === 'IN_SURGERY'
          ? 'Em andamento'
          : surgeryPhase === 'IN_RECOVERY'
            ? 'Concluído'
            : 'Aguardando',
      details: ['Monitoramento de sinais', 'Alertas acompanhados', 'Duração do procedimento'],
    },
    {
      key: 'post',
      title: 'Pós-operatório',
      status:
        surgeryPhase === 'IN_RECOVERY'
          ? 'Em observação'
          : surgeryPhase === 'DISCHARGED'
            ? 'Concluído'
            : 'Não iniciado',
      details: ['Recuperação', 'Controle de sintomas', 'Plano de alta'],
    },
  ]
}

export function examStatusLabel(status: ExamStatus): string {
  switch (status) {
    case 'ok':
      return 'Conforme equipe'
    case 'pending':
      return 'Pendente'
    case 'follow_up':
      return 'Em acompanhamento'
    default:
      return status
  }
}

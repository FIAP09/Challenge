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
  entries?: GoalProgressEntry[]
}

export type ExamItem = {
  id: string
  name: string
  status: ExamStatus
  note?: string
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
  goals: GoalItem[]
  exams?: ExamItem[]
}

type MomentTemplate = { id: string; title: string; description: string }

const bariatricMomentTemplates: MomentTemplate[] = [
  {
    id: 'bar-prepare',
    title: 'Pré-operatório',
    description:
      'Exames, avaliações de especialistas, nutrição e atividade no ritmo combinado com a equipe — cada meta cumprida aproxima você da cirurgia.',
  },
  {
    id: 'bar-surgery',
    title: 'Cirurgia',
    description:
      'A equipe está totalmente focada no seu bem-estar neste momento. O registro do procedimento será feito pelo cirurgião.',
  },
  {
    id: 'bar-followup',
    title: 'Acompanhamento pós-operatório',
    description:
      'Controle de peso, dieta, atividade física, sono e exames laboratoriais — seu novo estilo de vida começa aqui.',
  },
]

const preCareStatuses: SurgeryStatus[] = ['REQUESTED', 'APPROVED', 'SCHEDULED', 'ADMITTED']

export function mapCareStatusToStep(status: SurgeryStatus): number {
  if (status === 'DISCHARGED') return 3
  if (preCareStatuses.includes(status)) return 0
  if (status === 'IN_SURGERY') return 1
  if (status === 'IN_RECOVERY' || status === 'COMPLICATION') return 2
  if (status === 'CANCELLED') return 0
  return 0
}

export function buildPatientMoments(
  _journey: PatientJourneyType,
  careStatus: SurgeryStatus,
  overallProgress: number,
  matchedRecord: boolean,
): JourneyMoment[] {
  const activeStep = matchedRecord
    ? mapCareStatusToStep(careStatus)
    : overallProgress < 46 ? 0 : overallProgress < 82 ? 1 : 2

  return bariatricMomentTemplates.map((t, index) => {
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

const bariatricDashboard: Omit<PatientDashboardMock, 'journeyType'> = {
  titleFirstPerson: 'Seu plano de acompanhamento',
  subtitleFirstPerson:
    'Metas definidas pela sua equipe, momento da sua jornada e como está seu progresso — tudo em um só lugar.',
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
          notes: 'Meta 1,5 L atingida na primeira semana.',
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
  return { journeyType: journey, ...bariatricDashboard }
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
  _journey: PatientJourneyType | null,
  surgeryPhase: string,
): CompanionPhaseCard[] {
  return [
    {
      key: 'pre',
      title: 'Pré-operatório',
      status: ['SCHEDULED', 'ADMITTED'].includes(surgeryPhase) ? 'Em preparação' : 'Concluído',
      details: ['Checklist clínico e exames de especialistas', 'Orientações da equipe', 'Preparo nutricional e psicológico'],
    },
    {
      key: 'surgery',
      title: 'Cirurgia',
      status:
        surgeryPhase === 'IN_SURGERY'
          ? 'Em andamento'
          : surgeryPhase === 'IN_RECOVERY'
            ? 'Concluído'
            : 'Aguardando',
      details: ['Registro do procedimento', 'Técnica e duração', 'Registro de complicações'],
    },
    {
      key: 'post',
      title: 'Acompanhamento pós-operatório',
      status:
        surgeryPhase === 'IN_RECOVERY'
          ? 'Em acompanhamento'
          : surgeryPhase === 'DISCHARGED'
            ? 'Concluído'
            : 'Não iniciado',
      details: ['Curva de peso e reganho', 'Dieta, sono e atividade física', 'Exames laboratoriais'],
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

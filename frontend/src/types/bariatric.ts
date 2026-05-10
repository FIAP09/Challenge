export type ExamSpecialty =
  | 'cardiologia'
  | 'pneumologia'
  | 'endocrinologia'
  | 'nutrologia'
  | 'psicologia'
  | 'nutricionista'
  | 'outro'

export type ExamStatus = 'realizado' | 'pendente' | 'acompanhamento'

export interface ExamTimelineEntry {
  id: string
  name: string
  specialty: ExamSpecialty
  date: string
  fileUrl?: string
  status: ExamStatus
  notes?: string
  evaluator?: string
}

export interface WeightEntry {
  date: string
  weight_kg: number
}

export interface LabEntry {
  id: string
  date: string
  exam_name: string
  value: number
  unit: string
  reference_range?: string
  status: 'normal' | 'alterado' | 'critico'
}

export type MealType = 'cafe_manha' | 'lanche_manha' | 'almoco' | 'lanche_tarde' | 'jantar' | 'ceia'

export interface DietEntry {
  id: string
  date: string
  meal_type: MealType
  description: string
  calories?: number
}

export type SleepQuality = 'bom' | 'regular' | 'ruim'

export interface SleepEntry {
  id: string
  date: string
  hours: number
  quality: SleepQuality
  notes?: string
}

export interface ActivityEntry {
  id: string
  date: string
  type: string
  duration_min: number
  notes?: string
}

export type OrientationCategory = 'expectativas' | 'dieta' | 'geral'

export interface OrientationDocument {
  id: string
  title: string
  content: string
  category: OrientationCategory
}

export const EXAM_SPECIALTY_LABELS: Record<ExamSpecialty, string> = {
  cardiologia: 'Cardiologia',
  pneumologia: 'Pneumologia',
  endocrinologia: 'Endocrinologia',
  nutrologia: 'Nutrologia',
  psicologia: 'Psicologia',
  nutricionista: 'Nutricionista',
  outro: 'Outro',
}

export const MEAL_TYPE_LABELS: Record<MealType, string> = {
  cafe_manha: 'Café da manhã',
  lanche_manha: 'Lanche da manhã',
  almoco: 'Almoço',
  lanche_tarde: 'Lanche da tarde',
  jantar: 'Jantar',
  ceia: 'Ceia',
}

export const ORIENTATION_CATEGORY_LABELS: Record<OrientationCategory, string> = {
  expectativas: 'Expectativas de perda de peso',
  dieta: 'Orientações de dieta',
  geral: 'Orientações gerais',
}

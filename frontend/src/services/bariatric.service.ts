import type {
  ExamTimelineEntry,
  WeightEntry,
  LabEntry,
  DietEntry,
  SleepEntry,
  ActivityEntry,
  OrientationDocument,
} from '@/types/bariatric'
import type { SurgeryRecord } from '@/types/surgery'

/* ------------------------------------------------------------------ */
/*  Weight History – 6 months post-sleeve (Dec 2025 → May 2026)       */
/* ------------------------------------------------------------------ */
const MOCK_WEIGHT_HISTORY: WeightEntry[] = [
  { date: '2025-11-28', weight_kg: 121.4 }, // pre-op
  { date: '2025-12-05', weight_kg: 118.2 }, // 1 week post-op
  { date: '2025-12-19', weight_kg: 114.6 },
  { date: '2026-01-02', weight_kg: 111.3 },
  { date: '2026-01-16', weight_kg: 108.8 },
  { date: '2026-01-30', weight_kg: 106.5 },
  { date: '2026-02-13', weight_kg: 104.9 },
  { date: '2026-02-27', weight_kg: 103.2 },
  { date: '2026-03-13', weight_kg: 101.7 },
  { date: '2026-03-27', weight_kg: 100.4 },
  { date: '2026-04-10', weight_kg: 98.6 },
  { date: '2026-04-24', weight_kg: 97.1 },
  { date: '2026-05-08', weight_kg: 95.3 },
]

/* ------------------------------------------------------------------ */
/*  Lab History                                                        */
/* ------------------------------------------------------------------ */
const MOCK_LAB_HISTORY: LabEntry[] = [
  // --- Pre-op (Nov 2025) ---
  { id: 'lab-001', date: '2025-11-20', exam_name: 'Hemoglobina', value: 13.8, unit: 'g/dL', reference_range: '12.0–16.0', status: 'normal' },
  { id: 'lab-002', date: '2025-11-20', exam_name: 'Ferritina', value: 45, unit: 'ng/mL', reference_range: '12–150', status: 'normal' },
  { id: 'lab-003', date: '2025-11-20', exam_name: 'Vitamina B12', value: 380, unit: 'pg/mL', reference_range: '200–900', status: 'normal' },
  { id: 'lab-004', date: '2025-11-20', exam_name: 'Albumina', value: 4.1, unit: 'g/dL', reference_range: '3.5–5.5', status: 'normal' },
  { id: 'lab-005', date: '2025-11-20', exam_name: 'Glicose em jejum', value: 118, unit: 'mg/dL', reference_range: '70–99', status: 'alterado' },
  { id: 'lab-006', date: '2025-11-20', exam_name: 'HbA1c', value: 6.3, unit: '%', reference_range: '< 5.7', status: 'alterado' },
  { id: 'lab-007', date: '2025-11-20', exam_name: 'Colesterol total', value: 224, unit: 'mg/dL', reference_range: '< 200', status: 'alterado' },
  { id: 'lab-008', date: '2025-11-20', exam_name: 'Triglicerídeos', value: 198, unit: 'mg/dL', reference_range: '< 150', status: 'alterado' },
  { id: 'lab-009', date: '2025-11-20', exam_name: 'Vitamina D (25-OH)', value: 22, unit: 'ng/mL', reference_range: '30–100', status: 'alterado' },

  // --- 2 months post-op (Feb 2026) ---
  { id: 'lab-010', date: '2026-02-10', exam_name: 'Hemoglobina', value: 12.6, unit: 'g/dL', reference_range: '12.0–16.0', status: 'normal' },
  { id: 'lab-011', date: '2026-02-10', exam_name: 'Ferritina', value: 28, unit: 'ng/mL', reference_range: '12–150', status: 'normal' },
  { id: 'lab-012', date: '2026-02-10', exam_name: 'Vitamina B12', value: 310, unit: 'pg/mL', reference_range: '200–900', status: 'normal' },
  { id: 'lab-013', date: '2026-02-10', exam_name: 'Albumina', value: 3.7, unit: 'g/dL', reference_range: '3.5–5.5', status: 'normal' },
  { id: 'lab-014', date: '2026-02-10', exam_name: 'Glicose em jejum', value: 102, unit: 'mg/dL', reference_range: '70–99', status: 'alterado' },
  { id: 'lab-015', date: '2026-02-10', exam_name: 'HbA1c', value: 5.9, unit: '%', reference_range: '< 5.7', status: 'alterado' },
  { id: 'lab-016', date: '2026-02-10', exam_name: 'Colesterol total', value: 195, unit: 'mg/dL', reference_range: '< 200', status: 'normal' },
  { id: 'lab-017', date: '2026-02-10', exam_name: 'Triglicerídeos', value: 142, unit: 'mg/dL', reference_range: '< 150', status: 'normal' },
  { id: 'lab-018', date: '2026-02-10', exam_name: 'Vitamina D (25-OH)', value: 28, unit: 'ng/mL', reference_range: '30–100', status: 'alterado' },

  // --- 5 months post-op (May 2026) ---
  { id: 'lab-019', date: '2026-05-05', exam_name: 'Hemoglobina', value: 12.2, unit: 'g/dL', reference_range: '12.0–16.0', status: 'normal' },
  { id: 'lab-020', date: '2026-05-05', exam_name: 'Ferritina', value: 18, unit: 'ng/mL', reference_range: '12–150', status: 'normal' },
  { id: 'lab-021', date: '2026-05-05', exam_name: 'Vitamina B12', value: 195, unit: 'pg/mL', reference_range: '200–900', status: 'alterado' },
  { id: 'lab-022', date: '2026-05-05', exam_name: 'Albumina', value: 3.9, unit: 'g/dL', reference_range: '3.5–5.5', status: 'normal' },
  { id: 'lab-023', date: '2026-05-05', exam_name: 'Glicose em jejum', value: 91, unit: 'mg/dL', reference_range: '70–99', status: 'normal' },
  { id: 'lab-024', date: '2026-05-05', exam_name: 'HbA1c', value: 5.4, unit: '%', reference_range: '< 5.7', status: 'normal' },
  { id: 'lab-025', date: '2026-05-05', exam_name: 'Colesterol total', value: 178, unit: 'mg/dL', reference_range: '< 200', status: 'normal' },
  { id: 'lab-026', date: '2026-05-05', exam_name: 'Triglicerídeos', value: 118, unit: 'mg/dL', reference_range: '< 150', status: 'normal' },
  { id: 'lab-027', date: '2026-05-05', exam_name: 'Vitamina D (25-OH)', value: 34, unit: 'ng/mL', reference_range: '30–100', status: 'normal' },
  { id: 'lab-028', date: '2026-05-05', exam_name: 'Cálcio iônico', value: 1.18, unit: 'mmol/L', reference_range: '1.15–1.35', status: 'normal' },
  { id: 'lab-029', date: '2026-05-05', exam_name: 'PTH', value: 68, unit: 'pg/mL', reference_range: '15–65', status: 'alterado' },
  { id: 'lab-030', date: '2026-05-05', exam_name: 'Zinco', value: 72, unit: 'µg/dL', reference_range: '70–120', status: 'normal' },
]

/* ------------------------------------------------------------------ */
/*  Exam Timeline                                                      */
/* ------------------------------------------------------------------ */
const MOCK_EXAM_TIMELINE: ExamTimelineEntry[] = [
  // Pre-op evaluations
  {
    id: 'ex-001',
    name: 'Eletrocardiograma',
    specialty: 'cardiologia',
    date: '2025-10-15',
    status: 'realizado',
    notes: 'Ritmo sinusal, sem alterações significativas.',
    evaluator: 'Dr. Ricardo Mendes',
  },
  {
    id: 'ex-002',
    name: 'Ecocardiograma transtorácico',
    specialty: 'cardiologia',
    date: '2025-10-18',
    status: 'realizado',
    notes: 'FE 62%. Câmaras com dimensões normais. Sem valvopatias.',
    evaluator: 'Dr. Ricardo Mendes',
  },
  {
    id: 'ex-003',
    name: 'Espirometria',
    specialty: 'pneumologia',
    date: '2025-10-22',
    status: 'realizado',
    notes: 'CVF 3.8L (86% do previsto). VEF1/CVF 0.81. Sem distúrbio ventilatório.',
    evaluator: 'Dra. Camila Ferreira',
  },
  {
    id: 'ex-004',
    name: 'Polissonografia',
    specialty: 'pneumologia',
    date: '2025-10-28',
    status: 'realizado',
    notes: 'IAH 18/h – apneia obstrutiva moderada. Indicado CPAP pré-operatório.',
    evaluator: 'Dra. Camila Ferreira',
  },
  {
    id: 'ex-005',
    name: 'Avaliação endocrinológica',
    specialty: 'endocrinologia',
    date: '2025-11-05',
    status: 'realizado',
    notes: 'Resistência insulínica confirmada. TSH normal. Sem contraindicação endócrina à cirurgia.',
    evaluator: 'Dra. Letícia Braga',
  },
  {
    id: 'ex-006',
    name: 'Avaliação nutrológica pré-operatória',
    specialty: 'nutrologia',
    date: '2025-11-08',
    status: 'realizado',
    notes: 'IMC 40.2 kg/m². Deficiência de vitamina D. Iniciada suplementação.',
    evaluator: 'Dr. Felipe Costa',
  },
  {
    id: 'ex-007',
    name: 'Avaliação psicológica pré-operatória',
    specialty: 'psicologia',
    date: '2025-11-10',
    status: 'realizado',
    notes: 'Paciente com motivação adequada, expectativas realistas. Sem transtornos alimentares ativos. Apto para cirurgia.',
    evaluator: 'Dra. Ana Paula Oliveira',
  },
  {
    id: 'ex-008',
    name: 'Avaliação nutricional pré-operatória',
    specialty: 'nutricionista',
    date: '2025-11-12',
    status: 'realizado',
    notes: 'Dieta hipocalórica de preparo iniciada. Orientações sobre fases da dieta pós-operatória.',
    evaluator: 'Nutr. Juliana Martins',
  },

  // Post-op follow-ups
  {
    id: 'ex-009',
    name: 'Retorno nutricional – fase líquida',
    specialty: 'nutricionista',
    date: '2025-12-12',
    status: 'realizado',
    notes: 'Boa aceitação da dieta líquida completa. Hidratação adequada. Sem vômitos.',
    evaluator: 'Nutr. Juliana Martins',
  },
  {
    id: 'ex-010',
    name: 'Retorno nutrológico 30 dias',
    specialty: 'nutrologia',
    date: '2026-01-05',
    status: 'realizado',
    notes: 'Perda de 10 kg no primeiro mês. Suplementação polivitamínica mantida.',
    evaluator: 'Dr. Felipe Costa',
  },
  {
    id: 'ex-011',
    name: 'Retorno psicológico 60 dias',
    specialty: 'psicologia',
    date: '2026-02-05',
    status: 'realizado',
    notes: 'Adaptação ao novo padrão alimentar em progresso. Paciente relata melhora do humor e autoestima.',
    evaluator: 'Dra. Ana Paula Oliveira',
  },
  {
    id: 'ex-012',
    name: 'Retorno endocrinológico 3 meses',
    specialty: 'endocrinologia',
    date: '2026-03-05',
    status: 'realizado',
    notes: 'Glicose em jejum normalizada. Metformina suspensa. HbA1c 5.9%. Manter acompanhamento.',
    evaluator: 'Dra. Letícia Braga',
  },
  {
    id: 'ex-013',
    name: 'Retorno nutricional – fase branda',
    specialty: 'nutricionista',
    date: '2026-03-15',
    status: 'realizado',
    notes: 'Tolerando bem dieta branda. Orientação sobre mastigação e volume das porções.',
    evaluator: 'Nutr. Juliana Martins',
  },
  {
    id: 'ex-014',
    name: 'Polissonografia de controle',
    specialty: 'pneumologia',
    date: '2026-04-20',
    status: 'realizado',
    notes: 'IAH 6/h – melhora significativa. CPAP suspenso.',
    evaluator: 'Dra. Camila Ferreira',
  },
  {
    id: 'ex-015',
    name: 'Retorno cardiológico 6 meses',
    specialty: 'cardiologia',
    date: '2026-05-20',
    status: 'pendente',
    evaluator: 'Dr. Ricardo Mendes',
  },
  {
    id: 'ex-016',
    name: 'Retorno nutrológico 6 meses',
    specialty: 'nutrologia',
    date: '2026-05-25',
    status: 'pendente',
    evaluator: 'Dr. Felipe Costa',
  },
  {
    id: 'ex-017',
    name: 'Densitometria óssea',
    specialty: 'endocrinologia',
    date: '2026-06-10',
    status: 'pendente',
    notes: 'Solicitada devido ao PTH discretamente elevado.',
    evaluator: 'Dra. Letícia Braga',
  },
]

/* ------------------------------------------------------------------ */
/*  Diet Log – 3 days                                                  */
/* ------------------------------------------------------------------ */
const MOCK_DIET_LOG: DietEntry[] = [
  // Day 1 – 2026-05-07
  { id: 'diet-001', date: '2026-05-07', meal_type: 'cafe_manha', description: 'Iogurte natural desnatado com 1 col. sopa de aveia e 5 morangos', calories: 180 },
  { id: 'diet-002', date: '2026-05-07', meal_type: 'lanche_manha', description: 'Queijo cottage (2 col. sopa) com 3 torradas integrais pequenas', calories: 140 },
  { id: 'diet-003', date: '2026-05-07', meal_type: 'almoco', description: 'Frango grelhado desfiado (80g), purê de abóbora (3 col. sopa), abobrinha refogada', calories: 320 },
  { id: 'diet-004', date: '2026-05-07', meal_type: 'lanche_tarde', description: 'Vitamina de banana com leite desnatado e canela (150ml)', calories: 130 },
  { id: 'diet-005', date: '2026-05-07', meal_type: 'jantar', description: 'Omelete de 2 ovos com espinafre e queijo branco, salada de alface', calories: 260 },
  { id: 'diet-006', date: '2026-05-07', meal_type: 'ceia', description: 'Chá de camomila com 2 bolachas de arroz', calories: 60 },

  // Day 2 – 2026-05-08
  { id: 'diet-007', date: '2026-05-08', meal_type: 'cafe_manha', description: 'Tapioca pequena com ovo mexido e requeijão light', calories: 210 },
  { id: 'diet-008', date: '2026-05-08', meal_type: 'lanche_manha', description: '1 fatia de mamão papaya com linhaça', calories: 95 },
  { id: 'diet-009', date: '2026-05-08', meal_type: 'almoco', description: 'Peixe assado (tilápia 90g), arroz integral (2 col. sopa), cenoura cozida e brócolis', calories: 340 },
  { id: 'diet-010', date: '2026-05-08', meal_type: 'lanche_tarde', description: 'Iogurte grego light com 1 col. chá de mel', calories: 120 },
  { id: 'diet-011', date: '2026-05-08', meal_type: 'jantar', description: 'Sopa de legumes com frango desfiado (200ml)', calories: 220 },
  { id: 'diet-012', date: '2026-05-08', meal_type: 'ceia', description: 'Leite morno desnatado (100ml) com canela', calories: 50 },

  // Day 3 – 2026-05-09
  { id: 'diet-013', date: '2026-05-09', meal_type: 'cafe_manha', description: 'Mingau de aveia com leite desnatado (150ml) e 1 col. chá de cacau', calories: 190 },
  { id: 'diet-014', date: '2026-05-09', meal_type: 'lanche_manha', description: '1 pera pequena picada', calories: 70 },
  { id: 'diet-015', date: '2026-05-09', meal_type: 'almoco', description: 'Carne moída magra (80g), purê de batata doce (3 col. sopa), vagem refogada', calories: 350 },
  { id: 'diet-016', date: '2026-05-09', meal_type: 'lanche_tarde', description: 'Coalhada desnatada com 1 col. sopa de granola sem açúcar', calories: 130 },
  { id: 'diet-017', date: '2026-05-09', meal_type: 'jantar', description: 'Panqueca de frango com massa de aveia (1 unidade), salada de rúcula com tomate', calories: 280 },
  { id: 'diet-018', date: '2026-05-09', meal_type: 'ceia', description: 'Chá de erva-doce', calories: 5 },
]

/* ------------------------------------------------------------------ */
/*  Sleep Log – 7 days                                                 */
/* ------------------------------------------------------------------ */
const MOCK_SLEEP_LOG: SleepEntry[] = [
  { id: 'sleep-001', date: '2026-05-03', hours: 7.5, quality: 'bom', notes: 'Dormiu sem interrupções.' },
  { id: 'sleep-002', date: '2026-05-04', hours: 6.0, quality: 'regular', notes: 'Acordou uma vez durante a noite para ir ao banheiro.' },
  { id: 'sleep-003', date: '2026-05-05', hours: 7.0, quality: 'bom' },
  { id: 'sleep-004', date: '2026-05-06', hours: 5.5, quality: 'ruim', notes: 'Dificuldade para dormir, ansiedade relatada.' },
  { id: 'sleep-005', date: '2026-05-07', hours: 7.0, quality: 'bom' },
  { id: 'sleep-006', date: '2026-05-08', hours: 6.5, quality: 'regular', notes: 'Dormiu tarde, assistindo TV.' },
  { id: 'sleep-007', date: '2026-05-09', hours: 8.0, quality: 'bom', notes: 'Melhor noite da semana.' },
]

/* ------------------------------------------------------------------ */
/*  Activity Log – 7 days                                              */
/* ------------------------------------------------------------------ */
const MOCK_ACTIVITY_LOG: ActivityEntry[] = [
  { id: 'act-001', date: '2026-05-03', type: 'Caminhada leve', duration_min: 30, notes: 'Caminhada no condomínio, ritmo leve.' },
  { id: 'act-002', date: '2026-05-04', type: 'Pilates', duration_min: 45, notes: 'Aula com foco em fortalecimento abdominal e postural.' },
  { id: 'act-003', date: '2026-05-05', type: 'Caminhada leve', duration_min: 35 },
  { id: 'act-004', date: '2026-05-06', type: 'Descanso', duration_min: 0, notes: 'Dia de descanso ativo – alongamentos leves.' },
  { id: 'act-005', date: '2026-05-07', type: 'Hidroginástica', duration_min: 40, notes: 'Primeira aula. Boa tolerância.' },
  { id: 'act-006', date: '2026-05-08', type: 'Caminhada leve', duration_min: 40, notes: 'Aumentou o tempo em relação às caminhadas anteriores.' },
  { id: 'act-007', date: '2026-05-09', type: 'Pilates', duration_min: 45 },
]

/* ------------------------------------------------------------------ */
/*  Orientation Documents                                              */
/* ------------------------------------------------------------------ */
const MOCK_ORIENTATIONS: OrientationDocument[] = [
  {
    id: 'orient-002',
    title: 'Expectativas de perda de peso após a cirurgia',
    category: 'expectativas',
    content: `É importante ter expectativas realistas sobre a evolução do peso após a cirurgia bariátrica.

**Curva típica de perda de peso:**

• **Mês 1:** Perda mais rápida, geralmente entre 8–12 kg. Grande parte é água e glicogênio. É normal sentir fraqueza nesse período.

• **Meses 2–6:** Perda de 3–5 kg por mês. O ritmo vai desacelerando gradualmente. Essa é a fase de maior perda de gordura corporal.

• **Meses 6–12:** Perda de 1–3 kg por mês. O corpo começa a se adaptar ao novo metabolismo. Platôs de peso são comuns e esperados.

• **Meses 12–18:** Estabilização progressiva. A maioria dos pacientes atinge o peso mínimo (nadir) entre 12 e 18 meses após a cirurgia.

**Percentual de excesso de peso perdido (%PEP):**

O indicador mais utilizado para avaliar o sucesso da cirurgia é o percentual de excesso de peso perdido:

• **Sleeve (gastrectomia vertical):** Expectativa de 60–70% do excesso de peso perdido em 12–18 meses.
• **Bypass gástrico em Y de Roux:** Expectativa de 70–80% do excesso de peso perdido em 12–18 meses.

Exemplo: Se o peso ideal é 70 kg e o peso pré-operatório é 120 kg, o excesso de peso é 50 kg. Com 70% de PEP, a perda esperada é de 35 kg, atingindo ~85 kg.

**Reganho de peso:**

• É normal um reganho discreto (5–10% do peso mínimo atingido) após 18–24 meses. Isso não significa fracasso.
• Reganho acima de 15–20% requer avaliação multidisciplinar (nutrologia, nutrição, psicologia, endocrinologia).
• Manter o acompanhamento, atividade física regular e adesão ao plano alimentar são fundamentais para manter o resultado.

**Importante:** A cirurgia é uma ferramenta. O sucesso a longo prazo depende de mudanças permanentes de hábitos alimentares e de estilo de vida.`,
  },
  {
    id: 'orient-003',
    title: 'Orientações de dieta pós-bariátrica',
    category: 'dieta',
    content: `A evolução da dieta após a cirurgia bariátrica segue fases progressivas para permitir a cicatrização e adaptação do estômago.

**Fase 1 – Dieta líquida clara (dias 1–3 pós-operatório):**
• Água, chá claro, água de coco, caldo coado (sem gordura), gelatina diet.
• Volume: 50–100 ml por vez, em pequenos goles, a cada 30 minutos.
• Não usar canudo. Evitar líquidos gelados ou muito quentes.

**Fase 2 – Dieta líquida completa (dias 4–14):**
• Leite desnatado, iogurte natural batido, sopas batidas e coadas, sucos coados diluídos (sem açúcar).
• Suplementação proteica líquida conforme orientação (whey protein isolado).
• Volume: 100–150 ml por refeição. Mínimo 1 litro de líquidos por dia.

**Fase 3 – Dieta pastosa (semanas 3–4):**
• Purês (batata, abóbora, cenoura), ovos mexidos moles, carne moída bem cozida e amassada, frutas amassadas (banana, mamão).
• Mastigar lentamente (20–30 mastigadas por porção). Parar ao menor sinal de saciedade.
• Volume: 150–200 ml por refeição.

**Fase 4 – Dieta branda (semanas 5–8):**
• Carnes macias desfiadas ou em cubos pequenos, arroz bem cozido, legumes cozidos, pão de forma sem casca.
• Introdução gradual de novos alimentos (um por vez), observando tolerância.
• Volume: 200–250 ml por refeição.

**Fase 5 – Dieta normal adaptada (a partir da semana 9):**
• Alimentação variada, com foco em proteínas em todas as refeições.
• Evitar: açúcares simples, frituras, refrigerantes, bebidas gaseificadas, alimentos ultraprocessados.
• Não beber líquidos durante as refeições (aguardar 30 minutos antes e depois).
• Meta de proteína: 60–80g/dia. Meta calórica: 800–1200 kcal/dia (conforme orientação individual).

**Regras de ouro para todas as fases:**
• Comer devagar, em ambiente calmo, sem distrações.
• Priorizar proteínas, depois vegetais, por último carboidratos.
• Não deitar imediatamente após as refeições.
• Hidratação: mínimo de 1,5 litros de líquidos por dia, entre as refeições.
• Registrar a alimentação diária para acompanhamento da equipe.`,
  },
  {
    id: 'orient-004',
    title: 'Orientações gerais pós-cirurgia bariátrica',
    category: 'geral',
    content: `O sucesso da cirurgia bariátrica depende de mudanças de hábitos sustentáveis e de acompanhamento multidisciplinar contínuo.

**Atividade física:**

• **Semanas 1–2:** Caminhadas leves de 10–15 minutos, 2–3 vezes ao dia. Objetivo: evitar trombose e melhorar a recuperação.
• **Semanas 3–6:** Caminhadas de 20–30 minutos diários. Pode iniciar alongamentos suaves.
• **A partir do 2° mês:** Liberação gradual para atividades de baixo impacto (pilates, hidroginástica, bicicleta ergométrica), conforme avaliação médica.
• **A partir do 3° mês:** Musculação leve com acompanhamento de educador físico. Fundamental para preservar massa muscular durante a perda de peso.
• **Meta a longo prazo:** 150 minutos de atividade moderada por semana (recomendação da OMS).

**Suplementação vitalícia:**

Após a cirurgia bariátrica, a absorção de nutrientes é reduzida. A suplementação é obrigatória e deve ser mantida por toda a vida:

• **Polivitamínico completo:** 1 comprimido ao dia, de preferência mastigável ou líquido nos primeiros meses.
• **Vitamina B12:** 1000 µg/dia via oral ou injeção intramuscular mensal, conforme níveis séricos.
• **Ferro elementar:** 45–60 mg/dia, preferencialmente com vitamina C para melhor absorção.
• **Cálcio (citrato):** 1200–1500 mg/dia, dividido em 2–3 doses (o citrato é melhor absorvido que o carbonato).
• **Vitamina D3:** 3000–5000 UI/dia, ajustada conforme dosagem sérica.
• **Ácido fólico:** 400 µg/dia (especialmente importante para mulheres em idade fértil).
• **Zinco:** 15–22 mg/dia, incluso no polivitamínico ou suplementado separadamente.

**Acompanhamento multidisciplinar:**

O seguimento pós-operatório deve ser mantido por toda a vida:

• **Cirurgião:** Retornos no 1°, 3°, 6° e 12° mês; depois anualmente.
• **Nutrologia/Endocrinologia:** A cada 3–6 meses no primeiro ano; depois a cada 6–12 meses.
• **Nutricionista:** Mensal nos primeiros 6 meses; depois a cada 2–3 meses.
• **Psicologia:** Mensal no primeiro ano. Fundamental para adaptação emocional e prevenção de transtornos alimentares.
• **Exames laboratoriais:** A cada 3 meses no primeiro ano; depois a cada 6 meses.

**Sinais de alerta – procure atendimento imediato:**

• Febre acima de 38°C persistente.
• Dor abdominal intensa que não melhora com analgésicos.
• Vômitos incoercíveis (mais de 24 horas sem conseguir ingerir líquidos).
• Sangramento nas fezes ou vômitos com sangue.
• Falta de ar súbita ou dor torácica.
• Inchaço ou vermelhidão em membros inferiores (suspeita de trombose).

**Gravidez:** Evitar gestação nos primeiros 18 meses após a cirurgia. Utilizar método contraceptivo seguro e comunicar o desejo de gestação à equipe para ajuste da suplementação.`,
  },
]

/* ------------------------------------------------------------------ */
/*  Surgery Record                                                     */
/* ------------------------------------------------------------------ */
const MOCK_SURGERY_RECORD: SurgeryRecord = {
  surgery_id: 1,
  patient_id: 1,
  technique: 'sleeve',
  duration_minutes: 95,
  complications: [],
  notes:
    'Gastrectomia vertical laparoscópica sem intercorrências. Teste de azul de metileno negativo para fístula. Dreno sentinela posicionado. Paciente encaminhado à recuperação em bom estado.',
  surgeon: 'Dr. Marcos Almeida',
  date: '2025-12-01',
}

/* ------------------------------------------------------------------ */
/*  Service                                                            */
/* ------------------------------------------------------------------ */
export const bariatricService = {
  async weightHistory(_patientId: number): Promise<WeightEntry[]> {
    return MOCK_WEIGHT_HISTORY
  },

  async labHistory(_patientId: number): Promise<LabEntry[]> {
    return MOCK_LAB_HISTORY
  },

  async examTimeline(_patientId: number): Promise<ExamTimelineEntry[]> {
    return MOCK_EXAM_TIMELINE
  },

  async dietLog(_patientId: number): Promise<DietEntry[]> {
    return MOCK_DIET_LOG
  },

  async sleepLog(_patientId: number): Promise<SleepEntry[]> {
    return MOCK_SLEEP_LOG
  },

  async activityLog(_patientId: number): Promise<ActivityEntry[]> {
    return MOCK_ACTIVITY_LOG
  },

  async orientations(): Promise<OrientationDocument[]> {
    return MOCK_ORIENTATIONS
  },

  async surgeryRecord(_patientId: number): Promise<SurgeryRecord | null> {
    return MOCK_SURGERY_RECORD
  },
}

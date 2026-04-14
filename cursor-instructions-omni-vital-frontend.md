# 📋 Cursor Instructions — Omni Vital Frontend
### Vue 3 + TailAdmin Vue Pro 2.x + VueUse + Mockoon

> Instruções **exclusivas do frontend** do projeto **Omni Vital**.
> Backend é responsabilidade de outro membro da equipe.
> Durante o desenvolvimento inicial, todos os contratos são simulados via **Mockoon** (Docker).
> Projeto raiz de referência de UI/stack: `/Users/hugol/dev/Omni-Vital/tailadmin-vue-pro-2.0-main`
> Projeto raiz de referência de arquitetura: `/Users/hugol/dev/Duilio/Octa-Water/`

---

## 🏥 Contexto Clínico — Por que o Omni Vital existe

### 📊 Dados reais que justificam o sistema

#### Cirurgia Bariátrica no Brasil
- Em 2023 foram realizadas **80.441 cirurgias bariátricas** no Brasil (SBCBM/ANS/DATASUS): 7.570 pelo SUS, 69.041 por planos de saúde e 3.830 particulares.
- Apenas **0,097%** da população elegível (estimada em 8,2 milhões de pessoas) teve acesso ao procedimento em 2023.
- A taxa geral de **complicações pós-operatórias é de 16,2%**, sendo a colelitíase sintomática a mais frequente. Intolerância alimentar afeta **56,8%** dos pacientes.
- Mortalidade intra-hospitalar no SUS: **0,55%** (região sudeste: 0,44%). Na saúde suplementar: **0,30%**.
- De 2019 a 2023 foram registradas **363 complicações graves** em 25.845 cirurgias (1,4%) — mas a subnotificação é conhecida, especialmente nas regiões Norte e Nordeste.
- A **Região Nordeste** registrou crescimento progressivo de óbitos de 2017 a 2024, com pico em 2024, concentrado em PB, PE, RN e CE.
- Projeção alarmante: **48% dos adultos brasileiros terão obesidade** e outros 27% terão sobrepeso até 2044 (ICO 2024).
- Pacientes que realizam a cirurgia têm **16% menos mortalidade geral**, além de redução de 29% em doenças cardiovasculares, 43% em câncer e 72% em diabetes (estudo de 40 anos, periódico *Obesity*, 2023).

**Por que o Omni Vital é necessário para bariátrica:**
> Com volumes crescendo acima de 80 mil cirurgias/ano, complicações chegando a 16%, e mortalidade concentrada em regiões com menor suporte assistencial, um sistema de monitoramento em tempo real que detecta pressão baixa, sangramento elevado, febre pós-op e tempo cirúrgico excedido pode literalmente salvar vidas. A janela de intervenção em complicações bariátricas é estreita — minutos importam.

---

#### Cesariana no Brasil
- O Brasil tem a **segunda maior taxa de cesarianas do mundo**: **59,6% de todos os partos em 2023** (SINASC/MS). A OMS recomenda no máximo 15%.
- Em números absolutos: de **2,57 milhões de partos** realizados no Brasil em 2022, **58,1% foram cesarianas** — mais de 1,49 milhão de cirurgias obstétricas por ano.
- A Razão de Mortalidade Materna (RMM) nacional em 2023 foi de **55,3 mortes por 100 mil nascidos vivos** — muito acima da meta da OPAS de 30/100 mil NV.
- **73,2% dos óbitos maternos** no RS em 2023 ocorreram em partos via cesariana.
- Complicações da cesariana incluem hemorragia grave, infecção puerperal, rotura uterina em gestações futuras e complicações anestésicas. A taxa de morte por anestesia em cesarianas em países de média renda é de **1,2 por 1.000 mulheres**.
- Nordeste e Sudeste apresentam taxas de mortalidade materna **3x maiores** que o Centro-Oeste (regressão de Poisson, 2020-2024).

**Por que o Omni Vital é necessário para cesariana:**
> Com 1,5 milhão de cesarianas/ano, uma taxa de mortalidade materna ainda muito alta e complicações como hemorragia e infecção sendo causas evitáveis de morte, o monitoramento intraoperatório em tempo real (saturação, pressão, sangramento) e pós-operatório imediato (febre, dor, saturação) é uma ferramenta essencial de segurança assistencial.

---

## 🧠 Visão Geral do Sistema

**Omni Vital** é um sistema SaaS de monitoramento cirúrgico voltado a hospitais e clínicas, com foco inicial em **cirurgias bariátricas e cesarianas**. O sistema acompanha o paciente desde o pré-operatório até a alta, monitorando dados clínicos e operacionais e disparando alertas automáticos quando condições críticas são detectadas.

**Não há hardware próprio.** O sistema recebe dados de equipamentos hospitalares existentes via integração de API/gateway e os processa em tempo real.

### Papéis de usuário

| Role | Exibição na UI | Capacidades |
|------|---------------|-------------|
| `super_admin` | Super Admin | Gerencia hospitais/clínicas, configura usuários e parâmetros clínicos globais. |
| `hospital_admin` | Administrador | Gerencia equipes médicas, salas e configurações do hospital. |
| `medico` | Médico | Monitora seus pacientes, visualiza alertas e registra evoluções. |
| `enfermeiro` | Enfermeiro | Visualiza monitor em tempo real e confirma/resolve alertas. |

### Premissas de UI

- Tela de login **sem link** "Esqueci minha senha" — acesso fechado, gerenciado pelo hospital_admin.
- Não existe rota `/cadastro`, `/register` nem `/recuperar-senha`.
- Menus, rotas e botões filtrados dinamicamente pela role.
- Identidade visual: profissional, limpa, tons de azul e branco. Dados críticos em vermelho com destaque visual.

---

## 🏗️ Stack

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Framework | Vue 3 — `<script setup>` + Composition API | ^3.5 |
| Build | Vite | ^6.0 |
| Linguagem | TypeScript (strict) | ~5.7 |
| UI Base | TailAdmin Vue Pro 2.x (do projeto raiz) | 2.0 |
| CSS | Tailwind CSS | v4 |
| Roteamento | Vue Router | ^4.5 |
| Estado global | Pinia | ^2.2 |
| **HTTP Client** | **`@vueuse/core` — `useFetch` / `createFetch`** | ^11.0 |
| Formulários | VeeValidate + `@vee-validate/zod` | ^4.14 |
| Validação | Zod | ^3.23 |
| Ícones | lucide-vue-next | ^0.474 |
| Gráficos | vue3-apexcharts | ^1.8 |
| Notificações | vue-toastification | ^2.0 |
| Mock de API | Mockoon CLI (Docker) | latest |

> ⚠️ **Não usar Axios.** O cliente HTTP é exclusivamente `useFetch`/`createFetch` do VueUse.
> ⚠️ **Reutilizar os componentes base do TailAdmin** do projeto raiz `/Users/hugol/dev/Omni-Vital/tailadmin-vue-pro-2.0-main` antes de criar novos.

---

## 📁 Estrutura do Projeto

O projeto raiz de frontend está em:
```
/Users/hugol/dev/Omni-Vital/tailadmin-vue-pro-2.0-main
```

Referência de arquitetura:
```
/Users/hugol/dev/Duilio/Octa-Water/
```

### Estrutura de pastas do Omni Vital

```
omni-vital-frontend/
│
├── public/
│   └── images/logo/
│       ├── logo.svg
│       ├── logo-dark.svg
│       └── logo-icon.svg
│
├── src/
│   ├── main.ts
│   ├── App.vue
│   │
│   ├── router/
│   │   └── index.ts
│   │
│   ├── stores/
│   │   ├── auth.store.ts
│   │   └── alerts.store.ts
│   │
│   ├── composables/
│   │   ├── useAuth.ts
│   │   ├── usePermission.ts
│   │   ├── useSidebar.ts
│   │   └── useAlerts.ts
│   │
│   ├── lib/
│   │   ├── useApiFetch.ts         # createFetch configurado
│   │   ├── utils.ts
│   │   └── validations/
│   │       ├── auth.schema.ts
│   │       └── patient.schema.ts
│   │
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── patients.service.ts
│   │   ├── surgeries.service.ts
│   │   ├── vitals.service.ts
│   │   └── alerts.service.ts
│   │
│   ├── constants/
│   │   └── api-routes.ts
│   │
│   ├── types/
│   │   ├── auth.ts
│   │   ├── api.ts
│   │   ├── patient.ts
│   │   ├── surgery.ts
│   │   ├── vital-sign.ts
│   │   └── alert.ts
│   │
│   ├── layouts/
│   │   ├── AuthLayout.vue
│   │   └── AppLayout.vue
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── AppButton.vue
│   │   │   ├── AppInput.vue
│   │   │   ├── AppSelect.vue
│   │   │   ├── AppAlert.vue
│   │   │   ├── AppBadge.vue
│   │   │   ├── AppModal.vue
│   │   │   ├── AppConfirmDialog.vue
│   │   │   └── AppEmptyState.vue
│   │   ├── layout/
│   │   │   ├── AppSidebar.vue
│   │   │   ├── AppHeader.vue
│   │   │   └── UserDropdown.vue
│   │   ├── auth/
│   │   │   └── LoginForm.vue
│   │   ├── dashboard/
│   │   │   ├── SurgeryStatsCard.vue
│   │   │   └── AlertSummaryCard.vue
│   │   ├── monitor/
│   │   │   ├── VitalSignCard.vue
│   │   │   ├── SurgeryTimer.vue
│   │   │   ├── PatientStatusBadge.vue
│   │   │   └── VitalSignChart.vue
│   │   └── alerts/
│   │       ├── AlertCard.vue
│   │       └── AlertBadge.vue
│   │
│   └── views/
│       ├── Auth/
│       │   └── LoginView.vue
│       ├── Dashboard/
│       │   └── DashboardView.vue
│       ├── Patients/
│       │   ├── PatientsView.vue
│       │   └── PatientDetailView.vue
│       ├── Surgeries/
│       │   ├── SurgeriesView.vue
│       │   └── SurgeryMonitorView.vue    # Tela principal de monitoramento
│       └── Alerts/
│           └── AlertsView.vue
│
├── infra/
│   ├── dev/
│   │   ├── docker-compose.yml
│   │   └── mockoon/
│   │       └── omni-vital-api.json
│   └── prod/
│       └── docker-compose.yml
│
├── .env.development
├── .env.production
├── .env.example
├── Makefile
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 🐳 Infra — Dev e Prod

### `infra/dev/docker-compose.yml`
```yaml
services:
  mockoon:
    image: mockoon/cli:latest
    command: --data /data/omni-vital-api.json --port 3000
    volumes:
      - ./mockoon:/data
    ports:
      - "3001:3000"
    restart: unless-stopped
```

### `infra/prod/docker-compose.yml`
```yaml
services:
  omni-vital-frontend:
    image: omni-vital/frontend:latest
    ports:
      - "80:80"
    environment:
      - VITE_API_URL=${VITE_API_URL}
      - VITE_APP_ENV=production
    restart: always
```

### `.env.development`
```env
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=Omni Vital
VITE_APP_ENV=development
```

### `.env.production`
```env
VITE_API_URL=https://api.omnivital.com.br
VITE_APP_NAME=Omni Vital
VITE_APP_ENV=production
```

### `Makefile` — Comandos de desenvolvimento
```makefile
# Sobe o mock (Mockoon via Docker)
start-mock:
	docker compose -f infra/dev/docker-compose.yml up -d

# Para o mock
stop-mock:
	docker compose -f infra/dev/docker-compose.yml down

# Sobe o frontend em modo dev (com mock rodando)
dev:
	npm run dev

# Build para produção
build:
	npm run build

# Preview do build de produção localmente
preview:
	npm run preview

# Tudo junto: mock + frontend dev
start-dev: start-mock dev

# Para tudo
stop-dev: stop-mock
```

---

## 🔌 Contratos Mock — `infra/dev/mockoon/omni-vital-api.json`

```json
{
  "uuid": "omni-vital-mock-env",
  "lastMigration": 32,
  "name": "Omni Vital API",
  "latency": 200,
  "port": 3000,
  "routes": [
    {
      "uuid": "auth-login",
      "method": "post",
      "endpoint": "auth/login",
      "responses": [
        {
          "uuid": "login-200",
          "label": "Sucesso",
          "statusCode": 200,
          "default": true,
          "headers": [{ "key": "Content-Type", "value": "application/json" }],
          "body": "{ \"access_token\": \"mock.jwt.token\", \"token_type\": \"bearer\" }"
        },
        {
          "uuid": "login-401",
          "label": "Credenciais inválidas",
          "statusCode": 401,
          "default": false,
          "body": "{ \"detail\": \"Credenciais inválidas\" }"
        }
      ]
    },
    {
      "uuid": "auth-me",
      "method": "get",
      "endpoint": "auth/me",
      "responses": [
        {
          "uuid": "me-200",
          "statusCode": 200,
          "default": true,
          "body": "{ \"id\": 1, \"name\": \"Dr. Hugo Lima\", \"email\": \"hugo@hospital.com\", \"role\": \"medico\", \"hospital_id\": 1, \"is_active\": true }"
        }
      ]
    },
    {
      "uuid": "dashboard-summary",
      "method": "get",
      "endpoint": "dashboard/summary",
      "responses": [
        {
          "uuid": "summary-200",
          "statusCode": 200,
          "default": true,
          "body": "{ \"surgeries_today\": 12, \"in_surgery\": 3, \"in_recovery\": 4, \"with_alert\": 1, \"scheduled\": 5 }"
        }
      ]
    },
    {
      "uuid": "surgeries-list",
      "method": "get",
      "endpoint": "surgeries",
      "responses": [
        {
          "uuid": "surgeries-200",
          "statusCode": 200,
          "default": true,
          "body": "[ { \"id\": 1, \"patient_name\": \"João Silva\", \"type\": \"bariatrica\", \"status\": \"IN_SURGERY\", \"scheduled_at\": \"2026-04-14T08:00:00Z\", \"started_at\": \"2026-04-14T08:15:00Z\", \"risk_level\": \"alto\" }, { \"id\": 2, \"patient_name\": \"Maria Santos\", \"type\": \"cesariana\", \"status\": \"IN_RECOVERY\", \"scheduled_at\": \"2026-04-14T06:00:00Z\", \"started_at\": \"2026-04-14T06:10:00Z\", \"finished_at\": \"2026-04-14T07:05:00Z\", \"risk_level\": \"medio\" }, { \"id\": 3, \"patient_name\": \"Ana Oliveira\", \"type\": \"bariatrica\", \"status\": \"SCHEDULED\", \"scheduled_at\": \"2026-04-14T14:00:00Z\", \"risk_level\": \"baixo\" } ]"
        }
      ]
    },
    {
      "uuid": "surgery-monitor",
      "method": "get",
      "endpoint": "surgeries/:id/monitor",
      "responses": [
        {
          "uuid": "monitor-200",
          "statusCode": 200,
          "default": true,
          "body": "{ \"surgery_id\": 1, \"patient\": { \"id\": 1, \"name\": \"João Silva\", \"age\": 42, \"bmi\": 48.2, \"risk_level\": \"alto\" }, \"status\": \"IN_SURGERY\", \"started_at\": \"2026-04-14T08:15:00Z\", \"expected_duration_minutes\": 120, \"vitals\": { \"heart_rate\": 85, \"blood_pressure_systolic\": 120, \"blood_pressure_diastolic\": 80, \"oxygen_level\": 98, \"temperature\": 36.5, \"bleeding_ml\": 150, \"updated_at\": \"2026-04-14T09:58:00Z\" }, \"active_alerts\": [] }"
        }
      ]
    },
    {
      "uuid": "alerts-list",
      "method": "get",
      "endpoint": "alerts",
      "responses": [
        {
          "uuid": "alerts-200",
          "statusCode": 200,
          "default": true,
          "body": "[ { \"id\": 1, \"patient_name\": \"João Silva\", \"surgery_id\": 1, \"type\": \"LOW_BLOOD_PRESSURE\", \"severity\": \"CRITICAL\", \"message\": \"Pressão arterial baixa detectada: 85/55 mmHg\", \"created_at\": \"2026-04-14T09:30:00Z\", \"resolved_at\": null } ]"
        }
      ]
    },
    {
      "uuid": "patients-list",
      "method": "get",
      "endpoint": "patients",
      "responses": [
        {
          "uuid": "patients-200",
          "statusCode": 200,
          "default": true,
          "body": "[ { \"id\": 1, \"name\": \"João Silva\", \"birth_date\": \"1984-03-20\", \"weight\": 135, \"height\": 1.67, \"bmi\": 48.2, \"risk_level\": \"alto\", \"surgery_type\": \"bariatrica\", \"status\": \"IN_SURGERY\" }, { \"id\": 2, \"name\": \"Maria Santos\", \"birth_date\": \"1992-07-15\", \"weight\": 78, \"height\": 1.62, \"bmi\": 29.7, \"risk_level\": \"medio\", \"surgery_type\": \"cesariana\", \"status\": \"IN_RECOVERY\" } ]"
        }
      ]
    }
  ]
}
```

---

## 🗂️ Tipos TypeScript — `src/types/`

### `surgery.ts`
```typescript
export type SurgeryType = 'bariatrica' | 'cesariana'

export type SurgeryStatus =
  | 'REQUESTED'
  | 'APPROVED'
  | 'SCHEDULED'
  | 'ADMITTED'
  | 'IN_SURGERY'
  | 'IN_RECOVERY'
  | 'DISCHARGED'
  | 'COMPLICATION'
  | 'CANCELLED'

export type RiskLevel = 'baixo' | 'medio' | 'alto' | 'critico'

export interface Surgery {
  id: number
  patient_name: string
  type: SurgeryType
  status: SurgeryStatus
  scheduled_at: string
  started_at?: string
  finished_at?: string
  risk_level: RiskLevel
}

export interface VitalSigns {
  heart_rate: number
  blood_pressure_systolic: number
  blood_pressure_diastolic: number
  oxygen_level: number
  temperature: number
  bleeding_ml: number
  updated_at: string
}

export interface SurgeryMonitor {
  surgery_id: number
  patient: {
    id: number
    name: string
    age: number
    bmi: number
    risk_level: RiskLevel
  }
  status: SurgeryStatus
  started_at: string
  expected_duration_minutes: number
  vitals: VitalSigns
  active_alerts: Alert[]
}
```

### `alert.ts`
```typescript
export type AlertType =
  | 'LOW_BLOOD_PRESSURE'
  | 'HIGH_HEART_RATE'
  | 'LOW_OXYGEN'
  | 'HIGH_BLEEDING'
  | 'SURGERY_DURATION_EXCEEDED'
  | 'FEVER_DETECTED'
  | 'PATIENT_NO_SHOW'

export type AlertSeverity = 'WARNING' | 'CRITICAL'

export interface Alert {
  id: number
  patient_name: string
  surgery_id: number
  type: AlertType
  severity: AlertSeverity
  message: string
  created_at: string
  resolved_at: string | null
}
```

---

## 📄 Telas do Sistema (Mockadas)

### 1. Dashboard (`/dashboard`)
**Propósito:** Visão geral de todas as cirurgias do dia.

Componentes:
- Cards de resumo: "Cirurgias hoje", "Em andamento", "Em recuperação", "Com alerta"
- Lista de cirurgias ativas com status colorido
- Painel de alertas ativos (badge vermelho se houver CRITICAL)

**Dados mock:** `GET /dashboard/summary` + `GET /surgeries`

---

### 2. Monitor de Cirurgia (`/surgeries/:id/monitor`)
**Propósito:** Tela principal — monitoramento em tempo real de uma cirurgia.

Componentes:
- Header com nome do paciente, tipo de cirurgia e status
- **Cronômetro de cirurgia** (tempo decorrido vs. tempo esperado)
- Cards de sinais vitais:
  - ❤️ Frequência Cardíaca (bpm) — vermelho se < 50 ou > 120
  - 🩺 Pressão Arterial (mmHg) — vermelho se sistólica < 90
  - 🫁 Saturação O₂ (%) — vermelho se < 94%
  - 🌡️ Temperatura (°C) — vermelho se > 38°C (pós-op)
  - 🩸 Sangramento (ml) — vermelho se > 500ml (bariátrica) / > 1000ml (cesariana)
- Gráfico de linha com histórico de sinais vitais (últimos 30 min)
- Painel de alertas ativos da cirurgia

**Dados mock:** `GET /surgeries/:id/monitor`

> ⚠️ Esta tela é o **coração do produto**. Deve ter design de alta densidade de informação, similar a monitores de UTI, mas com UX moderna.

---

### 3. Lista de Cirurgias (`/surgeries`)
**Propósito:** Tabela com todas as cirurgias agendadas e em andamento.

Colunas: Paciente | Tipo | Status | Agendada para | Nível de risco | Ações

**Dados mock:** `GET /surgeries`

---

### 4. Painel de Alertas (`/alerts`)
**Propósito:** Todos os alertas ativos e histórico.

Filtros: Severidade (CRITICAL / WARNING) | Status (Ativo / Resolvido) | Tipo de cirurgia

**Dados mock:** `GET /alerts`

---

### 5. Pacientes (`/patients`)
**Propósito:** Cadastro e listagem de pacientes.

**Dados mock:** `GET /patients`

---

## 🔴 Regras de Negócio Visuais (UI)

| Condição | Limite Bariátrica | Limite Cesariana | Ação na UI |
|----------|-------------------|-----------------|------------|
| Pressão sistólica baixa | < 90 mmHg | < 90 mmHg | Badge CRÍTICO vermelho piscando |
| Frequência cardíaca alta | > 120 bpm | > 130 bpm | Badge ALERTA amarelo |
| Saturação O₂ baixa | < 94% | < 95% | Badge CRÍTICO vermelho |
| Temperatura alta | > 38°C | > 38°C | Badge ALERTA (pós-op) |
| Sangramento elevado | > 500 ml | > 1000 ml | Badge CRÍTICO vermelho |
| Tempo excedido | > 120 min | > 60 min | Cronômetro muda para vermelho |

---

## 🗂️ Rotas (`src/constants/api-routes.ts`)

```typescript
export const API = {
  auth: {
    login: '/auth/login',
    me: '/auth/me',
    logout: '/auth/logout',
  },
  dashboard: {
    summary: '/dashboard/summary',
  },
  surgeries: {
    list: '/surgeries',
    monitor: (id: number) => `/surgeries/${id}/monitor`,
    detail: (id: number) => `/surgeries/${id}`,
  },
  patients: {
    list: '/patients',
    detail: (id: number) => `/patients/${id}`,
  },
  alerts: {
    list: '/alerts',
    resolve: (id: number) => `/alerts/${id}/resolve`,
  },
  vitals: {
    history: (patientId: number) => `/patients/${patientId}/vitals`,
  },
} as const
```

---

## 🔧 `src/lib/useApiFetch.ts`

```typescript
import { createFetch } from '@vueuse/core'
import { useAuthStore } from '@/stores/auth.store'
import router from '@/router'

export const useApiFetch = createFetch({
  baseUrl: import.meta.env.VITE_API_URL,
  options: {
    async beforeFetch({ options }) {
      const auth = useAuthStore()
      if (auth.token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${auth.token}`,
        }
      }
      return { options }
    },
    async onFetchError(ctx) {
      if (ctx.response?.status === 401) {
        const auth = useAuthStore()
        auth.logout()
        router.push('/login')
      }
      return ctx
    },
  },
  fetchOptions: {
    mode: 'cors',
  },
})
```

---

## 📏 Convenções Obrigatórias

### Regras de ouro do `useFetch`

| ❌ Proibido | ✅ Correto |
|-----------|-----------|
| `axios.get(...)` em qualquer lugar | `useApiFetch(...).json()` |
| `fetch(...)` nativo direto | `useApiFetch(...)` |
| URL literal no service | `API.modulo.endpoint` |
| `localStorage` em componentes | Store Pinia |
| `user.role === 'x'` no template | `can('acao')` via `usePermission` |
| `v-if` + `v-for` no mesmo elemento | `<template v-for>` externo |

### Padrão de listagem com atualização

```typescript
const { data: surgeries, execute: refreshSurgeries, isFetching } = useApiFetch(API.surgeries.list).json()

// No afterFetch de uma operação:
afterFetch(ctx) {
  toast.success('Operação realizada!')
  refreshSurgeries()
  emit('close')
  return ctx
}
```

### Nomenclatura de arquivos

- Views: `PascalCase` + sufixo `View` → `SurgeryMonitorView.vue`
- Componentes: `PascalCase` → `VitalSignCard.vue`
- Composables: `camelCase` + prefixo `use` → `useAlerts.ts`
- Services: `camelCase` + sufixo `.service` → `surgeries.service.ts`
- Types: `camelCase` + sufixo `.ts` → `surgery.ts`

---

## ✅ Checklist — Novo Módulo

**Antes de codar:**
- [ ] Definir contrato com backend (método, path, request, response, erros)
- [ ] Adicionar rota mock em `infra/dev/mockoon/omni-vital-api.json`
- [ ] Testar mock com `make start-dev`

**Código frontend:**
- [ ] Types em `src/types/{modulo}.ts`
- [ ] Zod schema em `src/lib/validations/{modulo}.schema.ts`
- [ ] Rotas em `src/constants/api-routes.ts`
- [ ] Permissões em `src/composables/usePermission.ts`
- [ ] Composables de fetch em `src/services/{modulo}.service.ts`
- [ ] Componentes em `src/components/{modulo}/`
- [ ] View em `src/views/{Modulo}/{Modulo}View.vue`
- [ ] Rota em `src/router/index.ts` com `meta.roles`
- [ ] Item de nav em `AppSidebar.vue` com `requiredPermission`
- [ ] `isFetching` → skeleton/loading em toda operação
- [ ] `onFetchError` → toast ou AppAlert com `getFetchErrorMessage(ctx.data)`
- [ ] `AppEmptyState` quando lista vazia
- [ ] `AppConfirmDialog` em ações destrutivas

---

## 🗓️ Roadmap de Desenvolvimento

```
Sprint 1 — Base e Login
  Dia 1 → Setup: copiar TailAdmin do projeto raiz + Pinia + VueUse + VeeValidate + Zod
          Mockoon no docker-compose + omni-vital-api.json com contratos de auth
  Dia 2 → src/types/ (surgery, patient, alert, vital-sign) + src/constants/api-routes.ts
  Dia 3 → src/lib/useApiFetch.ts + src/services/auth.service.ts
  Dia 4 → auth.store.ts + router com guards por role
  Dia 5 → AuthLayout + LoginForm + LoginView (sem "esqueci senha")
  Dia 6 → AppLayout + AppSidebar (nav filtrada por role) + AppHeader

Sprint 2 — Dashboard e Monitor
  Dia 7  → Mock: contratos de dashboard e surgeries | DashboardView com stats cards
  Dia 8  → SurgeriesView: listagem com status badge e filtros
  Dia 9  → SurgeryMonitorView: layout base (grid de vitals cards + timer)
  Dia 10 → VitalSignCard com thresholds coloridos + SurgeryTimer
  Dia 11 → VitalSignChart (ApexCharts, histórico 30min)
  Dia 12 → AlertsView: painel de alertas com badge CRÍTICO
  Dia 13 → Integração dashboard ↔ monitor (clicar em cirurgia abre monitor)
  Dia 14 → Testes de fluxo, dark mode, responsividade

Sprint 3 — Pacientes e Refinamentos
  Dia 15 → PatientsView + PatientDetailView
  Dia 16 → Pré-operatório: checklist de exames e autorização (mockado)
  Dia 17 → Pós-operatório: ficha de recuperação
  Dia 18 → Refinamento UX, acessibilidade, testes manuais de role
```

---

## 🏥 Módulos Funcionais do Sistema

### Módulo 1: Dashboard Geral
Visão macro do dia hospitalar. Cirurgias por status, alertas ativos, distribuição por tipo (bariátrica vs. cesariana).

### Módulo 2: Monitor em Tempo Real (core do produto)
Tela de acompanhamento intraoperatório. Sinais vitais, cronômetro, alertas ativos. É o diferencial central do Omni Vital.

### Módulo 3: Gestão de Pacientes
Cadastro completo: dados pessoais, IMC, comorbidades, nível de risco, histórico de cirurgias.

### Módulo 4: Gestão de Cirurgias
Fluxo completo: agendamento → admissão → cirurgia → recuperação → alta. Máquina de estados visível na UI.

### Módulo 5: Painel de Alertas
Alertas em tempo real com severidade. Fluxo de reconhecimento e resolução por membro da equipe.

### Módulo 6: Pré-operatório
Checklist: IMC, exames laboratoriais, autorização do convênio, jejum, presença confirmada.

### Módulo 7: Pós-operatório
Monitoramento de recuperação: dor, temperatura, saturação, alimentação, mobilidade, complicações.

---

*Documento para uso com Cursor AI — `omni-vital/omni-vital-frontend`.
HTTP client: exclusivamente `useApiFetch` (VueUse `createFetch`). Sem Axios.
Mocks via Mockoon (Docker). Projeto raiz de UI: `/Users/hugol/dev/Omni-Vital/tailadmin-vue-pro-2.0-main`.*

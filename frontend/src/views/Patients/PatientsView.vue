<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useToast } from 'vue-toastification'
import { useViewAs } from '@/composables/useViewAs'
import { patientsService } from '@/services/patients.service'
import type { Patient } from '@/types/patient'

type Companion = {
  id: number
  patientId: number
  name: string
  email: string
}

const COMPANIONS_STORAGE_KEY = 'omni-vital-demo-companions'

function loadCompanionsFromStorage(): Companion[] {
  try {
    const raw = localStorage.getItem(COMPANIONS_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Companion[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function persistCompanions(list: Companion[]) {
  try {
    localStorage.setItem(COMPANIONS_STORAGE_KEY, JSON.stringify(list))
  } catch {
    /* ignore */
  }
}

const patients = ref<Patient[]>([])
const companions = ref<Companion[]>([])

const viewMode = ref<'grid' | 'list'>('grid')
const activeTab = ref<'list' | 'add' | 'edit' | 'companions'>('list')
const editingPatientId = ref<number | null>(null)
const companionsPatientId = ref<number | null>(null)
const searchQuery = ref('')
const surgeryTypeFilter = ref<'ALL' | Patient['surgery_type']>('ALL')
const perPage = ref(10)
const currentPage = ref(1)
const isFiltersOpen = ref(false)

const addForm = ref({
  profile: 'paciente' as 'paciente' | 'acompanhante',
  name: '',
  email: '',
  linkedPatientId: null as number | null,
})

const newCompanionForPatientForm = ref({
  name: '',
  email: '',
})

const editForm = ref({
  id: 0,
  name: '',
  surgery_type: 'bariatrica' as Patient['surgery_type'],
  risk_level: 'baixo' as Patient['risk_level'],
  bmi: 0,
})

const toast = useToast()
const viewAs = useViewAs()
const isMedicalTeam = computed(() => viewAs.currentContext.value === 'equipe_cirurgia')

onMounted(async () => {
  patients.value = await patientsService.list()
  const stored = loadCompanionsFromStorage()
  if (stored.length > 0) {
    companions.value = stored
  } else {
    const defaults: Companion[] = [
      { id: 1, patientId: 1, name: 'Ana Souza', email: 'ana@email.com' },
      { id: 2, patientId: 2, name: 'Carlos Oliveira', email: 'carlos@email.com' },
      { id: 3, patientId: 3, name: 'Roberta Lima', email: 'roberta@email.com' },
    ]
    companions.value = defaults
    persistCompanions(defaults)
  }
})

const inviteLink = (email: string) =>
  `${window.location.origin}/ativar-acesso?email=${encodeURIComponent(email)}`

function pushCompanion(patientId: number, name: string, email: string) {
  const row: Companion = { id: Date.now(), patientId, name, email }
  companions.value = [row, ...companions.value]
  persistCompanions(companions.value)
}

const submitAdd = () => {
  if (!addForm.value.name || !addForm.value.email) {
    toast.error('Preencha nome e e-mail para enviar o convite.')
    return
  }

  if (addForm.value.profile === 'paciente') {
    patients.value.unshift({
      id: Date.now(),
      name: addForm.value.name,
      birth_date: new Date().toISOString().slice(0, 10),
      weight: 0,
      height: 0,
      bmi: 0,
      risk_level: 'baixo',
      surgery_type: 'bariatrica',
      status: 'REQUESTED',
    })
  } else {
    if (addForm.value.linkedPatientId == null) {
      toast.error('Selecione o paciente ao qual este acompanhante será vinculado.')
      return
    }
    const patient = patients.value.find((p) => p.id === addForm.value.linkedPatientId)
    if (!patient) {
      toast.error('Paciente inválido.')
      return
    }
    pushCompanion(patient.id, addForm.value.name.trim(), addForm.value.email.trim())
  }

  toast.success(`Convite enviado para ${addForm.value.email}. Link: ${inviteLink(addForm.value.email)}`)
  addForm.value = { profile: 'paciente', name: '', email: '', linkedPatientId: null }
}

const submitNewCompanionForPatient = () => {
  if (!companionsPatient.value) return
  const name = newCompanionForPatientForm.value.name.trim()
  const email = newCompanionForPatientForm.value.email.trim()
  if (!name || !email) {
    toast.error('Preencha nome e e-mail do acompanhante.')
    return
  }
  pushCompanion(companionsPatient.value.id, name, email)
  toast.success(`Acompanhante vinculado a ${companionsPatient.value.name}. Convite: ${inviteLink(email)}`)
  newCompanionForPatientForm.value = { name: '', email: '' }
}

const sendPatientRegistrationEmail = () => {
  if (!addForm.value.email) {
    toast.error('Preencha o e-mail do paciente.')
    return
  }
  toast.success('E-mail enviado com sucesso')
}

const companionsByPatientId = computed(() => {
  const map: Record<number, Companion[]> = {}
  for (const c of companions.value) {
    if (!map[c.patientId]) map[c.patientId] = []
    map[c.patientId].push(c)
  }
  return map
})

function companionsForPatient(patientId: number): Companion[] {
  return companionsByPatientId.value[patientId] ?? []
}

const filteredPatients = computed(() => {
  const term = searchQuery.value.trim().toLowerCase()
  return patients.value.filter((patient) => {
    const matchesTerm = !term || `${patient.name} ${patient.surgery_type} ${patient.risk_level}`.toLowerCase().includes(term)
    const matchesType = surgeryTypeFilter.value === 'ALL' || patient.surgery_type === surgeryTypeFilter.value
    return matchesTerm && matchesType
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredPatients.value.length / perPage.value)))

const paginatedPatients = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  const end = start + perPage.value
  return filteredPatients.value.slice(start, end)
})

const pageLabel = computed(() => {
  if (filteredPatients.value.length === 0) return 'Mostrando 0-0 de 0'
  const start = (currentPage.value - 1) * perPage.value + 1
  const end = Math.min(filteredPatients.value.length, start + perPage.value - 1)
  return `Mostrando ${start}-${end} de ${filteredPatients.value.length}`
})

const openEditTab = (patient: Patient) => {
  editingPatientId.value = patient.id
  editForm.value = {
    id: patient.id,
    name: patient.name,
    surgery_type: patient.surgery_type,
    risk_level: patient.risk_level,
    bmi: patient.bmi,
  }
  activeTab.value = 'edit'
}

const openCompanionsTab = (patient: Patient) => {
  companionsPatientId.value = patient.id
  activeTab.value = 'companions'
}

const submitEdit = () => {
  const index = patients.value.findIndex((patient) => patient.id === editForm.value.id)
  if (index < 0) return
  patients.value[index] = {
    ...patients.value[index],
    name: editForm.value.name,
    surgery_type: editForm.value.surgery_type,
    risk_level: editForm.value.risk_level,
    bmi: editForm.value.bmi,
  }
  toast.success('Paciente atualizado com sucesso.')
}

const closeEditTab = () => {
  editingPatientId.value = null
  activeTab.value = 'list'
}

const closeCompanionsTab = () => {
  companionsPatientId.value = null
  activeTab.value = 'list'
}

const companionsPatient = computed(() => patients.value.find((patient) => patient.id === companionsPatientId.value) ?? null)

const runSearch = () => {
  currentPage.value = 1
}

const clearFilters = () => {
  searchQuery.value = ''
  surgeryTypeFilter.value = 'ALL'
  perPage.value = 10
  currentPage.value = 1
}

watch(
  () => addForm.value.profile,
  (p) => {
    if (p === 'paciente') {
      addForm.value.linkedPatientId = null
    } else if (patients.value.length > 0) {
      const cur = addForm.value.linkedPatientId
      const ok = patients.value.some((x) => x.id === cur)
      if (!ok) addForm.value.linkedPatientId = patients.value[0].id
    }
  },
)

watch(
  () => patients.value,
  (list) => {
    if (addForm.value.profile !== 'acompanhante' || list.length === 0) return
    const ok = list.some((x) => x.id === addForm.value.linkedPatientId)
    if (!ok) addForm.value.linkedPatientId = list[0].id
  },
  { deep: true },
)
</script>

<template>
  <section class="space-y-5">
    <div>
      <h2 class="text-2xl font-semibold text-slate-700 dark:text-slate-100">Pacientes e acompanhantes</h2>
      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Cadastro e acompanhamento com ficha integrada e vínculo de acompanhantes.</p>
    </div>

    <div class="border-b border-slate-200 dark:border-slate-700">
      <div class="flex flex-wrap items-center gap-5">
        <button class="border-b-2 px-1 pb-2 text-sm font-semibold transition" :class="activeTab === 'list' ? 'border-[#FFE14D] text-slate-700 dark:text-slate-100' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'" @click="activeTab = 'list'">
          Listagem
        </button>
        <button class="border-b-2 px-1 pb-2 text-sm font-semibold transition" :class="activeTab === 'add' ? 'border-[#FFE14D] text-slate-700 dark:text-slate-100' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'" @click="activeTab = 'add'">
          Adicionar
        </button>
        <button v-if="editingPatientId" class="border-b-2 px-1 pb-2 text-sm font-semibold transition" :class="activeTab === 'edit' ? 'border-[#FFE14D] text-slate-700 dark:text-slate-100' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'" @click="activeTab = 'edit'">
          Editar
        </button>
        <button v-if="companionsPatientId" class="border-b-2 px-1 pb-2 text-sm font-semibold transition" :class="activeTab === 'companions' ? 'border-[#FFE14D] text-slate-700 dark:text-slate-100' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'" @click="activeTab = 'companions'">
          Acompanhantes
        </button>
      </div>
    </div>

    <div class="flex flex-wrap items-center justify-between gap-2">
      <div class="flex flex-wrap items-center gap-2">
        <div class="inline-flex overflow-hidden rounded-lg border border-slate-300 dark:border-slate-600">
          <button
            class="px-4 py-2 text-sm font-semibold transition"
            :class="viewMode === 'grid' ? 'bg-[#FFE14D] text-slate-700' : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'"
            @click="viewMode = 'grid'"
          >
            Grid
          </button>
          <button
            class="px-4 py-2 text-sm font-semibold transition"
            :class="viewMode === 'list' ? 'bg-[#FFE14D] text-slate-700' : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'"
            @click="viewMode = 'list'"
          >
            Lista
          </button>
        </div>
      </div>
      <span v-if="!isMedicalTeam" class="rounded-full bg-slate-200 px-4 py-1.5 text-sm font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-200">
        Apenas equipe médica pode cadastrar
      </span>
    </div>

    <div v-if="activeTab === 'add' && isMedicalTeam" class="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
      <h3 class="mb-4 text-base font-semibold text-slate-700 dark:text-slate-100">Cadastrar e enviar link de acesso</h3>
      <p class="mb-4 text-sm text-slate-500 dark:text-slate-400">
        Para <strong class="font-medium text-slate-700 dark:text-slate-200">acompanhante</strong>, escolha o paciente cadastrado ao qual ele terá acesso à jornada (mesmo vínculo usado no app).
      </p>
      <div class="grid gap-3 md:grid-cols-2">
        <div>
          <label class="mb-1 block text-sm font-semibold text-slate-500 dark:text-slate-400">Perfil</label>
          <select v-model="addForm.profile" class="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-base dark:border-slate-600 dark:bg-slate-800">
            <option value="paciente">Paciente</option>
            <option value="acompanhante">Acompanhante</option>
          </select>
        </div>
        <div v-if="addForm.profile === 'acompanhante'">
          <label class="mb-1 block text-sm font-semibold text-slate-500 dark:text-slate-400">Paciente vinculado</label>
          <select
            v-if="patients.length > 0"
            v-model.number="addForm.linkedPatientId"
            class="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-base dark:border-slate-600 dark:bg-slate-800"
          >
            <option v-for="p in patients" :key="p.id" :value="p.id">{{ p.name }} · {{ p.surgery_type }}</option>
          </select>
          <p v-else class="rounded-lg border border-dashed border-slate-300 px-3 py-3 text-sm text-slate-500 dark:border-slate-600">
            Cadastre um paciente antes de vincular acompanhantes.
          </p>
        </div>
        <div>
          <label class="mb-1 block text-sm font-semibold text-slate-500 dark:text-slate-400">Nome completo</label>
          <input v-model="addForm.name" type="text" placeholder="Nome do convidado" class="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-base dark:border-slate-600 dark:bg-slate-800" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-semibold text-slate-500 dark:text-slate-400">E-mail</label>
          <input v-model="addForm.email" type="email" placeholder="E-mail para convite" class="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-base dark:border-slate-600 dark:bg-slate-800" />
        </div>
      </div>
      <button
        v-if="addForm.profile === 'paciente'"
        class="mt-4 rounded-lg border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
        @click="sendPatientRegistrationEmail"
      >
        Enviar e-mail para cadastro
      </button>
      <button class="mt-4 rounded-lg bg-[#FFE14D] px-5 py-3 text-base font-semibold text-slate-700 hover:brightness-95" @click="submitAdd">
        Enviar convite de senha
      </button>
    </div>

    <div v-if="activeTab === 'edit' && editingPatientId" class="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-base font-semibold text-slate-700 dark:text-slate-100">Editar paciente</h3>
        <button class="text-sm text-slate-500 hover:underline dark:text-slate-300" @click="closeEditTab">Fechar guia</button>
      </div>
      <div class="grid gap-3 md:grid-cols-2">
        <input v-model="editForm.name" type="text" placeholder="Nome" class="rounded-lg border border-slate-300 bg-white px-3 py-3 text-base dark:border-slate-600 dark:bg-slate-800" />
        <input v-model.number="editForm.bmi" type="number" step="0.1" placeholder="IMC" class="rounded-lg border border-slate-300 bg-white px-3 py-3 text-base dark:border-slate-600 dark:bg-slate-800" />
        <select v-model="editForm.surgery_type" class="rounded-lg border border-slate-300 bg-white px-3 py-3 text-base dark:border-slate-600 dark:bg-slate-800">
          <option value="bariatrica">Bariátrica</option>
          <option value="cesariana">Cesárea</option>
        </select>
        <select v-model="editForm.risk_level" class="rounded-lg border border-slate-300 bg-white px-3 py-3 text-base dark:border-slate-600 dark:bg-slate-800">
          <option value="baixo">Baixo</option>
          <option value="medio">Médio</option>
          <option value="alto">Alto</option>
          <option value="critico">Crítico</option>
        </select>
      </div>
      <button class="mt-4 rounded-lg bg-[#FFE14D] px-5 py-3 text-base font-semibold text-slate-700 hover:brightness-95" @click="submitEdit">
        Salvar edição
      </button>
    </div>

    <div v-if="activeTab === 'companions' && companionsPatient" class="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-base font-semibold text-slate-700 dark:text-slate-100">
          Acompanhantes de {{ companionsPatient.name }}
        </h3>
        <button class="text-sm text-slate-500 hover:underline dark:text-slate-300" @click="closeCompanionsTab">Fechar guia</button>
      </div>
      <p class="mb-4 text-sm text-slate-500 dark:text-slate-400">
        Quem você cadastra aqui enxerga a jornada deste paciente no app, no perfil de acompanhante (demo: vínculo salvo neste navegador).
      </p>

      <div v-if="isMedicalTeam" class="mb-6 rounded-lg border border-[#c8a800]/35 bg-[#fffdf5] p-4 dark:border-[#FFE14D]/25 dark:bg-[#152754]/60">
        <h4 class="text-sm font-semibold text-slate-800 dark:text-slate-100">Adicionar acompanhante a este paciente</h4>
        <div class="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <label class="mb-1 block text-xs font-semibold text-slate-500 dark:text-slate-400">Nome</label>
            <input
              v-model="newCompanionForPatientForm.name"
              type="text"
              placeholder="Nome completo"
              class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-800"
            />
          </div>
          <div>
            <label class="mb-1 block text-xs font-semibold text-slate-500 dark:text-slate-400">E-mail</label>
            <input
              v-model="newCompanionForPatientForm.email"
              type="email"
              placeholder="E-mail para convite"
              class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-800"
            />
          </div>
        </div>
        <button
          type="button"
          class="mt-3 rounded-lg bg-[#FFE14D] px-4 py-2.5 text-sm font-semibold text-slate-700 hover:brightness-95"
          @click="submitNewCompanionForPatient"
        >
          Vincular e enviar convite
        </button>
      </div>

      <div v-if="companionsForPatient(companionsPatient.id).length === 0" class="text-sm text-slate-500 dark:text-slate-400">
        Nenhum acompanhante vinculado a este paciente.
      </div>
      <div v-else class="space-y-2">
        <article
          v-for="companion in companionsForPatient(companionsPatient.id)"
          :key="companion.id"
          class="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-900/60"
        >
          <p class="font-semibold text-slate-700 dark:text-slate-100">{{ companion.name }}</p>
          <p class="text-sm text-slate-500 dark:text-slate-400">{{ companion.email }}</p>
        </article>
      </div>
    </div>

    <template v-if="activeTab === 'list'">
      <div v-if="patients.length === 0" class="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-base text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">Nenhum paciente encontrado</div>
      <div v-else-if="viewMode === 'grid'" class="grid gap-4 lg:grid-cols-2">
      <article
        v-for="patient in patients"
        :key="patient.id"
        class="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900"
      >
        <div class="flex items-start justify-between gap-3">
          <div>
            <h3 class="text-lg font-semibold text-slate-700 dark:text-slate-100">{{ patient.name }}</h3>
            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">IMC {{ patient.bmi }} · risco {{ patient.risk_level }} · {{ patient.surgery_type }}</p>
          </div>
          <button class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800" @click="openEditTab(patient)">
            Editar
          </button>
          <button class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800" @click="openCompanionsTab(patient)">
            Acompanhantes
          </button>
        </div>

        <div class="mt-3">
          <h4 class="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Acompanhantes</h4>
          <div v-if="companionsForPatient(patient.id).length === 0" class="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Nenhum acompanhante vinculado.
          </div>
          <div v-else class="mt-2 flex flex-wrap gap-2">
            <span
              v-for="companion in companionsForPatient(patient.id)"
              :key="companion.id"
              class="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              {{ companion.name }}
            </span>
          </div>
        </div>

        <div class="mt-4 grid gap-3 lg:grid-cols-2">
          <div class="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
            <h4 class="text-base font-semibold text-slate-700 dark:text-slate-100">Ficha pre-operatoria</h4>
            <ul class="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-300">
              <li>IMC e comorbidades avaliados</li>
              <li>Exames laboratoriais anexados</li>
              <li>Autorizacao do convenio validada</li>
              <li>Jejum confirmado</li>
            </ul>
          </div>
          <div class="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
            <h4 class="text-base font-semibold text-slate-700 dark:text-slate-100">Ficha pos-operatoria</h4>
            <ul class="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-300">
              <li>Dor referida: leve</li>
              <li>Temperatura: 36.8 C</li>
              <li>Saturacao: 97%</li>
              <li>Mobilidade assistida iniciada</li>
            </ul>
          </div>
        </div>
      </article>
      </div>
      <div v-else class="space-y-3">
        <div class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
          <p class="mb-3 text-sm text-slate-500 dark:text-slate-400">A pesquisa usa registros mockados armazenados no navegador.</p>
          <div class="max-w-xl">
            <label class="mb-1 block text-sm font-semibold text-slate-500 dark:text-slate-400">Pesquisar</label>
            <div class="grid gap-2 sm:grid-cols-[1fr_auto]">
              <input v-model="searchQuery" type="text" placeholder="Nome, tipo ou risco" class="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800" />
              <button class="rounded-lg bg-[#FFE14D] px-4 py-2 text-sm font-semibold text-slate-700" @click="runSearch">Pesquisar</button>
            </div>
          </div>
          <div class="mt-3 flex items-center justify-between border-t border-slate-200 pt-3 dark:border-slate-700">
            <button
              class="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
              @click="isFiltersOpen = !isFiltersOpen"
            >
              Filtros {{ isFiltersOpen ? '▴' : '▾' }}
            </button>
            <p class="text-sm text-slate-500 dark:text-slate-400">Refine a busca e controle a paginação com filtros compactos.</p>
          </div>
          <div v-if="isFiltersOpen" class="mt-3 grid gap-3 md:grid-cols-3">
            <div>
              <label class="mb-1 block text-sm font-semibold text-slate-500 dark:text-slate-400">Tipo de cirurgia</label>
              <select v-model="surgeryTypeFilter" class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800">
                <option value="ALL">Todos os tipos</option>
                <option value="bariatrica">Bariátrica</option>
                <option value="cesariana">Cesariana</option>
              </select>
            </div>
            <div>
              <label class="mb-1 block text-sm font-semibold text-slate-500 dark:text-slate-400">Itens por página</label>
              <select v-model.number="perPage" class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800">
                <option :value="10">10</option>
                <option :value="20">20</option>
                <option :value="50">50</option>
              </select>
            </div>
            <div class="flex items-end">
              <button class="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200" @click="clearFilters">
                Limpar filtros
              </button>
            </div>
          </div>
        </div>

        <div class="rounded-xl border border-slate-200 bg-white overflow-hidden dark:border-slate-700 dark:bg-slate-900">
          <div class="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700">
            <div>
              <p class="text-sm font-semibold text-slate-700 dark:text-slate-100">Resultados da pesquisa</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">{{ filteredPatients.length }} pacientes encontrados.</p>
            </div>
            <p class="text-sm text-slate-500 dark:text-slate-400">{{ pageLabel }}</p>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                <tr>
                  <th class="p-3 text-left">Paciente</th>
                  <th class="p-3 text-left">IMC</th>
                  <th class="p-3 text-left">Risco</th>
                  <th class="p-3 text-left">Acompanhantes</th>
                  <th class="p-3 text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="patient in paginatedPatients" :key="patient.id" class="border-t border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-100">
                  <td class="p-3">{{ patient.name }}</td>
                  <td class="p-3">{{ patient.bmi }}</td>
                  <td class="p-3">{{ patient.risk_level }}</td>
                  <td class="p-3">
                    {{ companionsForPatient(patient.id).length }} vinculado(s)
                  </td>
                  <td class="p-3">
                    <div class="flex items-center gap-3">
                      <button class="text-sm font-semibold text-[#FFE14D] hover:underline" @click="openEditTab(patient)">Editar</button>
                      <button class="text-sm font-semibold text-slate-500 hover:underline dark:text-slate-300" @click="openCompanionsTab(patient)">Acompanhantes</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex items-center justify-between px-4 py-3">
            <p class="text-sm text-slate-500 dark:text-slate-400">Página {{ currentPage }} de {{ totalPages }}</p>
            <div class="flex items-center gap-2">
              <button class="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-600 disabled:opacity-50 dark:border-slate-600 dark:text-slate-300" :disabled="currentPage <= 1" @click="currentPage--">Anterior</button>
              <button class="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-600 disabled:opacity-50 dark:border-slate-600 dark:text-slate-300" :disabled="currentPage >= totalPages" @click="currentPage++">Próxima</button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>

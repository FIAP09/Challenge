<script setup lang="ts">
import { computed, ref } from 'vue'
import { useToast } from 'vue-toastification'

type CollaboratorRole = 'medico' | 'enfermeiro' | 'coordenador'

type Collaborator = {
  id: number
  name: string
  email: string
  role: CollaboratorRole
  sector: string
}

const toast = useToast()
const activeTab = ref<'list' | 'add' | 'edit'>('list')
const editingId = ref<number | null>(null)
const searchQuery = ref('')
const sectorFilter = ref('ALL')
const perPage = ref(10)
const currentPage = ref(1)
const isFiltersOpen = ref(false)

const collaborators = ref<Collaborator[]>([
  { id: 1, name: 'Dr. Lucas Lima', email: 'lucas@hospital.com', role: 'medico', sector: 'Cirurgia bariátrica' },
  { id: 2, name: 'Enf. Paula Mendes', email: 'paula@hospital.com', role: 'enfermeiro', sector: 'Centro cirúrgico' },
  { id: 3, name: 'Dr. Vinicius Rocha', email: 'vinicius@hospital.com', role: 'coordenador', sector: 'Coordenação médica' },
])

const availableSectors = computed(() => [...new Set(collaborators.value.map((item) => item.sector))])

const filteredCollaborators = computed(() => {
  const term = searchQuery.value.trim().toLowerCase()
  return collaborators.value.filter((item) => {
    const matchesTerm =
      !term ||
      `${item.name} ${item.email} ${item.sector} ${item.role}`.toLowerCase().includes(term)
    const matchesSector = sectorFilter.value === 'ALL' || item.sector === sectorFilter.value
    return matchesTerm && matchesSector
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredCollaborators.value.length / perPage.value)))

const paginatedCollaborators = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  const end = start + perPage.value
  return filteredCollaborators.value.slice(start, end)
})

const pageLabel = computed(() => {
  if (filteredCollaborators.value.length === 0) return 'Mostrando 0-0 de 0'
  const start = (currentPage.value - 1) * perPage.value + 1
  const end = Math.min(filteredCollaborators.value.length, start + perPage.value - 1)
  return `Mostrando ${start}-${end} de ${filteredCollaborators.value.length}`
})

const addForm = ref({
  name: '',
  email: '',
  role: 'medico' as CollaboratorRole,
  sector: '',
})

const editForm = ref({
  id: 0,
  name: '',
  email: '',
  role: 'medico' as CollaboratorRole,
  sector: '',
})

const submitAdd = () => {
  if (!addForm.value.name || !addForm.value.email || !addForm.value.sector) {
    toast.error('Preencha todos os campos para adicionar colaborador.')
    return
  }

  collaborators.value.unshift({
    id: Date.now(),
    name: addForm.value.name,
    email: addForm.value.email,
    role: addForm.value.role,
    sector: addForm.value.sector,
  })

  toast.success(`Colaborador ${addForm.value.name} adicionado com sucesso.`)
  addForm.value = { name: '', email: '', role: 'medico', sector: '' }
}

const openEdit = (collaborator: Collaborator) => {
  editingId.value = collaborator.id
  editForm.value = { ...collaborator }
  activeTab.value = 'edit'
}

const submitEdit = () => {
  const index = collaborators.value.findIndex((item) => item.id === editForm.value.id)
  if (index < 0) return
  collaborators.value[index] = { ...editForm.value }
  toast.success('Colaborador atualizado com sucesso.')
}

const closeEditTab = () => {
  editingId.value = null
  activeTab.value = 'list'
}

const runSearch = () => {
  currentPage.value = 1
}

const clearFilters = () => {
  searchQuery.value = ''
  sectorFilter.value = 'ALL'
  perPage.value = 10
  currentPage.value = 1
}
</script>

<template>
  <section class="space-y-5">
    <div>
      <h2 class="text-2xl font-semibold text-slate-700 dark:text-slate-100">Equipe</h2>
      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Gerencie colaboradores e permissões da equipe assistencial.</p>
    </div>

    <div class="border-b border-slate-200 dark:border-slate-700">
      <div class="flex flex-wrap items-center gap-5">
        <button class="border-b-2 px-1 pb-2 text-sm font-semibold transition" :class="activeTab === 'list' ? 'border-[#FFE14D] text-slate-700 dark:text-slate-100' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'" @click="activeTab = 'list'">
          Listagem
        </button>
        <button class="border-b-2 px-1 pb-2 text-sm font-semibold transition" :class="activeTab === 'add' ? 'border-[#FFE14D] text-slate-700 dark:text-slate-100' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'" @click="activeTab = 'add'">
          Adicionar colaborador
        </button>
        <button v-if="editingId" class="border-b-2 px-1 pb-2 text-sm font-semibold transition" :class="activeTab === 'edit' ? 'border-[#FFE14D] text-slate-700 dark:text-slate-100' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'" @click="activeTab = 'edit'">
          Editar
        </button>
      </div>
    </div>

    <div v-if="activeTab === 'list'" class="space-y-3">
      <div class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <p class="mb-3 text-sm text-slate-500 dark:text-slate-400">A pesquisa usa registros mockados armazenados no navegador.</p>
        <div class="max-w-xl">
          <label class="mb-1 block text-sm font-semibold text-slate-500 dark:text-slate-400">Pesquisar</label>
          <div class="grid gap-2 sm:grid-cols-[1fr_auto]">
            <input v-model="searchQuery" type="text" placeholder="Nome, e-mail ou organização" class="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800" />
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
            <label class="mb-1 block text-sm font-semibold text-slate-500 dark:text-slate-400">Organização</label>
            <select v-model="sectorFilter" class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800">
              <option value="ALL">Todas as organizações</option>
              <option v-for="sector in availableSectors" :key="sector" :value="sector">{{ sector }}</option>
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

      <div class="rounded-xl border border-slate-200 bg-white p-0 dark:border-slate-700 dark:bg-slate-900">
        <div class="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700">
          <div>
            <p class="text-sm font-semibold text-slate-700 dark:text-slate-100">Resultados da pesquisa</p>
            <p class="text-xs text-slate-500 dark:text-slate-400">{{ filteredCollaborators.length }} usuários encontrados.</p>
          </div>
            <p class="text-sm text-slate-500 dark:text-slate-400">{{ pageLabel }}</p>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
              <tr>
                <th class="p-3 text-left">Usuário</th>
                <th class="p-3 text-left">E-mail</th>
                <th class="p-3 text-left">Organização</th>
                <th class="p-3 text-left">Nível</th>
                <th class="p-3 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="collaborator in paginatedCollaborators" :key="collaborator.id" class="border-t border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-100">
                <td class="p-3">{{ collaborator.name }}</td>
                <td class="p-3">{{ collaborator.email }}</td>
                <td class="p-3">{{ collaborator.sector }}</td>
                <td class="p-3">{{ collaborator.role }}</td>
                <td class="p-3">
                  <button class="text-sm font-semibold text-[#FFE14D] hover:underline" @click="openEdit(collaborator)">Editar</button>
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

    <div v-if="activeTab === 'add'" class="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
      <h3 class="mb-4 text-base font-semibold text-slate-700 dark:text-slate-100">Adicionar colaborador</h3>
      <div class="grid gap-3 md:grid-cols-2">
        <input v-model="addForm.name" type="text" placeholder="Nome completo" class="rounded-lg border border-slate-300 bg-white px-3 py-3 text-base dark:border-slate-600 dark:bg-slate-800" />
        <input v-model="addForm.email" type="email" placeholder="Email" class="rounded-lg border border-slate-300 bg-white px-3 py-3 text-base dark:border-slate-600 dark:bg-slate-800" />
        <select v-model="addForm.role" class="rounded-lg border border-slate-300 bg-white px-3 py-3 text-base dark:border-slate-600 dark:bg-slate-800">
          <option value="medico">Médico</option>
          <option value="enfermeiro">Enfermeiro</option>
          <option value="coordenador">Coordenador</option>
        </select>
        <input v-model="addForm.sector" type="text" placeholder="Setor" class="rounded-lg border border-slate-300 bg-white px-3 py-3 text-base dark:border-slate-600 dark:bg-slate-800" />
      </div>
      <button class="mt-4 rounded-lg bg-[#FFE14D] px-5 py-3 text-base font-semibold text-slate-700 hover:brightness-95" @click="submitAdd">
        Salvar colaborador
      </button>
    </div>

    <div v-if="activeTab === 'edit' && editingId" class="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-base font-semibold text-slate-700 dark:text-slate-100">Editar colaborador</h3>
        <button class="text-sm text-slate-500 hover:underline dark:text-slate-300" @click="closeEditTab">Fechar guia</button>
      </div>
      <div class="grid gap-3 md:grid-cols-2">
        <input v-model="editForm.name" type="text" placeholder="Nome completo" class="rounded-lg border border-slate-300 bg-white px-3 py-3 text-base dark:border-slate-600 dark:bg-slate-800" />
        <input v-model="editForm.email" type="email" placeholder="Email" class="rounded-lg border border-slate-300 bg-white px-3 py-3 text-base dark:border-slate-600 dark:bg-slate-800" />
        <select v-model="editForm.role" class="rounded-lg border border-slate-300 bg-white px-3 py-3 text-base dark:border-slate-600 dark:bg-slate-800">
          <option value="medico">Médico</option>
          <option value="enfermeiro">Enfermeiro</option>
          <option value="coordenador">Coordenador</option>
        </select>
        <input v-model="editForm.sector" type="text" placeholder="Setor" class="rounded-lg border border-slate-300 bg-white px-3 py-3 text-base dark:border-slate-600 dark:bg-slate-800" />
      </div>
      <button class="mt-4 rounded-lg bg-[#FFE14D] px-5 py-3 text-base font-semibold text-slate-700 hover:brightness-95" @click="submitEdit">
        Salvar edicao
      </button>
    </div>
  </section>
</template>

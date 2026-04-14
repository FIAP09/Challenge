<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const inviteCode = ref('')
const submitting = ref(false)

const submit = async () => {
  if (!email.value || !password.value || !confirmPassword.value || !inviteCode.value) {
    toast.error('Preencha todos os campos para ativar o acesso.')
    return
  }

  if (password.value !== confirmPassword.value) {
    toast.error('As senhas não conferem.')
    return
  }

  submitting.value = true
  await new Promise((resolve) => setTimeout(resolve, 700))
  submitting.value = false

  toast.success('Acesso criado com sucesso. Faça login para continuar.')
  router.push('/login')
}
</script>

<template>
  <div>
    <h1 class="mb-2 text-2xl font-semibold text-slate-700 dark:text-[#FFE14D]">Criar acesso</h1>
    <p class="mb-6 text-sm text-slate-600 dark:text-slate-200">
      Use o convite enviado por e-mail para definir sua senha de acesso.
    </p>

    <form class="space-y-4" @submit.prevent="submit">
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-200">E-mail</label>
        <input v-model="email" type="email" class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100" />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-200">Código do convite</label>
        <input v-model="inviteCode" type="text" class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100" />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-200">Nova senha</label>
        <input v-model="password" type="password" class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100" />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-200">Confirmar senha</label>
        <input v-model="confirmPassword" type="password" class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100" />
      </div>
      <button type="submit" class="w-full rounded-lg bg-[#FFE14D] px-4 py-2 font-medium text-[#27272B] hover:brightness-95 disabled:opacity-70" :disabled="submitting">
        {{ submitting ? 'Criando acesso...' : 'Criar acesso' }}
      </button>
    </form>

    <RouterLink to="/login" class="mt-4 inline-flex text-xs font-medium text-slate-600 hover:underline dark:text-slate-300">
      Voltar para login
    </RouterLink>
  </div>
</template>

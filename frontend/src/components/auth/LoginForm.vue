<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { loginSchema } from '@/lib/validations/auth.schema'
import { useAuthStore } from '@/stores/auth.store'
import { canUseViewAs, useViewAsStore } from '@/stores/view-as.store'

const router = useRouter()
const auth = useAuthStore()
const viewAs = useViewAsStore()
const toast = useToast()
const { handleSubmit, errors, defineField } = useForm({
  validationSchema: toTypedSchema(loginSchema),
  initialValues: { email: '', password: '' },
})
const [email] = defineField('email')
const [password] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  try {
    await auth.login(values)
    if (canUseViewAs(auth.user?.role)) {
      toast.info('Login realizado. Selecione o perfil para visualizar como administrador.')
      router.push('/seletor')
      return
    }

    if (viewAs.selectedContext) {
      toast.success(`Acesso liberado para: ${viewAs.selectedContext.roleLabel}`)
    }
    router.push('/app/dashboard')
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Falha ao autenticar.'
    toast.error(message)
  }
})
</script>

<template>
  <form class="space-y-4" @submit.prevent="onSubmit">
    <div>
      <label class="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-200">E-mail</label>
      <input v-model="email" type="email" class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100" />
      <p v-if="errors.email" class="mt-1 text-xs text-error-600">{{ errors.email }}</p>
    </div>
    <div>
      <label class="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-200">Senha</label>
      <input v-model="password" type="password" class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100" />
      <p v-if="errors.password" class="mt-1 text-xs text-error-600">{{ errors.password }}</p>
    </div>
    <button type="submit" class="w-full rounded-lg bg-[#FFE14D] px-4 py-2 font-medium text-[#27272B] hover:brightness-95 disabled:opacity-70" :disabled="auth.loading">
      {{ auth.loading ? 'Entrando...' : 'Entrar' }}
    </button>
    <RouterLink
      to="/criar-acesso"
      class="inline-flex w-full justify-center text-xs font-medium text-slate-600 hover:underline dark:text-slate-300"
    >
      Recebi convite por e-mail e quero criar minha senha
    </RouterLink>
  </form>
</template>

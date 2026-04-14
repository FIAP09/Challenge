import { createRouter, createWebHistory } from 'vue-router'
import { canAccessModule, userModuleGrants, type AppModule } from '@/constants/access-control'
import { useAuthStore } from '@/stores/auth.store'
import { canUseViewAs, resolveContextFromRole, useViewAsStore } from '@/stores/view-as.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('@/views/Landing/LandingView.vue'), meta: { public: true, title: 'Landing' } },
    { path: '/seletor', component: () => import('@/views/Selector/SelectorView.vue'), meta: { public: true, title: 'Seletor' } },
    {
      path: '/login',
      component: () => import('@/layouts/AuthLayout.vue'),
      children: [{ path: '', component: () => import('@/views/Auth/LoginView.vue'), meta: { public: true, title: 'Login' } }],
    },
    {
      path: '/criar-acesso',
      component: () => import('@/layouts/AuthLayout.vue'),
      children: [{ path: '', component: () => import('@/views/Auth/CreateAccessView.vue'), meta: { public: true, title: 'Criar acesso' } }],
    },
    {
      path: '/app',
      component: () => import('@/layouts/AppLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        { path: '', redirect: '/app/dashboard' },
        {
          path: 'dashboard',
          component: () => import('@/views/Dashboard/DashboardView.vue'),
          meta: { title: 'Início', roles: ['super_admin', 'hospital_admin', 'medico', 'enfermeiro'], module: 'dashboard' },
        },
        { path: 'surgeries', redirect: '/app/dashboard' },
        {
          path: 'surgeries/:id/monitor',
          component: () => import('@/views/Surgeries/SurgeryMonitorView.vue'),
          meta: { title: 'Monitor', roles: ['super_admin', 'hospital_admin', 'medico', 'enfermeiro'], module: 'monitor' },
        },
        {
          path: 'alerts',
          component: () => import('@/views/Alerts/AlertsView.vue'),
          meta: { title: 'Alertas', roles: ['super_admin', 'hospital_admin', 'medico', 'enfermeiro'], module: 'alertas' },
        },
        {
          path: 'alerts/simulacao',
          component: () => import('@/views/Alerts/AlertSimulationView.vue'),
          meta: { title: 'Simulação de alertas', roles: ['super_admin', 'hospital_admin', 'medico', 'enfermeiro'], module: 'alertas' },
        },
        {
          path: 'patients',
          component: () => import('@/views/Patients/PatientsView.vue'),
          meta: { title: 'Pacientes', roles: ['super_admin', 'hospital_admin', 'medico'], module: 'pacientes' },
        },
        {
          path: 'journey-evaluations',
          component: () => import('@/views/Journey/PatientJourneyEvaluationsView.vue'),
          meta: { title: 'Avaliações da jornada', roles: ['super_admin', 'hospital_admin', 'medico'], module: 'pacientes' },
        },
        {
          path: 'team',
          component: () => import('@/views/Team/TeamView.vue'),
          meta: { title: 'Equipe', roles: ['super_admin', 'hospital_admin', 'medico'], module: 'equipe' },
        },
        {
          path: 'patients/:id',
          redirect: '/app/patients',
          meta: { title: 'Paciente', roles: ['super_admin', 'hospital_admin', 'medico'], module: 'pacientes' },
        },
      ],
    },
    { path: '/dashboard', redirect: '/app/dashboard' },
  ],
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()
  const viewAs = useViewAsStore()

  if (auth.token && !auth.user) {
    try {
      await auth.loadCurrentUser()
    } catch {
      auth.logout()
    }
  }

  if (to.meta.public) {
    document.title = `Omni Vital | ${String(to.meta.title ?? 'Acesso')}`
    return true
  }

  if (!auth.isAuthenticated) return '/login'
  if (auth.user) {
    viewAs.initializeForRole(auth.user.role)
  }

  if (to.meta.adminOnly && !canUseViewAs(auth.user?.role)) return '/app/dashboard'

  const roles = to.meta.roles as string[] | undefined
  if (roles && auth.user && !roles.includes(auth.user.role)) return '/app/dashboard'

  const requiredModule = to.meta.module as AppModule | undefined
  if (requiredModule && auth.user) {
    const context = viewAs.activeViewAs?.context ?? viewAs.selectedContext?.context ?? resolveContextFromRole(auth.user.role)
    if (!context) return '/app/dashboard'
    if (!canAccessModule(auth.user.role, context, requiredModule, userModuleGrants(auth.user))) return '/app/dashboard'
  }

  document.title = `Omni Vital | ${String(to.meta.title ?? 'Sistema')}`
  return true
})

export default router

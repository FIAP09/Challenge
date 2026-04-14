import { computed, ref } from 'vue'

const THEME_KEY = 'omni-vital:theme'
const resolvedTheme = ref<'light' | 'dark'>((localStorage.getItem(THEME_KEY) as 'light' | 'dark') || 'dark')

const applyTheme = (theme: 'light' | 'dark') => {
  resolvedTheme.value = theme
  localStorage.setItem(THEME_KEY, theme)
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

if (typeof window !== 'undefined') {
  applyTheme(resolvedTheme.value)
}

export function useTheme() {
  const isDark = computed(() => resolvedTheme.value === 'dark')
  const toggleTheme = () => {
    applyTheme(isDark.value ? 'light' : 'dark')
  }

  return {
    theme: resolvedTheme,
    isDark,
    toggleTheme,
    setTheme: applyTheme,
  }
}

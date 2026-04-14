<script setup lang="ts">
import { ref } from 'vue'

type SimulatedAlert = {
  id: number
  severity: 'WARNING' | 'CRITICAL'
  message: string
  createdAt: string
}

const simulatedAlerts = ref<SimulatedAlert[]>([])
let audioCtx: AudioContext | null = null

const getAudioContext = () => {
  if (!audioCtx) {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctx) return null
    audioCtx = new Ctx()
  }
  return audioCtx
}

const playTone = (frequency: number, durationMs: number, gain = 0.06, startDelayMs = 0) => {
  const context = getAudioContext()
  if (!context) return

  const now = context.currentTime + startDelayMs / 1000
  const osc = context.createOscillator()
  const amp = context.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(frequency, now)
  amp.gain.setValueAtTime(0.0001, now)
  amp.gain.exponentialRampToValueAtTime(gain, now + 0.01)
  amp.gain.exponentialRampToValueAtTime(0.0001, now + durationMs / 1000)

  osc.connect(amp)
  amp.connect(context.destination)
  osc.start(now)
  osc.stop(now + durationMs / 1000 + 0.02)
}

const playWarningSound = () => {
  playTone(880, 180, 0.05)
}

const playCriticalSound = () => {
  playTone(740, 150, 0.07, 0)
  playTone(740, 150, 0.07, 220)
  playTone(740, 220, 0.08, 440)
}

const emitSimulatedAlert = (severity: 'WARNING' | 'CRITICAL') => {
  if (severity === 'WARNING') {
    playWarningSound()
  } else {
    playCriticalSound()
  }

  const message =
    severity === 'WARNING'
      ? 'Simulação WARNING: variação moderada detectada em sinal vital.'
      : 'Simulação CRITICAL: evento crítico detectado, ação imediata recomendada.'

  simulatedAlerts.value.unshift({
    id: Date.now(),
    severity,
    message,
    createdAt: new Date().toLocaleTimeString('pt-BR'),
  })
}
</script>

<template>
  <section class="space-y-5">
    <div>
      <h2 class="text-2xl font-semibold text-slate-700 dark:text-slate-100">Alertas</h2>
      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Ferramenta de simulação sonora para treino e testes de UX; não grava alertas na fila clínica.
      </p>
    </div>

    <div class="border-b border-slate-200 dark:border-slate-700">
      <div class="flex flex-wrap items-center gap-5">
        <RouterLink
          to="/app/alerts"
          class="border-b-2 border-transparent px-1 pb-2 text-sm font-semibold text-slate-500 transition hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          Listagem
        </RouterLink>
        <span class="border-b-2 border-[#FFE14D] px-1 pb-2 text-sm font-semibold text-slate-700 dark:text-slate-100">
          Simulação
        </span>
      </div>
    </div>

    <div class="grid gap-3 md:grid-cols-2">
      <button
        class="rounded-xl border border-warning-300 bg-warning-50 p-4 text-left transition hover:brightness-95 dark:border-warning-800 dark:bg-warning-950/20"
        @click="emitSimulatedAlert('WARNING')"
      >
        <p class="text-sm font-semibold text-warning-700 dark:text-warning-100">Emitir WARNING</p>
        <p class="mt-1 text-xs text-slate-600 dark:text-slate-300">Som curto e único para alerta moderado.</p>
      </button>
      <button
        class="rounded-xl border border-error-300 bg-error-50 p-4 text-left transition hover:brightness-95 dark:border-error-800 dark:bg-error-950/30"
        @click="emitSimulatedAlert('CRITICAL')"
      >
        <p class="text-sm font-semibold text-error-700 dark:text-error-200">Emitir CRITICAL</p>
        <p class="mt-1 text-xs text-slate-600 dark:text-slate-300">Som repetido e mais intenso para criticidade alta.</p>
      </button>
    </div>

    <div class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <h3 class="mb-3 text-base font-semibold text-slate-700 dark:text-slate-100">Histórico da simulação</h3>
      <div v-if="simulatedAlerts.length === 0" class="text-sm text-slate-500 dark:text-slate-400">
        Nenhum alerta simulado ainda.
      </div>
      <div v-else class="space-y-2">
        <article
          v-for="alert in simulatedAlerts"
          :key="alert.id"
          class="rounded-lg border px-3 py-2"
          :class="alert.severity === 'CRITICAL' ? 'border-error-300 bg-error-50 dark:border-error-800 dark:bg-error-950/30' : 'border-warning-300 bg-warning-50 dark:border-warning-800 dark:bg-warning-950/20'"
        >
          <div class="flex items-center justify-between">
            <p class="text-sm font-semibold text-slate-700 dark:text-slate-100">{{ alert.severity }}</p>
            <span class="text-xs text-slate-500 dark:text-slate-400">{{ alert.createdAt }}</span>
          </div>
          <p class="mt-1 text-sm text-slate-700 dark:text-slate-200">{{ alert.message }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

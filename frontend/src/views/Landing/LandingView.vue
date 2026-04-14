<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <main
    class="min-h-screen transition-colors duration-200"
    :class="isDark ? 'bg-[#030B23] text-slate-100' : 'bg-[#FFFDF5] text-slate-700'"
  >
    <header
      class="sticky top-0 z-50 backdrop-blur transition-colors duration-200"
      :class="isDark ? 'border-b border-[#1b2747] bg-[#07122E]/95' : 'border-b border-[#f3e5a8] bg-[#fff9e8]/95'"
    >
      <div
        class="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-2 px-4 pt-[env(safe-area-inset-top)] sm:px-6 lg:px-8"
      >
        <RouterLink to="/" class="shrink-0 text-sm font-semibold tracking-wide" :class="isDark ? 'text-white' : 'text-slate-700'">
          Omni Vital
        </RouterLink>

        <nav
          class="hidden min-w-0 items-center gap-3 overflow-x-auto text-sm sm:flex md:gap-6"
          :class="isDark ? 'text-slate-300' : 'text-slate-500'"
        >
          <a href="#" class="shrink-0 hover:text-[#FFE14D]">Início</a>
          <a href="#" class="shrink-0 hover:text-[#FFE14D]">Solução</a>
          <a href="#" class="shrink-0 hover:text-[#FFE14D]">Fluxo clínico</a>
          <a href="#" class="shrink-0 hover:text-[#FFE14D]">Segurança</a>
        </nav>

        <div class="flex shrink-0 flex-wrap items-center justify-end gap-1.5 sm:gap-2">
          <RouterLink
            to="/login"
            class="inline-flex h-10 touch-manipulation items-center rounded-lg px-3 text-xs font-semibold transition sm:h-9"
            :class="isDark ? 'text-zinc-100 hover:bg-zinc-800' : 'text-slate-700 hover:bg-[#fff4c4]'"
          >
            Entrar
          </RouterLink>
          <span
            class="inline-flex h-10 items-center rounded-lg px-2.5 text-[10px] font-semibold sm:h-9 sm:px-3 sm:text-xs"
            :class="isDark ? 'bg-white text-[#0a1636]' : 'bg-[#0a1636] text-white'"
            title="Acesso por convite"
          >
            <span class="sm:hidden">Convite</span>
            <span class="hidden sm:inline">Acesso por convite</span>
          </span>
          <button
            type="button"
            class="inline-flex h-10 w-10 touch-manipulation items-center justify-center rounded-lg transition sm:h-9 sm:w-9"
            :class="isDark ? 'text-zinc-300 hover:bg-zinc-800' : 'text-slate-600 hover:bg-[#fff4c4]'"
            :title="isDark ? 'Ativar tema claro' : 'Ativar tema escuro'"
            @click="toggleTheme"
          >
            <Sun v-if="isDark" :size="16" />
            <Moon v-else :size="16" />
          </button>
        </div>
      </div>
    </header>

    <section class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
      <div class="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div class="space-y-6">
          <span
            class="inline-flex rounded-full border px-4 py-1 text-xs font-semibold tracking-wider"
            :class="isDark ? 'border-[#FFE14D]/60 text-[#FFE14D]' : 'border-[#c8a800] text-[#9e8500]'"
          >
            O PROBLEMA
          </span>
          <h1 class="text-4xl font-semibold leading-tight md:text-5xl" :class="isDark ? 'text-[#FFE14D]' : 'text-[#0f2743]'">
            Monitoramento Ineficaz Pode Custar Vidas
          </h1>
          <div class="space-y-4 text-sm leading-7" :class="isDark ? 'text-zinc-200' : 'text-slate-600'">
            <p class="rounded-2xl border p-4" :class="isDark ? 'border-zinc-700 bg-zinc-700/50' : 'border-[#f3e5a8] bg-[#fffdf5]'">
              <strong class="block text-base" :class="isDark ? 'text-zinc-100' : 'text-slate-700'">Monitoramento Contínuo Necessário</strong>
              Cirurgias bariátricas exigem vigilância nas três fases — pré, intra e pós-operatório — para detectar riscos clínicos antes que se tornem críticos.
            </p>
            <p class="rounded-2xl border p-4" :class="isDark ? 'border-zinc-700 bg-zinc-700/50' : 'border-[#f3e5a8] bg-[#fffdf5]'">
              <strong class="block text-base" :class="isDark ? 'text-zinc-100' : 'text-slate-700'">Riscos e Complicações Graves</strong>
              Pacientes bariátricos apresentam vulnerabilidades elevadas. A detecção tardia de complicações pode comprometer a segurança e exige resposta médica imediata.
            </p>
          </div>
          <div class="space-y-3 text-sm" :class="isDark ? 'text-zinc-300' : 'text-slate-600'">
            <p>- Em 2023 foram realizadas <strong :class="isDark ? 'text-white' : 'text-slate-700'">80.441 cirurgias bariátricas</strong> no Brasil.</p>
            <p>- Apenas <strong :class="isDark ? 'text-white' : 'text-slate-700'">0,097%</strong> da população elegível teve acesso ao procedimento.</p>
            <p>- A taxa geral de complicações pós-operatórias é de <strong :class="isDark ? 'text-white' : 'text-slate-700'">16,2%</strong>.</p>
            <p>- Pacientes operados têm <strong :class="isDark ? 'text-white' : 'text-slate-700'">16% menos mortalidade geral</strong>.</p>
          </div>
        </div>

        <div class="rounded-3xl border p-8" :class="isDark ? 'border-zinc-700 bg-zinc-800' : 'border-[#f3e5a8] bg-[#fff9e8]'">
          <h2 class="text-xl font-semibold" :class="isDark ? 'text-[#FFE14D]' : 'text-[#0f2743]'">Por que o Omni Vital é necessário</h2>
          <p class="mt-4 text-sm leading-7" :class="isDark ? 'text-zinc-200' : 'text-slate-600'">
            Com volumes acima de 80 mil cirurgias/ano, complicações chegando a 16% e mortalidade concentrada em regiões
            com menor suporte assistencial, um sistema de monitoramento em tempo real que detecta pressão baixa,
            sangramento elevado, febre pós-op e tempo cirúrgico excedido pode literalmente salvar vidas.
            A janela de intervenção em complicações bariátricas é estreita: minutos importam.
          </p>
        </div>
      </div>
    </section>

    <!--
      Indicadores obstétricos: números oficiais mudam por ano e tabulação.
      Consulte SINASC/DATASUS e boletins do Ministério da Saúde para cifras atualizadas.
    -->
    <section class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
      <div
        class="rounded-3xl border p-6 transition-colors duration-200 lg:p-8"
        :class="isDark ? 'border-[#1b2747] bg-[#0f1a3d]' : 'border-[#f3e5a8] bg-[#fff9e8]'"
      >
        <h2 class="text-2xl font-semibold" :class="isDark ? 'text-[#FFE14D]' : 'text-[#0f2743]'">
          Contexto obstétrico no Brasil
        </h2>
        <p class="mt-3 text-sm leading-7" :class="isDark ? 'text-slate-300' : 'text-slate-600'">
          Além da cirurgia bariátrica, equipes acompanham partos por via vaginal, cesárea e transições de risco.
          O pré-natal contínuo e o monitoramento na maternidade ajudam a reduzir intercorrências e a alinhar decisões com protocolos locais.
        </p>
        <ul class="mt-4 space-y-2 text-sm" :class="isDark ? 'text-slate-300' : 'text-slate-600'">
          <li>
            - O país historicamente registra <strong :class="isDark ? 'text-white' : 'text-slate-700'">altas taxas de cesárea</strong>;
            estratégias de qualificação do cuidado e informação às gestantes permanecem centrais na agenda pública.
          </li>
          <li>
            - O <strong :class="isDark ? 'text-white' : 'text-slate-700'">parto normal</strong>, quando clinicamente seguro, pode reduzir intercorrências
            relacionadas a procedimentos desnecessários; a decisão é sempre médica e compartilhada com a gestante.
          </li>
          <li>
            - Monitorar sinais, tempos e alertas na maternidade — em parto normal ou cesárea — melhora a resposta da equipe em janelas críticas.
          </li>
        </ul>
        <p class="mt-4 text-[11px] leading-relaxed" :class="isDark ? 'text-slate-500' : 'text-slate-500'">
          Fontes para indicadores quantitativos: Ministério da Saúde, DATASUS (SINASC, TABNET). Este bloco é qualitativo; não substitui dados oficiais atualizados.
        </p>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
      <div
        class="rounded-3xl border p-6 transition-colors duration-200 lg:p-8"
        :class="isDark ? 'border-[#1b2747] bg-[#0f1a3d]' : 'border-[#f3e5a8] bg-[#fff9e8]'"
      >
        <div class="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 class="text-2xl font-semibold" :class="isDark ? 'text-[#FFE14D]' : 'text-[#0f2743]'">
              Seletor de frentes (demo)
            </h2>
            <p class="mt-2 text-sm" :class="isDark ? 'text-slate-300' : 'text-slate-600'">
              Inclui pacientes mockados em <strong :class="isDark ? 'text-white' : 'text-slate-800'">acompanhamento bariátrico</strong>,
              <strong :class="isDark ? 'text-white' : 'text-slate-800'">cesárea</strong> e
              <strong :class="isDark ? 'text-white' : 'text-slate-800'">parto normal</strong>, além de acompanhante e equipe médica.
            </p>
          </div>
          <RouterLink
            to="/seletor"
            class="inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold transition"
            :class="isDark ? 'bg-[#FFE14D] text-[#0a1636] hover:brightness-95' : 'bg-[#0a1636] text-white hover:bg-[#10224f]'"
          >
            Abrir seletor
          </RouterLink>
        </div>

        <div class="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div class="rounded-xl border px-4 py-3" :class="isDark ? 'border-slate-700 bg-slate-900/40' : 'border-[#f3e5a8] bg-[#fffdf5]'">
            <p class="text-sm font-semibold" :class="isDark ? 'text-slate-100' : 'text-slate-700'">Paciente (metabólico)</p>
            <p class="mt-1 text-xs" :class="isDark ? 'text-slate-400' : 'text-slate-500'">Metas, peso de referência, exames e fases do cuidado.</p>
          </div>
          <div class="rounded-xl border px-4 py-3" :class="isDark ? 'border-slate-700 bg-slate-900/40' : 'border-[#f3e5a8] bg-[#fffdf5]'">
            <p class="text-sm font-semibold" :class="isDark ? 'text-slate-100' : 'text-slate-700'">Paciente (cesárea)</p>
            <p class="mt-1 text-xs" :class="isDark ? 'text-slate-400' : 'text-slate-500'">Pré-natal, preparo e checklist clínico em primeira pessoa.</p>
          </div>
          <div class="rounded-xl border px-4 py-3" :class="isDark ? 'border-slate-700 bg-slate-900/40' : 'border-[#f3e5a8] bg-[#fffdf5]'">
            <p class="text-sm font-semibold" :class="isDark ? 'text-slate-100' : 'text-slate-700'">Paciente (parto normal)</p>
            <p class="mt-1 text-xs" :class="isDark ? 'text-slate-400' : 'text-slate-500'">Educação para o parto, sinais e apoio alinhados ao pré-natal.</p>
          </div>
          <div class="rounded-xl border px-4 py-3" :class="isDark ? 'border-slate-700 bg-slate-900/40' : 'border-[#f3e5a8] bg-[#fffdf5]'">
            <p class="text-sm font-semibold" :class="isDark ? 'text-slate-100' : 'text-slate-700'">Acompanhante e equipe</p>
            <p class="mt-1 text-xs" :class="isDark ? 'text-slate-400' : 'text-slate-500'">Visão do familiar e operação com alertas e cadastros.</p>
          </div>
        </div>
      </div>
    </section>

    <footer :class="isDark ? 'border-t border-[#1b2747] bg-[#0a1332]' : 'border-t border-[#f3e5a8] bg-[#fff6d6]'">
      <div class="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:px-8">
        <div>
          <p class="font-semibold" :class="isDark ? 'text-zinc-200' : 'text-slate-700'">Omni Vital</p>
          <p class="mt-2 text-sm" :class="isDark ? 'text-zinc-400' : 'text-slate-500'">Monitoramento cirúrgico inteligente e humanizado.</p>
        </div>
        <div>
          <p class="text-sm font-semibold" :class="isDark ? 'text-zinc-200' : 'text-slate-700'">Navegue</p>
          <div class="mt-2 space-y-1 text-sm" :class="isDark ? 'text-zinc-400' : 'text-slate-500'">
            <p>Início</p><p>Solução</p><p>Fluxo clínico</p><p>Entrar</p>
          </div>
        </div>
        <div>
          <p class="text-sm font-semibold" :class="isDark ? 'text-zinc-200' : 'text-slate-700'">Diferenciais</p>
          <div class="mt-2 space-y-1 text-sm" :class="isDark ? 'text-zinc-400' : 'text-slate-500'">
            <p>Alertas em tempo real</p><p>Acompanhamento por jornada</p><p>Acesso seguro por perfil</p>
          </div>
        </div>
        <div>
          <p class="text-sm font-semibold" :class="isDark ? 'text-zinc-200' : 'text-slate-700'">Equipe médica conectada</p>
          <p class="mt-2 text-sm" :class="isDark ? 'text-zinc-400' : 'text-slate-500'">Pacientes e acompanhantes recebem acesso por convite e acompanhamento seguro.</p>
        </div>
      </div>
      <div class="border-t px-4 py-2 text-center text-[11px] transition-colors sm:px-6" :class="isDark ? 'border-[#1b2747] text-zinc-500' : 'border-[#f3e5a8] text-slate-500'">
        © 2026 Omni Vital. Todos os direitos reservados.
      </div>
    </footer>
  </main>
</template>

# Omni Vital

Sistema **SaaS** de acompanhamento de pacientes bariátricos para hospitais e clínicas. O produto centraliza toda a jornada do paciente — do pré-operatório ao acompanhamento pós-cirúrgico de longo prazo — reunindo exames de múltiplos especialistas, controle de peso, dieta, sono, atividade física e orientações clínicas em uma única plataforma.

**Não há hardware proprietário:** a solução integra-se a sistemas já existentes na unidade (API/gateway).

Este repositório concentra o **frontend** (Vue 3), a **infraestrutura de desenvolvimento** (mock de API com Mockoon) e referências de UI. O **backend** é mantido separadamente.

---

## Funcionalidades principais

### Pré-operatório
- **Timeline de exames por especialidade** — cardiologia, pneumologia, endocrinologia, nutrologia, psicologia, nutricionista
- **Controle evolutivo** — o que melhorou, o que piorou, comparação de laudos
- **Avaliações da jornada** — metas definidas pela equipe com acompanhamento

### Cirurgia
- **Registro pós-procedimento** — técnica, duração, complicações, cirurgião responsável

### Pós-operatório
- **Curva de peso** — evolução temporal com meta e alerta de reganho
- **Exames laboratoriais** — hemoglobina, ferritina, B12, albumina, glicemia, etc.
- **Controle de dieta** — registro de refeições e calorias
- **Controle de sono** — horas e qualidade
- **Atividade física** — tipo, duração e notas
- **Orientações ao paciente** — complicações possíveis, expectativas de perda de peso, dieta pós-bariátrica

### Plataforma
- **Acesso por perfil** — médico, enfermeiro, administrador, paciente, acompanhante
- **Sistema de alertas** — alertas críticos e avisos para a equipe
- **Tema claro/escuro** — interface clínica responsiva

---

## Estrutura do repositório

| Caminho                                      | Descrição                                                                      |
| -------------------------------------------- | ------------------------------------------------------------------------------ |
| `frontend/`                                  | Aplicação web (Vue 3, Vite, Pinia, Tailwind).                                  |
| `infra/dev/`                                 | Docker Compose + ambiente Mockoon para simular a API em desenvolvimento.       |
| `infra/prod/`                                | Exemplo de Compose para publicar a imagem do frontend.                         |
| `Makefile`                                   | Atalhos para subir/parar o mock (`mock` / `stop-mock`).                        |
| `cursor-instructions-omni-vital-frontend.md` | Instruções detalhadas de arquitetura e convenções do frontend.                 |

---

## Perfis de usuário

| Papel (`role`)   | Uso típico                                                                                |
| ---------------- | ----------------------------------------------------------------------------------------- |
| `super_admin`    | Gestão global: hospitais/clínicas, parâmetros e usuários.                                 |
| `hospital_admin` | Gestão da unidade: equipes e configurações locais.                                        |
| `medico`         | Acompanhamento dos pacientes, exames, registro de cirurgia, alertas.                      |
| `enfermeiro`     | Alertas, checklist e acompanhamento de pacientes.                                         |

**Contextos de visualização (demo):** paciente, acompanhante, equipe médica.

---

## Pré-requisitos

- **Node.js** 18+ (recomendado 20+).
- **pnpm** (o projeto usa `pnpm`).
- **Docker** e **Docker Compose** (para o mock de API em `infra/dev`).

---

## Como rodar em desenvolvimento

### 1. Subir o mock da API (Mockoon)

```bash
make mock
```

### 2. Instalar dependências e iniciar o frontend

```bash
cd frontend
pnpm install
pnpm dev
```

### 3. Variáveis de ambiente

```env
VITE_API_URL=http://localhost:23984
VITE_APP_NAME=Omni Vital
VITE_APP_ENV=development
```

---

## Scripts úteis (`frontend/package.json`)

| Comando        | Descrição                                     |
| -------------- | --------------------------------------------- |
| `pnpm dev`     | Servidor de desenvolvimento (Vite).           |
| `pnpm build`   | Build de produção (inclui checagem de tipos). |
| `pnpm preview` | Servir o build localmente.                    |
| `pnpm lint`    | ESLint.                                       |
| `pnpm format`  | Prettier nos arquivos de `src/`.              |

---

## Roadmap

- [ ] Integração multiprofissional (nutricionista, psicólogo, educador físico com interface própria)
- [ ] IA para análise de fotos de refeições e cálculo de calorias
- [ ] Assinatura digital de termos de consentimento
- [ ] Upload de exames (PDF/imagem) com OCR
- [ ] Backend completo com API REST

---

## Licença e componentes de terceiros

O diretório `tailadmin-vue-pro-2.0-main/` e partes derivadas seguem as licenças do **TailAdmin Vue Pro**. Verifique os arquivos de licença do fornecedor antes de redistribuir.

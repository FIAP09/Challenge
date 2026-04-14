# Omni Vital

Sistema **SaaS** de monitoramento cirúrgico para hospitais e clínicas, com foco inicial em **cirurgia bariátrica** e **cesariana**. O produto acompanha o paciente do pré-operatório à alta, reunindo dados clínicos e operacionais e apoiando a detecção de situações que exigem atenção imediata da equipe.

**Não há hardware proprietário:** a solução integra-se a equipamentos e sistemas já existentes na unidade (API/gateway), processando sinais e eventos em tempo quase real.

Este repositório concentra o **frontend** (Vue 3), a **infraestrutura de desenvolvimento** (mock de API com Mockoon) e referências de UI. O **backend** é mantido separadamente pela equipe.

---

## Estrutura do repositório

| Caminho                                      | Descrição                                                                      |
| -------------------------------------------- | ------------------------------------------------------------------------------ |
| `frontend/`                                  | Aplicação web (Vue 3, Vite, Pinia, Tailwind).                                  |
| `infra/dev/`                                 | Docker Compose + ambiente Mockoon para simular a API em desenvolvimento.       |
| `infra/prod/`                                | Exemplo de Compose para publicar a imagem do frontend.                         |
| `tailadmin-vue-pro-2.0-main/`                | Template/base TailAdmin Vue Pro usado como referência de componentes.          |
| `Makefile`                                   | Atalhos para subir/parar o mock (`mock` / `stop-mock`).                        |
| `cursor-instructions-omni-vital-frontend.md` | Instruções detalhadas de arquitetura, contratos mock e convenções do frontend. |

---

## Regras de negócio e produto (visão funcional)

### Domínio

- Monitoramento **intra** e **pós-operatório** com ênfase em cirurgias de alto volume e risco assistencial (bariátrica, cesariana).
- Objetivo: dar visibilidade consolidada (dashboard, lista de cirurgias, monitor em tempo real, alertas) para reduzir tempo até a intervenção da equipe.

### Perfis de usuário (papéis)

Os papéis abaixo definem o que a interface **pode** exibir. A lista efetiva de módulos pode ainda ser refinada por **contexto de visualização** (ex.: acompanhante vs. equipe) e, quando existir, por **grants** vindos da API.

| Papel (`role`)   | Uso típico                                                                                                 |
| ---------------- | ---------------------------------------------------------------------------------------------------------- |
| `super_admin`    | Gestão global: hospitais/clínicas, parâmetros e usuários em escopo amplo.                                  |
| `hospital_admin` | Gestão da unidade: equipes, salas e configurações locais.                                                  |
| `medico`         | Acompanhamento dos pacientes, alertas e registro de evoluções.                                             |
| `enfermeiro`     | Monitor em tempo real e tratamento de alertas (sem módulo de pacientes/equipe no modelo padrão de acesso). |

**Módulos** previstos na aplicação: `dashboard`, `cirurgias`, `monitor`, `alertas`, `pacientes`, `equipe` — com combinações diferentes por papel e contexto (ver `frontend/src/constants/access-control.ts`).

### Regras de experiência e segurança na UI

- **Acesso fechado:** não há rotas públicas de cadastro, registro ou recuperação de senha; credenciais são gerenciadas pelo administrador da unidade.
- **Tela de login** sem fluxo “esqueci minha senha” exposto ao usuário final.
- **Menus, rotas e ações** são filtrados conforme papel (e contexto / grants quando aplicável).
- **Identidade visual:** interface clínica, tons de azul e branco; estados críticos com destaque em vermelho.

### Alertas e monitoramento

- Alertas ligam **sinais vitais**, **tempo de procedimento** e outras regras clínicas/operacionais definidas pela API e pela configuração do hospital (detalhes de limiar e severidade ficam no backend e nos contratos).
- Em desenvolvimento, o comportamento da API (incluindo login e dados de exemplo) é simulado pelo **Mockoon**.

---

## Pré-requisitos

- **Node.js** 18+ (recomendado 20+).
- **pnpm**, **npm** ou **yarn** (o projeto costuma usar `pnpm` no dia a dia).
- **Docker** e **Docker Compose** (para o mock de API em `infra/dev`).

---

## Como rodar em desenvolvimento

### 1. Subir o mock da API (Mockoon)

Na raiz do repositório:

```bash
make mock
```

Equivalente:

```bash
docker compose -f infra/dev/docker-compose.yml up -d
```

O serviço expõe a API mock na porta **`23984`** (arquivo de dados: `infra/dev/mockoon/omni-vital-api.json`).

Para encerrar:

```bash
make stop-mock
```

### 2. Instalar dependências e iniciar o frontend

```bash
cd frontend
pnpm install
pnpm dev
```

(Substitua por `npm install` / `npm run dev` se preferir.)

### 3. Variáveis de ambiente

O arquivo `frontend/.env.development` deve apontar o cliente HTTP para o mock:

```env
VITE_API_URL=http://localhost:23984
VITE_APP_NAME=Omni Vital
VITE_APP_ENV=development
```

Ajuste `VITE_API_URL` se a API real ou o mock rodarem em outro host/porta.

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

## Produção

O arquivo `infra/prod/docker-compose.yml` exemplifica a publicação da imagem `omni-vital/frontend:latest` na porta **80**, com `VITE_API_URL` e `VITE_APP_ENV=production` injetados no container. Ajuste a URL da API e o processo de build da imagem conforme o pipeline da equipe.

---

## Documentação adicional

- Detalhes de stack (VueUse/`useFetch`, estrutura de pastas, contratos JSON do Mockoon): **`cursor-instructions-omni-vital-frontend.md`**.
- README específico do template TailAdmin: `frontend/README.md` e `tailadmin-vue-pro-2.0-main/README.md`.

---

## Licença e componentes de terceiros

O diretório `tailadmin-vue-pro-2.0-main/` e partes derivadas no `frontend/` seguem as licenças e termos do **TailAdmin Vue Pro**. Verifique os arquivos de licença do fornecedor antes de redistribuir.

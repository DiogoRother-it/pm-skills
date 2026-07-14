---
name: px-setup
description: Prepara o TERRENO técnico de um projeto (a parte de git/repositório) para o líder UX, sem ele decorar comando. PX SEMPRE trabalha no boilerplate — nunca no repo do dev. Monta o sandbox a partir do boilerplate para o PX idealizar. Também executa a ENTREGA — quando o dev libera o repo, cria a branch ux/ no repo do dev, empurra o trabalho do sandbox e abre o Merge Request para o dev fazer o nivelamento de stack. Não idealiza nem desenha tela: prepara e entrega. Use ao começar o terreno de um projeto ou ao levar o sandbox pro repo do dev — "começar um projeto", "montar o ambiente", "os devs liberaram o repo", "levar meu trabalho pro repo do dev", "criar a branch ux".
compatibility: claude-code
metadata:
  audience: px-ux
  workflow: setup
---

# px-setup — prepara o terreno e faz a entrega

Esta skill cuida da **parte mecânica de repositório** pra o líder UX não precisar decorar comando de `git`. Ela **pergunta o cenário**, **monta o sandbox** e, no fim do ciclo, **empurra o trabalho pro repo do dev**. Ela não idealiza nem desenha tela — quem faz isso é a cadeia a partir de `px-start`.

**Regra fundamental:** o PX **sempre** trabalha no boilerplate. O repo do dev é destino de entrega, nunca ambiente de trabalho.

**Público desta skill:** o líder UX/PX. Seja direto: pergunte só o que muda a decisão, execute o resto.

**Regra de ouro:** o UX descreve a intenção em português; a skill roda os comandos (`git`, `npm`, `npx`) por ele. Nunca peça pra ele digitar `git` na mão.

Contexto inicial via slash: `$ARGUMENTS` (nome/ideia do projeto ou "entrega"). Se vazio, pergunte o que a pessoa vem fazer.

## Prompting

Segue `Skill Prompting Conventions` do `CLAUDE.md`. Estruturada pra decisões enumeráveis (novo × continuação, é entrega?); livre pra nome do projeto e URL do repo. Toda pergunta traz o porquê + default recomendado; eco ao final antes de executar.

## Passo 0 — Qual é o cenário?

Pergunte (`AskUserQuestion`), porque o caminho muda tudo:

- **Projeto novo** → Passo 1 (montar o sandbox).
- **Continuação** (sandbox já existe, retomando o trabalho) → confirme a pasta do sandbox e encaminhe de volta pra cadeia PX.
- **Hora de entregar** (o dev liberou o repo e o trabalho está pronto) → Passo 3.

## Passo 1 — Projeto novo: montar o sandbox

O PX sempre começa no boilerplate — independentemente de o repo do dev existir ou não. O sandbox é o **único ambiente de trabalho do PX**.

> **Branch por funcionalidade/fluxo, não por projeto.** Um projeto tem várias funcionalidades → várias branches `ux/*`. O slug `<funcionalidade>` é o **mesmo** que a cadeia usa em `planning/<iniciativa>/` e no `PX-PROGRESS` — um slug só governa planning, checkpoint e branch. Se a funcionalidade ainda não tem nome (discovery não rodou), ela nasce assim que o `px-intake` decide o slug; não invente nome provisório.

## Passo 2 — Montar o sandbox

**O que é:** uma cópia local do boilerplate — já traz a biblioteca de componentes e os tokens. É o ateliê do PX: padronizado, isolado e independente do repo do dev.

**Executar (a skill roda; não peça pro UX digitar):**
1. Pedir um nome pra pasta (livre; ex: a ideia do projeto).
2. Clonar o boilerplate: `git clone https://github.com/DiogoRother-it/centralit-boilerplate.git <pasta>`
3. Entrar na pasta e **desconectar do git** pra não empurrar rascunho no boilerplate do time: `rm -rf .git`
4. Instalar: `npm install`
5. Adicionar as skills: `npx github:DiogoRother-it/px-skills`
6. Avisar pra **recarregar a sessão** (as skills aparecem no menu `/` só depois) e **começar por `/px-start`**.

**Pré-requisito:** a pessoa precisa ter acesso ao repo privado `centralit-boilerplate` (login normal do GitHub; sem token).

## Passo 3 — Entrega: empurrar o sandbox pro repo do dev

Roda quando o dev libera o repo e o PX já tem o trabalho pronto no sandbox. Normalmente **despachada pela `px-handoff`**, que traz o pacote pronto: funcionalidade, título do MR com `[Sprint NN]` e o `handoff.md` como corpo.

**O que o PX entrega:** código funcional rodando — não uma spec pra ser reinterpretada. O dev recebe as telas implementadas e faz o **nivelamento de stack** (adapta a estrutura de pastas e rotas pro projeto dele). Não é reimplementação.

**Pré-condição:** confirme que o repo do dev já tem o `packages/components` semeado com o padrão Central IT (via registry `@centralit/kit`). Se chegou "cru", pause e sinalize o time de dev antes de seguir.

**Executar:**
1. Pedir a **URL do repo do dev** (se ainda não tiver) e clonar: `git clone <url> <pasta-dev>`.
2. Criar a branch de entrega: `git checkout -b ux/<funcionalidade>`.
3. **Copiar o trabalho do sandbox** pro repo do dev:
   - **Telas** (`src/pages/` ou `src/app/`) → colar na pasta equivalente do projeto do dev.
   - **`planning/`** → `planning/` (vai direto).
   - **`src/index.css`** (tokens de identidade) → entregar como referência; o dev migra pro formato da stack dele.
   - **Não levar:** `node_modules`, `.git`, componentes de `src/components/ui/` (já existem no repo do dev via `@centralit/kit`).
4. Commitar e empurrar: `git add .` → `git commit -m "ux(<funcionalidade>): ..."` → `git push -u origin ux/<funcionalidade>`.
5. Gerar o **link do Merge Request** (`ux/<funcionalidade>` → `main`) pra o UX abrir. Título com sprint quando vier da `px-handoff`: `[Sprint NN] ux(<funcionalidade>): <resumo>`; corpo = o `handoff.md`.

**Antes do commit, mostre ao UX o resumo dos arquivos que vão entrar** — confirme antes de executar.

## Eco final

Antes de executar, repita em 3–4 linhas: *"Então: cenário **X**, vou fazer **Y** em **Z** — confirma?"*. Só então rode os comandos.

## Regras

- **Não idealiza nem desenha.** Prepara terreno e entrega; a idealização é a partir de `px-start`.
- **Nunca `git` na mão pro UX.** A skill executa; o UX só confirma.
- **Nunca commit na `main`.** Sempre branch `ux/<funcionalidade>` + Merge Request.
- **Sandbox é o ateliê, não o produto.** Depois de entregue e mergeado, pode ser apagado.
- **O dev faz o nivelamento de stack.** PX entrega código funcional; a adaptação à estrutura do projeto real é responsabilidade do dev.
- **Sem token no fluxo de sandbox.** O acesso ao repo privado é o login normal do GitHub.

## Relação com o fluxo

```
px-setup (terreno / entrega)
   ├─ monta sandbox (boilerplate)  ──►  px-start  →  px-intake  →  px-kickoff  →  px-request  →  px-story  →  px-handoff
   └─ entrega (Passo 3)  ◄── px-handoff despacha → branch ux/<funcionalidade> + MR [Sprint NN] → dev (nivela a stack)
```

> Integração: o `px-start` delega o terreno técnico pra cá. Sem duplicação de comando de git entre as duas.
>
> Fechamento: a `px-handoff` monta o pacote de entrega (DoD + sprint + flows + histórias) e **despacha a mecânica de git pra cá** (Passo 3). O `px-handoff` não roda git; a `px-setup` não monta pacote — cada uma na sua metade.
>
> O dev recebe código funcional rodando numa branch `ux/`. O nivelamento de stack (adaptar estrutura de pastas, rotas e formato de tokens pro projeto real) é responsabilidade exclusiva do dev.

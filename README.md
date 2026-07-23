# @centralit/pm-skills

Cadeia de skills de **Product Management** da Central IT para **Claude Code**. Feito para o
**PM instalar as skills no repo do produto** e conduzir a iniciativa direto pelo menu `/`.

## O que instala

- **22 skills PM** em `.claude/skills/`: `pm-context`, `pm-discovery`, `pm-market`, `pm-competitive`,
  `pm-research`, `pm-strategy`, `pm-objective`, `pm-proto`, `pm-viability`, `pm-ai-gate`,
  `pm-ai-approach`, `pm-ai-evals`, `pm-architecture`, `pm-prd`, `pm-gtm`, `pm-roadmap`, `pm-brief`,
  `pm-heritage`, `pm-retrospective`, `pm-stakeholder`, `pm-sunset`, `pm-update`
- Um ponteiro no `CLAUDE.md` do repo apontando `pm-context` como portão de entrada (cria se não existir)

As skills são **autossuficientes** — não dependem de docs externos, protocolo ou biblioteca de UI.

## Como instalar

Rode **dentro do repositório do produto** (o diretório atual vira o destino):

```bash
npx github:DiogoRother-it/pm-skills
```

Depois, abra o Claude Code nesse repo e comece por **`/pm-context`** — a skill roteadora que
classifica o contexto da iniciativa e decide qual skill PM rodar a seguir.

## Ponto de entrada

Toda iniciativa começa por **`/pm-context`**. Ele é obrigatório: identifica tipo de produto,
histórico, documentação existente e estratégia, e encaminha para a próxima skill da cadeia.
Nunca pule esse portão.

## Manutenção

- **Fonte da verdade das skills**: este repositório (`skills/pm-*/`).
- Suba a versão em `package.json` a cada evolução relevante da cadeia.

---
name: px-proto
description: Cria componentes/páginas de protótipo dentro do boilerplate (Vite + localhost) usando os componentes reais do shadcn, os tokens reais do UI KIT e mock data do px-request. O PX trabalha no localhost com HMR — vê, ajusta, aprova. Obrigatório após o px-request e antes do px-story. Use quando o líder disser "gera o proto", "quero ver como fica", "prototipar a tela", "visualizar a spec", ou ao fechar um px-request.
compatibility: claude-code
metadata:
  audience: px-ux
  workflow: proto
---

# px-proto — protótipo visual no boilerplate (Vite + localhost)

Esta skill cria o protótipo da tela **dentro do boilerplate**, usando os componentes reais do shadcn/ui, os tokens reais do `src/index.css` e o servidor de desenvolvimento Vite. O PX vê a tela no localhost com HMR — ajusta em tempo real, aprova — e só então a tela vira história (`px-story`). O protótipo fica em `src/proto/` e não é código de produção.

**Por que no boilerplate, não em HTML standalone:** o proto usa componentes reais (Button, Table, Dialog...), tokens reais (sem extração manual) e HMR (cada ajuste aparece sem recarregar). A fidelidade é máxima porque é o mesmo stack. Standalone HTML via CDN seria uma aproximação — aqui é o produto de verdade, só com mock data e um diretório separado.

**Por que obrigatório:** spec textual não substitui revisão visual. Erros de hierarquia, densidade, estados e copy só aparecem quando você vê a tela. Corrigir aqui é grátis; corrigir depois do dev é caro.

**Público:** o líder UX/PX. Seja direto e visual — esta skill conversa pouco e entrega depressa.

Contexto inicial via slash: `$ARGUMENTS` (caminho do `px-request`, nome da tela, ou descrição). Se vazio, peça.

---

## Passo 0 — Ingerir a px-request (base inegociável)

Leia o artefato `planning/<iniciativa>/requests/<slug>.md`. Extraia e ecoar em 5–8 linhas:

- **Tela / componente:** nome + propósito em 1 frase
- **Público principal:** papel + nível de familiaridade
- **Variação definida:** qual componente do catálogo (ex: "Table com Expansão — variante C")
- **Estados a cobrir:** lista dos estados do B7 (default, loading, empty, error, disabled, success)
- **Ações principais:** botões, menus, ações em linha
- **Mock data:** campos e valores que vão aparecer (Bloco 4)

Se o `px-request` não existir ou estiver sem Definition of Ready, **pare**: rode `px-request` antes. O proto nunca nasce de spec incompleta.

Eco: *"Vou prototiar: [tela], variação [X], estados [A/B/C], no boilerplate em src/proto/ — confirma?"*

---

## Passo 1 — Verificar o ambiente

1. O sandbox está rodando? Se não, rode `npm run dev` em background e aguarde o localhost subir.
2. Confirme que `src/index.css` existe e tem os tokens do UI KIT (`--primary`, `--background`, `--radius` etc.). Se não, avise que o `px-kickoff` precisa materializar o UI KIT primeiro.
3. Confirme que os componentes shadcn necessários para a variação já estão instalados em `src/components/ui/`. Se não, instale: `npx shadcn add <componente>` (ex: `npx shadcn add table`, `npx shadcn add dialog`).

---

## Passo 2 — Mapear a variação no catálogo de componentes

Com a variação definida no `px-request` (Bloco 6), consulte `docs/design-system/ds-components_v4.md` e extraia:

- **Anatomia:** quais partes compõem o componente
- **Estados documentados:** quais são específicos desta variação
- **Regras visuais:** sizing, spacing, comportamentos obrigatórios
- **Comportamentos de overlay** (se aplicável): regras de empilhamento

A variação escolhida na `px-request` determina exatamente o que implementar — não interprete livremente.

**Variações que o catálogo define com precisão:**

| Família | Variações |
|---|---|
| Table | Básica · Com Interações (sort/select) · Com Expansão · Data Grid avançada |
| Card | Resumo · Informativo · Interativo |
| Select | Base · Com Busca · Multi · Async · Combobox |
| Date Picker | Single · Range · Date Time |
| Upload | Campo simples · Dropzone · Multi-arquivo |
| Overlay | Drawer · Modal · Dialog · AlertDialog · Popover |

---

## Passo 3 — Criar o arquivo do protótipo

Crie `src/proto/<slug-da-tela>.tsx`. Estrutura padrão:

```tsx
// PROTO: <Nome da Tela> — <slug do px-request>
// Descartável. Não é código de produção.
// Aprovado em: [data de aprovação]

import { useState } from "react"
// Importar componentes reais do projeto
// ex: import { Table, TableBody, ... } from "@/components/ui/table"

// ── Mock data (Bloco 4 do px-request) ─────────────────────────
const MOCK_ITEMS = [
  // valores realistas, não lorem ipsum
]

// ── Switcher de estado (só no proto) ──────────────────────────
type Estado = "default" | "loading" | "empty" | "error" // ajustar ao B7

export function ProtoNomeDaTela() {
  const [estado, setEstado] = useState<Estado>("default")

  return (
    <div className="min-h-screen bg-background">
      {/* Barra de estado — visível só neste proto */}
      <div className="flex items-center gap-2 px-4 py-2 bg-muted text-xs text-muted-foreground border-b">
        <span>Estado proto:</span>
        {(["default", "loading", "empty", "error"] as Estado[]).map((e) => (
          <button
            key={e}
            onClick={() => setEstado(e)}
            className={`px-2 py-1 rounded border text-xs ${
              estado === e
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border bg-transparent"
            }`}
          >
            {e}
          </button>
        ))}
      </div>

      {/* Conteúdo da tela */}
      <div className="p-8">
        {estado === "loading" && <EstadoLoading />}
        {estado === "empty" && <EstadoEmpty />}
        {estado === "error" && <EstadoError />}
        {estado === "default" && <EstadoDefault />}
      </div>
    </div>
  )
}

function EstadoDefault() {
  // Implementar a variação exata com componentes reais
  return null
}

function EstadoLoading() {
  // Skeleton que preserva o layout (Skeleton do shadcn)
  return null
}

function EstadoEmpty() {
  // Mensagem + CTA (nunca tela morta)
  return null
}

function EstadoError() {
  // Mensagem explicando como resolver + ação de recuperação
  return null
}
```

### Regras de implementação

- **Componentes reais do shadcn** — nunca reimplementar o que já existe em `src/components/ui/`
- **Tokens via classes Tailwind** — `bg-primary`, `text-foreground`, `border-border` etc. Nunca hex hardcoded.
- **Inline style só para valores dinâmicos** — cor de progresso, largura calculada. Layout estático sempre em classes.
- **Espaçamento em múltiplos de 8px** — usar as classes Tailwind: `p-2`(8) / `p-4`(16) / `p-6`(24) / `p-8`(32) / `p-12`(48).
- **Ícones via Lucide** — `import { NomeIcone } from "lucide-react"`, prop `size` em 16/20/24.
- **Mock data realista** — nomes, datas, valores plausíveis. Sem "Lorem Ipsum", sem "Usuário 1".
- **Switcher de estado obrigatório** — o PX não pede "mostra o estado vazio"; ele já está no topo.
- **Sem scroll horizontal** — se tabela não cabe, colapsar colunas secundárias.
- **Um overlay por vez** — drawer dispara modal/dialog; nunca empilhar.
- **Nenhum `uppercase` em texto** — hierarquia via `font-medium` / `font-semibold`.

---

## Passo 4 — Registrar a rota do proto (para navegar no localhost)

Para acessar o proto no localhost, registre uma rota temporária. O método depende do roteador do projeto:

**React Router (Vite SPA):** adicione em `src/main.tsx` ou `src/router.tsx` uma rota `/proto/<slug>` apontando para o componente.

**TanStack Start / file-based routing:** crie `src/routes/proto/<slug>.tsx` exportando o componente como default — a rota aparece automaticamente.

Em ambos os casos, a rota é descartável e será removida junto com `src/proto/` quando o proto for aprovado e o trabalho migrar para a implementação real.

Após registrar, informe a URL: *"Proto disponível em `localhost:PORT/proto/<slug>` — abrindo no navegador."*

---

## Passo 5 — Abrir no navegador e apresentar ao PX

Abra `localhost:PORT/proto/<slug>` no navegador (via `preview_start` ou navegador já aberto). Confirme:
- Renderizou sem erro no console?
- Switcher de estado funciona em todos os estados do B7?
- Componentes visuais corretos (tokens, tipografia, radius aplicados)?

Apresente: *"Proto da tela [X] aberto no localhost — [N] estados no switcher. Revise e me diga o que ajustar."*

---

## Passo 6 — Ciclo de ajuste (iterativo, com HMR)

O PX revisa e pede mudanças. Para cada rodada:

1. Ouça o ajuste
2. Edite `src/proto/<slug>.tsx`
3. HMR aplica em tempo real — não é necessário recarregar
4. O PX vê o resultado e pede mais ou aprova

**Tipos comuns de ajuste:**
- Hierarquia visual (peso, tamanho, espaçamento)
- Copy de labels, botões, mensagens de estado
- Layout de colunas ou disposição de ações
- Comportamento de estado (skeleton diferente, copy do empty, ação de recuperação do error)
- Densidade (compactar/expandir)
- Responsivo (reduzir viewport no navegador para testar mobile)

Cada ajuste é aplicado direto, sem perguntar — o PX vê e decide.

---

## Passo 7 — Aprovação e encerramento

Quando o PX aprovar:

1. Adicione a data de aprovação no comentário do topo do arquivo: `// Aprovado em: YYYY-MM-DD`
2. **Atualize o `PX-PROGRESS.md`** — marque o proto como aprovado, registre `src/proto/<slug>.tsx`
3. **Eco final:**
   > *"Proto de [tela] aprovado. Arquivo em `src/proto/<slug>.tsx`. A rota `/proto/<slug>` pode ser removida quando iniciar a implementação real. Próximo passo: `px-story` — quer seguir?"*

O arquivo `src/proto/<slug>.tsx` permanece como **referência visual** para o dev que vai implementar a tela real. Quando a implementação estiver concluída, o proto e sua rota são deletados.

---

## Onde fica

`src/proto/<slug-da-tela>.tsx` (no boilerplate, temporário)

---

## Regras

- **Nunca gerar sem px-request aprovado** — spec incompleta gera proto errado.
- **Variação do catálogo é lei** — se a variação definida não existe no catálogo, é gate ⚠️ — parar e resolver.
- **Componentes reais, não reimplementações** — usar `src/components/ui/` sempre que existir o componente.
- **Switcher de estado é obrigatório** — cobrir todos os estados do B7 da spec.
- **HMR é o fluxo** — nenhuma necessidade de recarregar; edite e o PX vê na hora.
- **Proto não é código de produção** — não otimizar, não generalizar, não criar abstrações. É referência visual descartável.
- **Rota descartável** — registrar em `/proto/*`, remover com o arquivo quando a implementação real estiver pronta.

---

## Relação com o fluxo

```
px-request (spec textual aprovada)
    ↓
px-proto  ←  você está aqui
    │   (Vite + localhost + componentes reais + HMR)
    ├── iterações de ajuste com HMR
    │
    └── [aprovado pelo PX]
          ↓
      px-story (história + BDD da tela aprovada visualmente)
          ↓
      [px-preview — opcional, decide como compartilhar com PO/stakeholders]
          ↓
      px-handoff (DoD + sprint → devs)
```

> `px-proto` é **obrigatório** — nenhuma tela vai para `px-story` sem validação visual no localhost. O `px-preview` é **opcional** — decide o formato de compartilhamento externo (HTML standalone, Netlify, link), não constrói nada novo.

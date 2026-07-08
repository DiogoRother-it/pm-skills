# UI KIT — <Projeto>

**Origem:** kickoff do projeto (`px-kickoff`) · **Data:** <YYYY-MM-DD>
**Status:** rascunho | aprovado | aplicado ao `index.css`

> Identidade visual DESTE projeto sobre a biblioteca universal. Gerado a partir dos
> inputs do líder e validado por ele. Fonte dos valores que vão para `src/index.css`.

## Inputs recebidos
- **Cores da marca:**
- **Tom da identidade:**
- **Referências:**
- **Restrições:** (contraste/acessibilidade, modo escuro?)

## 1. Paleta
| Token | Valor (hex/oklch) | Uso | Contraste AA |
|---|---|---|---|
| `--primary` | | ação principal | |
| `--primary-foreground` | | texto sobre primary | |
| `--success` / `--warning` / `--danger` / `--info` | | semânticas | |
| neutros (`--background`, `--foreground`, `--muted`, `--border`) | | superfícies/texto | |

## 2. Tipografia
- **Família:**
- **Escala:** (ex: 12 / 14 / 16 / 20 / 24 / 32)
- **Pesos:** (ex: 400 / 500 / 600)

## 3. Radius
- `--radius`: (valor único; a biblioteca inteira lê essa variável)

## 4. Espaçamento
- Grid base: 8px (4px = mínimo permitido). Confirmar aderência.

## 5. Estados
- Disabled = cinza real (`gray-100` fundo / `gray-400` texto), nunca opacidade.
- Focus ring, hover: derivar da paleta acima.

## Contraste (acessibilidade)
- [ ] Primary e semânticas verificadas em AA sobre os fundos

## Materialização
- [ ] Aprovado pelo líder UX/PX
- [ ] Tokens aplicados em `src/index.css`
- [ ] `uikit-<projeto>.html` gerado (paleta + tipografia + componentes-chave vestidos)
- [ ] Conferido no preview

## Premissas (respostas "não sei" + default assumido)
-

<!-- Salvar em: planning/<projeto>/ui-kit.md -->

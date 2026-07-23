#!/usr/bin/env node
// Instalador da cadeia de skills de Product Management (PM) da Central IT.
// Uso: rodar DENTRO do repo alvo (o diretório de trabalho vira o destino).
//   npx github:DiogoRother-it/pm-skills
// ou, após publicar no npm:
//   npx @centralit/pm-skills

import { fileURLToPath } from "node:url"
import { dirname, join, relative } from "node:path"
import {
  cpSync, existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync, statSync,
} from "node:fs"

const PKG = dirname(fileURLToPath(import.meta.url))
const TARGET = process.cwd()

const c = { g: "\x1b[32m", y: "\x1b[33m", b: "\x1b[36m", d: "\x1b[2m", x: "\x1b[0m" }
const log = (m) => console.log(m)
const ok = (m) => log(`${c.g}✓${c.x} ${m}`)
const info = (m) => log(`${c.b}·${c.x} ${m}`)

log(`\n${c.b}Instalador de skills PM — Central IT${c.x}`)
log(`${c.d}destino: ${TARGET}${c.x}\n`)

// Ordem canônica da cadeia (só para exibição no final).
const CHAIN = [
  "pm-context", "pm-discovery", "pm-market", "pm-competitive", "pm-research",
  "pm-strategy", "pm-objective", "pm-proto", "pm-viability", "pm-ai-gate",
  "pm-ai-approach", "pm-ai-evals", "pm-architecture", "pm-prd", "pm-gtm",
  "pm-roadmap", "pm-brief", "pm-heritage", "pm-retrospective", "pm-stakeholder",
  "pm-sunset", "pm-update",
]

// Skills PM → <target>/.claude/skills/  (só as pastas pm-*)
const skillsSrc = join(PKG, "skills")
const skillsDest = join(TARGET, ".claude", "skills")
mkdirSync(skillsDest, { recursive: true })
let nSkills = 0
for (const name of readdirSync(skillsSrc)) {
  if (!name.startsWith("pm-")) continue
  const src = join(skillsSrc, name)
  if (!statSync(src).isDirectory()) continue
  cpSync(src, join(skillsDest, name), { recursive: true })
  nSkills++
}
ok(`${nSkills} skills PM instaladas em ${relative(TARGET, skillsDest) || ".claude/skills"}`)

// CLAUDE.md — aponta pm-context como portão de entrada obrigatório.
const claudeMd = join(TARGET, "CLAUDE.md")
const pointer = "\n## Skills PM\n\nToda iniciativa de produto começa pela skill roteadora **`pm-context`** " +
  "(menu `/pm-context` no Claude Code). Ela classifica o contexto e decide qual skill PM rodar a seguir. " +
  "Nunca pule esse portão de entrada.\n"
if (existsSync(claudeMd)) {
  const cur = readFileSync(claudeMd, "utf8")
  if (!cur.includes("pm-context")) {
    writeFileSync(claudeMd, cur.trimEnd() + "\n" + pointer)
    ok("CLAUDE.md atualizado com ponteiro para pm-context")
  } else {
    info("CLAUDE.md já referencia pm-context")
  }
} else {
  writeFileSync(claudeMd, `# CLAUDE.md${pointer}`)
  ok("CLAUDE.md criado com ponteiro para pm-context")
}

log(`\n${c.g}Pronto.${c.x} Abra o Claude Code neste repo e comece por ${c.b}/pm-context${c.x}.`)
log(`${c.d}A cadeia completa (o roteador chama o resto conforme o contexto):${c.x}`)
log(`${c.d}  ${CHAIN.map((s) => "/" + s).join(" · ")}${c.x}\n`)

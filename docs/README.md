# `docs/` — static site + maintainer notes

## Structure (easy to maintain)

| What | Files | Notes |
|------|--------|--------|
| **Published docs UI** | `index.html`, `legal.html`, `style.css`, `script.js` | Main docs + simple privacy/license page. Preview: `npx serve docs -p 3000`. Assets: `logo.png` / `logo.jpg`, `favicon.ico`. |
| **Claude skill (source of truth)** | `skills/skewx/SKILL.md`, `skills/skewx/reference.md` | Relative to repo root. Skill must keep YAML frontmatter on `SKILL.md`. |
| **Repo landing** | `README.md` (root) | Install, commands, overview |

**Rule:** Do not copy WebSocket tables or long formulas into extra markdown here — update **`skills/skewx/reference.md`** (URLs, subs, symbols) and **`skills/skewx/SKILL.md`** (formula, pipeline, use cases). Then align **`docs/index.html`** if the public wording should match.

## Editing workflow

1. Change technical detail → `skills/skewx/*.md` first.  
2. Change marketing / navigation / layout → `index.html` + `style.css` + `script.js` (search index lives in `script.js`).  
3. Change install one-liners → root `README.md`.

Older split pages (`intro.md`, `formula.md`, `dex-reference.md`, etc.) were removed so content does not drift across many files.

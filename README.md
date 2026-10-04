# HOME

Osobný repozitár používateľa [kristianmoreee](https://github.com/kristianmoreee).

## Obsah

- `.claude/skills/` – skilly UI/UX Pro Max pre Claude Code.
- `.mcp.json` – konfigurácia MCP servera [21st.dev](https://21st.dev) (Magic).

## 21st.dev MCP server

Server je definovaný v `.mcp.json`, takže ho Claude Code načíta v každej
session (lokálne aj v cloude). API kľúč v repozitári **nie je** – číta sa
z premennej prostredia `TWENTYFIRST_API_KEY`:

```json
"headers": { "x-api-key": "${TWENTYFIRST_API_KEY}" }
```

### Nastavenie v cloudovom prostredí (claude.ai/code, Projects)

1. Otvor nastavenia cloudového prostredia (Project settings → Cloud
   environment → ozubené koliesko pri vybranom prostredí).
2. Pridaj premennú prostredia `TWENTYFIRST_API_KEY=<tvoj kľúč z 21st.dev>`.
3. V **Network access** zvoľ *Custom*, ponechaj predvolený zoznam a do
   *Allowed domains* pridaj `21st.dev` (inak proxy spojenie zablokuje).
4. Spusti novú session – server `21st` sa pripojí automaticky.

Návod: <https://code.claude.com/docs/en/cloud-environments>

### Lokálne

```bash
export TWENTYFIRST_API_KEY=...   # napr. v ~/.zshrc, nie v repozitári
claude
```

Kľúč nikdy necommituj (ani do `.env` – ten je v `.gitignore`).

> **Status:** Draft | **Last validated:** 2026-05-07
>

# Messaging Integration — Business Setup & AI Agent Bridge

**Purpose:** Covers the Messaging Business account configuration, quick replies,
click-to-chat implementation, CRM pipeline, and AI Agent bridge for automated
conversations.

**Last updated:** 2026-04

**Cross-references:** `email-sequences.md`,
`/root/nexa-paraguay/docs/08-integrations/messaging-ai-bridge.md`,
`/root/nexa-paraguay/site.json` (contact config),
`/root/nexa-paraguay/marketing/messaging-integration.md` (source),
`/root/nexa-paraguay/docs/messaging-ai-integration.md` (source)

---

## 1. Business Account

| Setting | Value |
|---------|-------|
| Business Name | Nexa Paraguay |
| Phone | +595 982 515 138 |
| Category | Legal Services |
| Timezone | PY (UTC-3) |
| Languages | ES primary, EN/NL/DE secondary |

## 2. Click-to-Chat Button — DONE

Implemented at `web/components/sections/messaging-float.tsx`:
- Multi-language (ES/EN/NL/DE/PT)
- Context-aware messages (home, programas, proceso, calculadora, contacto)
- Tracks `messaging_cta_click` event
- Phone from site.json: `595982515138`

## 3. Quick Replies & Automation

Pre-set responses exist for: greeting, after-hours, qualification questions,
program explanation, booking confirmation, calculator follow-up, post-consult,
and final nudge.

**Pipeline labels:** Hot (red), Warm (yellow), Cold (blue), Closed (green),
Booked (purple), Not Interested (gray).

## 4. CRM Integration Flow

```
Messaging -> Webhook -> Supabase -> Lead created/updated
           -> Tag: messaging_lead -> Email sequence triggered
```

Schema: `messaging_conversations` and `messaging_messages` tables in Supabase.

## 5. Response Time Targets

| Lead Type | Target |
|-----------|--------|
| Hot (booked call) | Within 15 min |
| Warm | Within 1 hour |
| Cold | Within 4 hours |

## 6. AI Agent Bridge

An AI agent at `messaging-ai.sunstein.cloud` handles conversations using
DeepSeek AI with per-client memory (LightRAG) and business tools.

**Status:** Not yet connected to the live number. Requires creating an
Evolution API instance, seeding LightRAG with FAQ/pricing, and configuring
AI mode (ventas/soporte/default).

See `/root/nexa-paraguay/docs/08-integrations/messaging-ai-bridge.md` for
detailed integration status.

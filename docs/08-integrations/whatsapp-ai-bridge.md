> **Status:** Draft | **Last validated:** 2026-05-07
>

# Messaging AI Bridge — AI-Powered Chat Agent

**Purpose:** Documents the AI agent integration for Messaging conversations,
using DeepSeek AI with per-client memory (LightRAG) and business tools to
handle client inquiries automatically.

**Last updated:** 2026-04

**Cross-references:**
`/root/nexa-paraguay/docs/06-marketing/messaging-integration.md`,
`/root/nexa-paraguay/docs/messaging-ai-integration.md` (source)

---

## Overview

An AI agent hosted at **messaging-ai.sunstein.cloud** is designed to handle
Messaging conversations for Nexa Paraguay. It uses:
- **DeepSeek AI** for natural language processing
- **LightRAG** for per-client conversation memory
- **Evolution API** instances for Messaging message relay

## What the AI Can Handle

| Area | Examples |
|------|----------|
| Visa questions | Requirements, timeline, cost |
| Service info | Program comparison, pricing |
| Document requirements | List of needed docs, apostille |
| FAQs | Tax questions, safety, schools |
| Scheduling | Booking consultations |

## Integration Steps (Pending)

1. **Create an Evolution instance** for the Nexa Messaging Business number
2. **Seed LightRAG** with: product catalog, FAQ, pricing, policies
3. **Configure AI mode** — `ventas` (sales), `soporte` (support), or `default`
4. **Replace static Messaging number** on the website with the AI-connected number

## API Reference

| Endpoint | Method | Purpose |
|----------|--------|---------|
| /clients | POST | Create a new client instance |
| /clients | GET | List existing clients |
| /health | GET | Health check |

Full documentation: `/root/paragu-ai-builder/docs/messaging-ai-integration.md`

## Current Status

- **Messaging Business account:** Set up (+595 982 515 138)
- **Click-to-chat float:** Implemented on website
- **AI Agent service:** Available at messaging-ai.sunstein.cloud
- **Connection to live number:** NOT yet established
- **LightRAG seeding:** NOT yet done
- **AI mode:** Not yet configured

## Next Steps

1. Provision an Evolution API instance for the Nexa number
2. Upload the FAQ, pricing page, and program docs as RAG seed data
3. Set AI mode to `ventas` for automated qualification and booking
4. Test with a sandbox number before switching live

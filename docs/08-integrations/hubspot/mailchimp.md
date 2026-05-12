> **Status:** Implemented, credentials pending | **Last validated:** 2026-05-12
>

# Mailchimp — Email Marketing Integration

**Purpose:** Manages email newsletter subscribers and sends automated nurture
campaigns via Mailchimp Customer Journeys.

**Last updated:** 2026-05-12

**Cross-references:** `hubspot.md`, `../analytics/ga4.md`, `src/app/api/subscribe/route.ts`, `docs/06-marketing/content/email-sequences.md`

---

## Status

The subscribe API route exists at `src/app/api/subscribe/route.ts`. It uses `MAILCHIMP_API_KEY` and `MAILCHIMP_LIST_ID`. If `MAILCHIMP_API_KEY` is missing, it logs the subscription and returns success.

## Runtime Environment

```text
MAILCHIMP_API_KEY=<mailchimp-api-key>
MAILCHIMP_LIST_ID=<mailchimp-list-id>
```

## Setup Steps

1. Create a free account at mailchimp.com
2. Go to Audience > Manage Audience > Settings
3. Find your **Audience ID** (in URL or under "Audience name and defaults")
4. Generate an **API Key** (Account > Extras > API Keys)

## To Complete

```
Mailchimp Audience ID:  audience-_________
Mailchimp API Key:      __________________
```

## Nurture Sequence

A 7-email nurture sequence is defined in `/root/nexa-paraguay/email-nurture.json`
spanning 35 days. Import as a Customer Journey triggered by tag
`nexa-paraguay-lead`.

### Email Schedule (4-locale: nl/en/de/es)

| Day | Subject (EN) |
|-----|-------------|
| 0   | Thank you for your interest in Paraguay |
| 3   | What makes Paraguay different |
| 7   | Our process, step by step |
| 12  | Everything in one trip — how it works |
| 18  | What no one tells you about banking in Paraguay |
| 25  | Which program is right for you? |
| 35  | Ready for the next step? |

## Implementation

Implemented:
- `POST /api/subscribe`
- Validates email contains `@`
- Upserts subscriber through the Mailchimp member endpoint
- Uses `FNAME` and `MMERGE3` for name and locale
- Treats already-subscribed responses as success
- Logs fallback when API key is absent

Still pending:
- Replace placeholder list ID with the real Mailchimp audience/list ID
- Import or rebuild the nurture sequence in Mailchimp Customer Journeys
- Confirm merge field names in the real audience match `FNAME` and `MMERGE3`

# Mailchimp — Email Marketing Integration

**Purpose:** Manages email newsletter subscribers and sends automated nurture
campaigns via Mailchimp Customer Journeys.

**Last updated:** 2026-04

**Cross-references:** `hubspot.md`, `ga4.md`,
`/root/nexa-paraguay/email-nurture.json` (sequence data),
`/root/nexa-paraguay/docs/06-marketing/email-sequences.md`,
`/root/nexa-paraguay/docs/integration-setup-guide.md` (source),
`/root/nexa-paraguay/site.json` (config)

---

## Status

Audience ID is pre-filled in site.json. API key and actual connection pending
client credentials.

## site.json Config

```json
{
  "mailchimp": {
    "audienceId": "audience-paragu-ai-newsletter"
  }
}
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

Once credentials are received:
- Add subscribe endpoint for newsletter signup on Resources page
- Import the JSON nurture sequence as a Customer Journey
- Estimated time: 2-3 hours

> **Status:** Current | **Last validated:** 2026-05-07
>

# Lead Magnets — Capture & Convert

**Purpose:** Specifies the 4 lead magnets, their user flow, implementation
details, and tracking schema used to capture email leads for the nurture
sequence.

**Last updated:** 2026-04

**Cross-references:** `email-sequences.md`, `faq-dealclosing.md`,
`/root/nexa-paraguay/marketing/lead-magnets.md` (source)

---

## Strategy

Lead with the tax calculator. It is interactive, personalizable, and delivers
immediate value. Everything else is secondary.

## Lead Magnet 1: Tax Savings Calculator (Primary)

- **Name:** "Paraguay Tax Savings Calculator"
- **Format:** Interactive web tool + PDF report (email-gated)
- **Capture:** Email required for full PDF
- **CTA flow:** Calculate My Savings -> Book Consultation

**User flow:**
1. Landing: "See how much you could save with Paraguay's 10% IRE"
2. Inputs: Country, annual income (20K-500K+), income type, shares?, foreign income?
3. Real-time comparison: current tax vs potential, annual + 5-year savings
4. PDF report delivered by email triggers Sequence A

**PDF sections:** Tax comparison, math explanation, process overview, next steps.

## Lead Magnet 2: Tax Guide PDF (Secondary)

- **Name:** "2026 Paraguay Tax Guide: Everything You Need to Know"
- **Format:** 12-15 page PDF
- **Chapters:** IRE explained, territorial system, country comparisons, exit tax, banking, process, FAQs

## Lead Magnet 3: Residency Document Checklist (Tertiary)

- **Format:** Interactive checklist (Notion-style or PDF)
- **Email capture:** Optional

## Lead Magnet 4: First 30 Days Guide (Post-Arrival)

- **Format:** PDF checklist
- **No email capture** (free for clients, post-arrival upsell)

## Implementation Priority

| Rank | Magnet | Priority | Timeline |
|------|--------|----------|----------|
| 1    | Tax Calculator | HIGH | Week 1 |
| 2    | Tax Guide PDF | HIGH | Week 2 |
| 3    | Document Checklist | Medium | Week 3 |
| 4    | First 30 Days | Low | Week 4 |

## Tracking Events

| Event | Where | Purpose |
|-------|-------|---------|
| `lead_magnet_view` | Landing page | Top of funnel |
| `lead_magnet_start` | Calculator started | Intent signal |
| `lead_magnet_complete` | Calculation done | High intent |
| `lead_magnet_pdf_download` | PDF requested | Email capture |
| `lead_magnet_cta_click` | "Book Consultation" | Conversion |

## Supabase Schema

```sql
CREATE TABLE lead_magnet_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT, first_name TEXT, country_of_residence TEXT,
  annual_income_estimate TEXT, income_type TEXT,
  has_company_shares BOOLEAN, has_foreign_income BOOLEAN,
  calculated_savings DECIMAL, source TEXT DEFAULT 'tax_calculator',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

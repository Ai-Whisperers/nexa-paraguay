# Email Sequences — Automated Nurture & Post-Consultation

**Purpose:** Defines the 2 primary automated email sequences (A: Tax-Driven
Interest, B: Post-Consultation) plus the 7-email nurture JSON used by Mailchimp.

**Last updated:** 2026-04

**Cross-references:** `lead-magnets.md`, `faq-dealclosing.md`,
`/root/nexa-paraguay/email-nurture.json`, integration guide (Mailchimp setup)

---

## Overview

Rather than 4 separate sequences, we consolidate to 2 high-impact sequences
that cover 90% of use cases. All content is multi-locale (EN/ES/NL/DE).

## Sequence A: Tax-Driven Interest

**Trigger:** Form submission or lead magnet download
**Duration:** 5 emails over 14 days

| #  | Day | Subject (EN) | Focus |
|----|-----|-------------|-------|
| 1  | 0   | "Your Paraguay tax analysis is ready" | Welcome, intro to territorial system |
| 2  | 3   | "What you could save — real numbers" | Tax comparison table (100K income) |
| 3  | 7   | "8-12 weeks. One trip. Here's how." | Process walkthrough |
| 4  | 10  | "What clients say after 12 months" | Social proof, testimonials |
| 5  | 14  | "Let's talk — no pressure" | Summary + final CTA |

**Tags:** Sequence A triggered by `nexa-lead` tag.

## Sequence B: Post-Consultation

**Trigger:** Consultation booking
**Duration:** 4 emails over 10 days

| #  | Day | Subject (EN) | Focus |
|----|-----|-------------|-------|
| 1  | 0   | "Thanks for the call — here's your summary" | Recap + next steps |
| 2  | 2   | "Your personalized Paraguay plan" | Tailored tax/savings breakdown |
| 3  | 5   | "Getting started — document checklist" | Required docs + timeline |
| 4  | 10  | "Still the right fit?" | Final nudge, urgency |

**Tags:** Sequence B triggered by `nexa-consultation` tag.

## Mailchimp Nurture JSON (7-Email)

File: `/root/nexa-paraguay/email-nurture.json`

A 7-email alternative nurture sequence (35-day span) covering:

| Day | Subject (EN) |
|-----|-------------|
| 0   | "Thank you for your interest in Paraguay" |
| 3   | "What makes Paraguay different" |
| 7   | "Our process, step by step" |
| 12  | "Everything in one trip — how it works" |
| 18  | "What no one tells you about banking in Paraguay" |
| 25  | "Which program is right for you?" |
| 35  | "Ready for the next step?" |

All emails are 4-locale (nl/en/de/es). Import into Mailchimp as a Customer
Journey triggered by tag `nexa-paraguay-lead`.

## Personalization Variables

```
{{firstName}}    — from lead data
{{senderName}}   — assigned account manager
{{program}}      — Base/Business/Investor
{{savings}}      — calculated from income input
```

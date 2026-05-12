> **Status:** Implemented, credentials pending | **Last validated:** 2026-05-12
>

# HubSpot — CRM Integration

**Purpose:** Captures contact form submissions, stores leads, and enables
automated email journeys. HubSpot CRM integration with the Nexa Paraguay
website.

**Last updated:** 2026-05-12

**Cross-references:** `mailchimp.md`, `../analytics/ga4.md`, `src/app/api/contact/route.ts`, `site.json`

---

## Status

The contact API route exists at `src/app/api/contact/route.ts`. It posts to the HubSpot Forms API with `CRM_PORTAL_ID` and `CRM_ENDPOINT`. If HubSpot rejects or is unreachable, the route logs the lead payload and returns success so the user-facing form does not fail.

This integration does **not** currently insert into a Supabase `leads` table.

## Runtime Environment

```json
CRM_PORTAL_ID=<hubspot-portal-id>
CRM_ENDPOINT=<hubspot-form-guid>
```

## Setup Steps

1. Sign up for a **Free CRM** account at hubspot.com
2. Navigate to Settings > Tracking & Analytics > Tracking Code
3. Copy your **Hub ID** (numeric portal ID)
4. Create a form: Marketing > Lead Capture > Forms > Embedded form
5. Required fields: First name, Last name, Email
6. Additional fields: Phone, Country of residence (dropdown), Program interest (dropdown), Message
7. Copy the **Form ID** from the embed code

## To Complete

Send these to the dev team:
```
HubSpot Portal ID: _______________
Contact Form ID:   _______________
HubSpot account email: ___________
```

## Implementation

Implemented:
- `POST /api/contact`
- Hourly in-memory rate limit by IP: 10 submissions
- Field mapping: `firstname`, `email`, `phone`, `message`, `program`
- HubSpot context includes IP and referring page
- Fallback logging for failed HubSpot calls

Still pending:
- Replace placeholder portal/form values with real HubSpot IDs
- Decide whether fallback logs should also persist to a database or alert channel
- Confirm HubSpot legal consent fields match the client account configuration

## What HubSpot Handles

- Contact form submissions from all pages
- Lead storage and segmentation
- Tag-based email sequencing (nexa-lead, nexa-consultation)
- Integration with Mailchimp for newsletter sync

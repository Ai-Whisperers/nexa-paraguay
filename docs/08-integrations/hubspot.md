# HubSpot — CRM Integration

**Purpose:** Captures contact form submissions, stores leads, and enables
automated email journeys. HubSpot CRM integration with the Nexa Paraguay
website.

**Last updated:** 2026-04

**Cross-references:** `mailchimp.md`, `ga4.md`,
`/root/nexa-paraguay/docs/integration-setup-guide.md` (source),
`/root/nexa-paraguay/site.json` (config)

---

## Status

Portal and form IDs are pre-filled in site.json but may need updating with
the actual HubSpot account credentials.

## site.json Config

```json
{
  "hubspot": {
    "portalId": "HS-PORTAL-PARAGUAI",
    "formId": "contact-form-paragu-ai"
  }
}
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

Once credentials are received:
- Create contact form component with API route posting to HubSpot
- Connect form submissions to lead magnet downloads and Sequence A trigger
- Estimated time: 2-3 hours

## What HubSpot Handles

- Contact form submissions from all pages
- Lead storage and segmentation
- Tag-based email sequencing (nexa-lead, nexa-consultation)
- Integration with Mailchimp for newsletter sync

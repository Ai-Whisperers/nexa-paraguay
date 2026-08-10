> **Status:** Draft | **Last validated:** 2026-05-07
>

# Google Analytics (GA4) — Analytics Integration

**Purpose:** Tracks website visitors, page views, conversions, lead magnet
events, and ad performance for the Nexa Paraguay website.

**Last updated:** 2026-04

**Cross-references:** `hubspot.md`, `mailchimp.md`,
`/root/nexa-paraguay/docs/integration-setup-guide.md` (source),
`/root/nexa-paraguay/site.json` (config)

---

## Status

A GA4 measurement ID is configured in site.json. Client needs to verify the
property exists and data is flowing.

## site.json Config

```json
{
  "analytics": {
    "ga4": {
      "measurementId": "G-XE49GLEP34",
      "streamName": "nexa-paraguay"
    }
  }
}
```

## Setup Steps

1. Go to https://analytics.google.com and sign in with the Nexa Google account
2. Create a new property named "Nexa Paraguay Website"
3. Reporting time zone: **America/Asuncion**
4. Currency: **USD**
5. Select Web platform
6. Website URL: https://nexaparaguay.com
7. Copy the Measurement ID (format: G-XXXXXXXXXX)

## What We Track

| Event | Purpose |
|-------|---------|
| `page_view` | Standard page views |
| `lead_magnet_view` | Landing page reached |
| `lead_magnet_start` | Calculator interaction started |
| `lead_magnet_complete` | Calculation completed |
| `lead_magnet_pdf_download` | PDF report requested |
| `lead_magnet_cta_click` | "Book Consultation" clicked |
| `messaging_cta_click` | Messaging button clicked |
| `testimonial_view` | Testimonials section viewed |
| `testimonial_video_play` | Video testimonial played |
| `form_submission` | Contact form submitted |

## Next Steps

- Verify data appears in GA4 dashboard
- Set up conversion events for lead_magnet_cta_click and form_submission
- Connect GA4 to Google Ads if running campaigns

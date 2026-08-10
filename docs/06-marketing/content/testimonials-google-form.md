# Testimonials Google Form — Setup Guide

## 1. Create the Form

Go to https://forms.google.com and create a new form titled:

**Nexa Paraguay — Client Testimonial**

## 2. Form Description

> Thank you for choosing Nexa Paraguay. We'd love to hear about your experience.
> Your story helps other people make the right decision about relocating to Paraguay.
> This takes about 5 minutes.

## 3. Questions (copy-paste)

### Section 1: Contact & Consent

**Q1 — Full Name**
- Question: "What is your full name?"
- Type: Short answer
- Required: Yes
- Help text: "We'll only use this with your permission — see the consent question below."

**Q2 — Email**
- Question: "Your email address"
- Type: Short answer
- Required: Yes
- Help text: "For verification only — we may email you if we have a follow-up question."

**Q3 — Where are you from?**
- Question: "Your home country"
- Type: Dropdown
- Options: Netherlands, Germany, Belgium, Spain, United Kingdom, Switzerland, Austria, Other
- Required: Yes

**Q4 — Which Nexa program did you use?**
- Question: "Which program did you purchase?"
- Type: Dropdown
- Options: Paraguay Base (Residency only), Paraguay Business (Residency + Company + Bank), Paraguay Investor, Land Acquisition (Compra de Tierras), Other
- Required: Yes

**Q5 — When did you complete your process?**
- Question: "When did you finish your relocation with Nexa?"
- Type: Date
- Required: Yes

### Section 2: Your Experience

**Q6 — Overall rating**
- Question: "How would you rate your experience with Nexa Paraguay?"
- Type: Linear scale (1 to 5)
- Labels: 1 = Poor, 5 = Excellent
- Required: Yes

**Q7 — Would you recommend?**
- Question: "Would you recommend Nexa Paraguay to others?"
- Type: Multiple choice
- Options: Yes / Maybe / No
- Required: Yes

**Q8 — Your testimonial (the quote)**
- Question: "Please share your experience in your own words."
- Type: Paragraph
- Required: Yes
- Help text: "What did Nexa help you with? How did it go? What difference has it made? Write naturally — we'll polish the wording. (100-500 characters)"

**Q9 — Biggest benefit**
- Question: "What was the single biggest benefit of working with Nexa?"
- Type: Multiple choice
- Options: Time savings (everything in one trip), Reduced stress (they handled everything), Expert knowledge (Paraguayan law/tax), Network access (banks, notaries, real estate), Transparency (no hidden costs), Other

**Q10 — Before vs after**
- Question: "How would you describe your situation BEFORE working with Nexa, and AFTER?"
- Type: Paragraph
- Help text: "Optional, but powerful. Example: 'Before, I was overwhelmed by paperwork. After, I had my residency in 10 weeks.'"

### Section 3: Publication Consent

**Q11 — Can we publish your testimonial?**
- Question: "May we publish your testimonial on our website, social media, and marketing materials?"
- Type: Multiple choice
- Options:
  - "Yes, with my full name and country"
  - "Yes, with my first name and country only"
  - "Yes, anonymously (no name displayed)"
  - "No, this is for internal feedback only"
- Required: Yes

**Q12 — Photo permission**
- Question: "Do you consent to using your photo alongside your testimonial?"
- Type: Multiple choice
- Options:
  - "Yes, I will upload a photo"
  - "No photo, text only"
  - "N/A (internal feedback only)"
- Required: Yes

**Q13 — Upload photo (optional)**
- Question: "Upload a photo to accompany your testimonial"
- Type: File upload
- File types allowed: JPG, PNG
- Max file size: 5 MB
- Help text: "A professional headshot or a casual photo in Paraguay. Not required."

**Q14 — Video testimonial interest**
- Question: "Would you be open to a short video call (5 min) to record your testimonial?"
- Type: Multiple choice
- Options: Yes, please contact me / No, text only / Maybe — send me more info

## 4. Form Settings

- Collect email addresses: **Yes** (verification)
- Limit to 1 response: **Yes**
- Shuffle question order: **No**
- Show progress bar: **Yes**
- Confirmation message:

> Thank you! Your testimonial has been received. We'll review it and may reach out if we have questions. Your story helps others make informed decisions about relocating to Paraguay. ¡Gracias!

## 5. Share the Form

Once created, copy the published URL and set it as the testimonial submission link.

**Suggested places to share:**
- Post-delivery follow-up email (30 days after residency card issued)
- Messaging broadcast to completed clients
- Link in email signature for the operations team
- QR code in the physical welcome packet delivered to clients in Asunción

## 6. Response Handling

Responses will appear in the Google Form's Response tab. Export to Google Sheets for ongoing tracking.

**Fields to map from form to `testimonials.json`:**

| Form Field | testimonials.json Field | Notes |
|---|---|---|
| Full Name | `name` | Only if consent allows |
| Home Country | `location` | Prepend to location string |
| Program | `program` | Map to program slug |
| Rating | `rating` | Number 1-5 |
| Testimonial text | `quote` | Core content |
| Consent level | `verified` + `_meta.consent` | Store consent type |
| Photo | `image` | Upload to public/images/testimonials/ |

## 7. Lead Client Targets (from marketing strategy)

Priority order for initial outreach:

1. First 3 clients who complete the 8-12 week program post-launch
2. NL client → tax savings story (highest conversion value)
3. BE client → banking experience (most common pain point)
4. DE client → exit tax planning story
5. Family client → school enrollment / family relocation story

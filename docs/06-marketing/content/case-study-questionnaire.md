# Nexa Paraguay — Client Case Study Questionnaire

## Purpose
Collect detailed case studies from completed clients. Use this guide during a Messaging or video call conversation. The goal is to get a compelling story that prospects relate to.

## Format
Interview via Messaging voice notes or 15-min video call. Record answers in the structured JSON format below.

---

## Section 1: Client Profile

| # | Question | Why we ask | JSON field |
|---|----------|------------|------------|
| 1 | Nombre / Name (with consent level) | Attribution | `name`, `_meta.consent.showFullName` |
| 2 | País de origen / Home country | Segment filtering | `location` (country) |
| 3 | Profesión o industria / Profession | Credibility — "as a software engineer..." | `extraDetails.industry` |
| 4 | Rango de ingresos aprox / Income range | Relatability for tax savings stories | `extraDetails.incomeRange` |
| 5 | Programa Nexa / Which program? | Program filter | `program` (base/business/investor/land) |
| 6 | Cuándo finalizó / When completed? | Timeline context | `_meta.completedDate` |

## Section 2: The Before State (the setup)

| # | Question | What we're looking for |
|---|----------|------------------------|
| 7 | ¿Qué te motivó a considerar Paraguay? | The trigger event (tax burden, cost of living, safety concerns) |
| 8 | ¿Qué habías intentado antes de Nexa? | Failures — "I tried DIY, got stuck for 6 months" |
| 9 | ¿Cuál era tu mayor preocupación? | The fear — "I was worried about bureaucracy / language / safety" |
| 10 | ¿Cómo describirías tu situación ANTES? | One sentence. Use exact words. Powerful for the "before vs after" block |

## Section 3: The Nexa Experience

| # | Question | What we're looking for |
|---|----------|------------------------|
| 11 | ¿Cómo encontraste a Nexa Paraguay? | Attribution channel (Google, referral, LinkedIn) |
| 12 | ¿Qué fue lo que te decidió a contratarnos? | The buying trigger — "the Messaging call with [name]" |
| 13 | ¿Cómo fue el proceso? | Timeline + key milestones |
| 14 | ¿Hubo algún momento "wow"? | A specific moment — "the bank account was opened in 2 days" |
| 15 | ¿Algo que te haya sorprendido gratamente? | Delight — "they picked me up at the airport" |
| 16 | ¿Recomendarías Nexa? ¿Por qué? | NPS + attribution |
| 17 | En una frase: ¿cuál fue el mayor beneficio? | **The quote** — short, punchy, for the hero testimonial |

## Section 4: The After State (the payoff)

| # | Question | What we're looking for |
|---|----------|------------------------|
| 18 | ¿Cómo es tu vida ahora en Paraguay? | Imagery — "I work from my terrace overlooking..." |
| 19 | ¿Cuánto estás ahorrando en impuestos? | **The number** — "$X/year" is the most powerful stat |
| 20 | ¿Qué ha cambiado en tu día a día? | Quality of life — "no more winter coats, fresh fruit daily" |
| 21 | ¿Cómo describirías tu situación AHORA? | One sentence. Contrast with #10. "Before was stress, after is freedom" |

## Section 5: Consent & Media

| # | Question | Options | JSON field |
|---|----------|---------|------------|
| 22 | ¿Podemos publicar tu testimonio? | Full name + country / First name only / Anonymous / Internal only | `_meta.consent.showFullName`, `showCountry` |
| 23 | ¿Foto? | Yes — upload / No | `image` |
| 24 | ¿Video testimonial? | Yes contact me / No / Maybe | `_meta.consent.showVideo` |
| 25 | ¿LinkedIn? (for credibility) | URL | `_meta.linkedIn` |

---

## JSON Template (populate after interview)

```json
{
  "name": "Client Name",
  "location": "Netherlands → Paraguay",
  "rating": 5,
  "quote": "The single sentence quote from Q17. Keep under 200 chars.",
  "program": "business",
  "date": "2026-03",
  "image": "testimonials/client-name.jpg",
  "verified": true,
  "featured": true,
  "extraDetails": {
    "industry": "Software Engineering",
    "incomeRange": "100k-150k",
    "beforeState": "From Q10: their exact words",
    "afterState": "From Q21: their exact words",
    "savingsAmount": 45000,
    "savingsCurrency": "EUR",
    "keyMilestone": "Bank account opened in 2 days",
    "biggestBenefit": "Time savings / Reduced stress / Expert knowledge / Network / Transparency"
  },
  "beforeAfter": {
    "before": "Short sentence before",
    "after": "Short sentence after"
  },
  "_meta": {
    "consent": {
      "showFullName": true,
      "showCountry": true,
      "showVideo": false,
      "showPhoto": true
    },
    "collectionMethod": "messaging",
    "collectionDate": "2026-05",
    "completedProgram": true,
    "linkedIn": "https://linkedin.com/in/..."
  }
}
```

## Outreach Sequence

Use this order for initial case study collection:

1. **Month 1 post-completion:** Messaging text — "How's life in Paraguay? Would you be open to a 5-min chat?"
2. **If yes:** Send the `caso-de-exito-form.html` link to their Messaging
3. **If busy:** "Could you send a voice note answering just 3 questions? (Q7, Q13, Q16)"
4. **After 3 months:** Check in — "Now that you've been settled for a few months, anything new to share?"
5. **Annual update:** "How's your first year in Paraguay been? We'd love to update your story."

# Component Registry — SECTION_MAP (26 Components)

**Status:** Current | **Last Validated:** 2026-05-07  

---

Each component below shows the `section.id` that triggers it, the `content` key pattern it expects, and the exact JSON fields consumed from `es.json`.

## FeaturesSection

**Triggered by:** `features`  
**Content key pattern:** `$PAGE.beneluxDesk`  
**Accesses:** `pageContent.beneluxDesk` or `data` prop  

```json
{
  "title": "string",
  "subtitle": "string",
  "items": [
    {
      "title": "string",
      "description": "string"
    }
  ]
}
```

**Live example:** `home.beneluxDesk`  

---

## FaqSection

**Triggered by:** `faq`  
**Content key pattern:** `$PAGE.faq / $PAGE.full`  
**Accesses:** `pageContent.data` or `data` prop  
**Key fallbacks:** q→pregunta→question→title, a→respuesta→answer→description→body  
**Variant:** accordion  

```json
{
  "items": [
    {
      "q": "string",
      "a": "string"
    }
  ]
}
```

**Live example:** `faqPage.full`  

---

## BlogSection

**Triggered by:** `blog-index`  
**Content key pattern:** `$PAGE.blog / $PAGE.index`  
**Accesses:** `pageContent.data` or `data` prop  

```json
{
  "posts": [
    {
      "slug": "string",
      "title": "string",
      "excerpt": "string",
      "date": "string",
      "image": "string (image key)",
      "coverImage": "string"
    }
  ]
}
```

**Images:**

| Field | Usage |
|-------|-------|
| `posts[].image` | 180px cover <img> (resolved as @img:blog.KEY) |

**Live example:** `blog.index`  

---

## TeamSection

**Triggered by:** `team`  
**Content key pattern:** `$PAGE.team`  
**Accesses:** `pageContent.data` or `data` prop  

```json
{
  "members": [
    {
      "name": "string",
      "role": "string",
      "description": "string",
      "memberImage": "string (@img: prefix)",
      "linkedin": "string"
    }
  ]
}
```

**Images:**

| Field | Usage |
|-------|-------|
| `members[].memberImage` | 80x80 circle <img> |

**Live example:** `aboutPage.team`  

---

## PrivacyAccordion

**Triggered by:** `privacy-accordion`  
**Content key pattern:** `$PAGE.body`  
**Accesses:** `pageContent.data` or `data` prop  
**Key fallbacks:** q→title→pregunta, a→body→description  
**Variant:** accordion  

```json
{
  "items": [
    {
      "q": "string",
      "a": "string"
    }
  ]
}
```

**Live example:** `privacyPage.body`  

---

## GlossarySection

**Triggered by:** `glossary`  
**Content key pattern:** `$PAGE.glossary`  
**Accesses:** `pageContent.data` or `data` prop  
**Key fallbacks:** term→q→title, definition→a→description→body  

```json
{
  "items": [
    {
      "term": "string",
      "definition": "string"
    }
  ]
}
```

**Live example:** `glossaryPage.glossary`  

---

## NewsletterSection

**Triggered by:** `newsletter-signup`  
**Content key pattern:** `resourcesPage.newsletter`  
**Accesses:** `pageContent.data` or `data` prop  
**Variant:** dark-bg  

```json
{
  "title": "string",
  "description": "string",
  "placeholder": "string",
  "buttonText": "string"
}
```

**Live example:** `resourcesPage.newsletter`  

---

## StorySection

**Triggered by:** `story`  
**Content key pattern:** `$PAGE.story`  
**Accesses:** `pageContent.data` or `data` prop  

```json
{
  "title": "string",
  "eyebrow": "string",
  "paragraphs": "string[]"
}
```

**Live example:** `aboutPage.story`  

---

## PillarsSection

**Triggered by:** `pillars`  
**Content key pattern:** `$PAGE.pillars`  
**Accesses:** `pageContent.data` or `data` prop  
**Variant:** dark-bg  

```json
{
  "title": "string",
  "pillars": [
    {
      "title": "string",
      "description": "string",
      "imageUrl": "string (@img: prefix)",
      "bullets": "string[]"
    }
  ]
}
```

**Images:**

| Field | Usage |
|-------|-------|
| `pillars[].imageUrl` | 100px cover <img> |

**Live example:** `whyCountryPage.pillars`  

---

## PageHeroSection

**Triggered by:** `page-hero`  
**Content key pattern:** `$PAGE.hero`  
**Accesses:** `pageContent.data` or `data` prop  
**Variant:** gradient-bg  

```json
{
  "headline": "string",
  "subheadline": "string"
}
```

**Live example:** `Any page hero`  

---

## HighlightSection

**Triggered by:** `highlights`  
**Content key pattern:** `$PAGE.differentiators`  
**Accesses:** `pageContent.data` or `data` prop  
**Variant:** stats-bar  

```json
{
  "items": [
    {
      "value": "string",
      "label": "string",
      "title": "string",
      "description": "string"
    }
  ]
}
```

**Live example:** `aboutPage.differentiators`  

---

## ComparisonSection

**Triggered by:** `comparison-table`  
**Content key pattern:** `$PAGE.matrix / $PAGE.comparison`  
**Accesses:** `pageContent.data` or `data` prop  
**Variant:** table  

```json
{
  "title": "string",
  "columns": "string[]",
  "items": "Record<string,any>[]"
}
```

**Live example:** `qualityOfLifePage.comparison`  

---

## GuidesSection

**Triggered by:** `guides`  
**Content key pattern:** `$PAGE.guides`  
**Accesses:** `pageContent.data` or `data` prop  

```json
{
  "title": "string",
  "subtitle": "string",
  "items": [
    {
      "title": "string",
      "description": "string",
      "fileUrl": "string",
      "ctaText": "string"
    }
  ]
}
```

**Live example:** `resourcesPage.guides`  

---

## BookingEmbedSection

**Triggered by:** `booking-embed`  
**Content key pattern:** `$PAGE.booking`  
**Accesses:** `pageContent.data` or `data` prop  
**Variant:** whatsapp-cta  

```json
{
  "title": "string",
  "subtitle": "string",
  "features": "string[]",
  "ctaText": "string",
  "ctaHref": "string",
  "calendarNote": "string"
}
```

**Live example:** `contactPage.booking`  

---

## ContactDetailsSection

**Triggered by:** `contact`  
**Content key pattern:** `$PAGE.contact`  
**Accesses:** `pageContent.data` or `data` prop  
**Variant:** contact-cards  

```json
{
  "title": "string",
  "whatsapp": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
  "neighborhood": "string",
  "hours": "string|object"
}
```

**Live example:** `contactPage.contact`  

---

## GallerySection

**Triggered by:** `gallery`  
**Content key pattern:** `$PAGE.highlights / $PAGE.gallery`  
**Accesses:** `pageContent.data` or `data` prop  

```json
{
  "title": "string",
  "subtitle": "string",
  "images": [
    {
      "src": "string",
      "alt": "string",
      "caption": "string"
    }
  ]
}
```

**Images:**

| Field | Usage |
|-------|-------|
| `images[].src` | 220px cover <img> |

**Live example:** `processPage.highlights`  

---

## ServicesSection

**Triggered by:** `services`  
**Content key pattern:** `$PAGE.services / $PAGE.detail`  
**Accesses:** `pageContent.data || pageContent` or `data` prop  

```json
{
  "eyebrow": "string",
  "title": "string",
  "groups": [
    {
      "title": "string",
      "subtitle": "string",
      "items": [
        {
          "title": "string",
          "description": "string"
        }
      ]
    }
  ]
}
```

**Live example:** `home.services, servicesPage.detail`  

---

## CtaBanner

**Triggered by:** `cta-banner`  
**Content key pattern:** `$PAGE.finalCta / $PAGE.cta`  
**Accesses:** `pageContent.finalCta` or `data` prop  
**Variant:** gradient  

```json
{
  "title": "string",
  "subtitle": "string",
  "buttonText": "string",
  "buttonHref": "string"
}
```

**Live example:** `home.finalCta`  

---

## HeroSection

**Triggered by:** `hero`  
**Content key pattern:** `$PAGE.hero`  
**Accesses:** `pageContent.hero` or `data` prop  
**Variant:** default  

```json
{
  "headline": "string",
  "subheadline": "string",
  "backgroundImage": "string (@img: prefix)",
  "ctaPrimaryText": "string",
  "ctaPrimaryHref": "string",
  "ctaSecondaryText": "string",
  "ctaSecondaryHref": "string",
  "trustBadges": "string[]"
}
```

**Images:**

| Field | Usage |
|-------|-------|
| `backgroundImage` | CSS background-image |

**Live example:** `home.hero`  

---

## ProcessSection

**Triggered by:** `process-timeline`  
**Content key pattern:** `$PAGE.process`  
**Accesses:** `pageContent.process` or `data` prop  

```json
{
  "eyebrow": "string",
  "title": "string",
  "totalDuration": "string",
  "steps": [
    {
      "number": "int",
      "title": "string",
      "description": "string",
      "duration": "string",
      "image": "{$img: string}"
    }
  ],
  "ctaLabel": "string",
  "ctaHref": "string"
}
```

**Images:**

| Field | Usage |
|-------|-------|
| `steps[].image.$img` | 60x60 <img> |

**Live example:** `home.process`  

---

## ProgramsSection

**Triggered by:** `programs-comparison`  
**Content key pattern:** `$PAGE.programs`  
**Accesses:** `pageContent.programs` or `data` prop  

```json
{
  "eyebrow": "string",
  "title": "string",
  "subtitle": "string",
  "tiers": [
    {
      "name": "string",
      "description": "string",
      "price": "string",
      "priceNote": "string",
      "badge": "string",
      "highlighted": "boolean",
      "included": "string[]",
      "ctaLabel": "string",
      "ctaHref": "string",
      "image": "{$img: string}"
    }
  ]
}
```

**Images:**

| Field | Usage |
|-------|-------|
| `tiers[].image.$img` | 140px cover <img> |

**Live example:** `home.programs`  

---

## StatsSection

**Triggered by:** `stats-counter`  
**Content key pattern:** `$PAGE.stats`  
**Accesses:** `pageContent.stats` or `data` prop  

```json
{
  "items": [
    {
      "value": "string|number",
      "label": "string"
    }
  ]
}
```

**Live example:** `home.stats`  

---

## TaxCalculatorSection

**Triggered by:** `tax-savings-calculator`  
**Content key pattern:** `$PAGE.taxCalculator`  
**Accesses:** `pageContent.taxCalculator` or `data` prop  
**Status:** placeholder  

```json
{
  "title": "string",
  "subtitle": "string"
}
```

**Live example:** `home.taxCalculator`  

---

## TestimonialsSection

**Triggered by:** `testimonials`  
**Content key pattern:** `$PAGE.testimonials`  
**Accesses:** `pageContent.testimonials` or `data` prop  

```json
{
  "eyebrow": "string",
  "title": "string",
  "subtitle": "string",
  "items": [
    {
      "name": "string",
      "role": "string",
      "quote": "string",
      "rating": "int (default 5)",
      "image": "string"
    }
  ],
  "ctaText": "string",
  "ctaHref": "string"
}
```

**Images:**

| Field | Usage |
|-------|-------|
| `items[].image` | 60x60 circle <img> |

**Live example:** `home.testimonials`  

---

## TrustSection

**Triggered by:** `trust-signals`  
**Content key pattern:** `$PAGE.trust`  
**Accesses:** `pageContent.trust` or `data` prop  

```json
{
  "eyebrow": "string",
  "title": "string",
  "items": [
    {
      "title": "string",
      "description": "string",
      "image": "string (@img: prefix)"
    }
  ]
}
```

**Images:**

| Field | Usage |
|-------|-------|
| `items[].image` | 64x64 <img> in card |

**Live example:** `home.trust`  

---

## WhyCountrySection

**Triggered by:** `why-destination`  
**Content key pattern:** `$PAGE.whyCountry / $PAGE.pillars`  
**Accesses:** `pageContent.whyCountry` or `data` prop  
**Variant:** dark-bg  

```json
{
  "eyebrow": "string",
  "title": "string",
  "honestNote": "string",
  "pillars": [
    {
      "title": "string",
      "description": "string",
      "imageUrl": "string (@img: prefix)",
      "bullets": "string[]"
    }
  ]
}
```

**Images:**

| Field | Usage |
|-------|-------|
| `pillars[].imageUrl` | 120px cover <img> |

**Live example:** `home.whyCountry`  

---


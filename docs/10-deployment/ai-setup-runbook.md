# Nexa Paraguay — AI Setup Runbook

## How to create content with Hermes

### Prerequisites
- Hermes agent configured with `multi-source-research` skill
- `client-content-audit` skill for quality checks

### Content creation workflow

1. **Research the topic**
```
/multi-source-research "Paraguay residency requirements for EU citizens 2026"
```
Output: structured report with competitors, keywords, angles.

2. **Generate article for all 4 locales**
```
/content-generate "Residency permit requirements Paraguay 2026" --locales es,en,nl,de
```
Creates `content/blog/{locale}/slug.mdx` for each locale.

3. **Audit quality**
```
/client-content-audit nexa-paraguay
```
Checks: tone consistency, locale parity, SEO tags, internal links.

4. **Preview**
```
npm run dev
```
Open `http://localhost:3000/{locale}/blog/slug.mdx`

5. **Commit and deploy**
```
git add content/blog/
git commit -m "content: article slug in 4 locales"
git push
```

### Best prompts for Nexa content

- **Service page**: "Write content for a new service page about [topic]. Target: [locale]. Tone: professional, warm, trustworthy."
- **FAQ**: "Generate 10 FAQ items about [topic] with {q, a} format. Include terms a reader would actually search."
- **Blog post**: "Write a 2000-word blog post about [topic]. Include intro, 4-5 sections, FAQ, CTA. Target keyword: [keyword]."
- **Translation**: "Translate this to [locale]. Keep the tone, adapt cultural references, don't translate company names."

### Locale workflow

| Locale | Content file | Blog file |
|--------|-------------|-----------|
| Spanish (es) | `content/es.json` | `content/blog/posts.json` |
| English (en) | `content/en.json` | `content/blog/posts-en.json` |
| Dutch (nl) | `content/nl.json` | `content/blog/posts-nl.json` |
| German (de) | `content/de.json` | `content/blog/posts-de.json` |

**es is the master locale.** All translations should start from the Spanish content. For blog posts, the `posts.json` file is the default fallback for es.

### Section management

Each page in `nexa-pages/{slug}.json` defines its sections. Add a new section:
1. Create or modify `{slug}.json` with `{ "sections": [{ "id": "section-name", "content": "path.in.content" }] }`
2. Register the component in `src/components/SectionsRenderer.tsx`
3. Build and deploy

### SEO checklist per article
- [ ] Target keyword in H1, first paragraph, and at least 2 H2s
- [ ] Meta description in JSON frontmatter (if available)
- [ ] Internal link to at least one other page
- [ ] CTA at the end (consultation link)
- [ ] hreflang to all 3 other locales
- [ ] Image with alt text (if applicable)

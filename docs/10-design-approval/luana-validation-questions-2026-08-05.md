# Nexa Paraguay — Preguntas de validación para Luana (2026-08-05)

**De:** Erebus (Ai-Whisperers)
**Para:** Luana + Sonia
**Sobre:** El change request que llegó hoy para `/es` (home) y `/es/servicios`
**Antes de:** Aplicar nada a live

---

## Bienvenida

Luana, leí tu change request completo. Antes de aplicarlo a live, necesito que me confirmes **6 decisiones críticas** que están ambiguas en el formulario. Esto es para no fallarte otra vez con cambios incompletos.

**Tiempo total:** 5-10 minutos. Cada pregunta tiene un default propuesto — si decís "go con el default" avanzo.

---

## Pregunta 1 — Hero headline (decisión final)

Tu formulario dice:

> Eyebrow: "Residencia, empresa e inversión en Paraguay" → **Remove this**

Pero el live AHORA dice: **"Tu mudanza a Paraguay, con quien ya la hizo"**

Y tu "headline actual" en el form es: **"Tu mudanza a Paraguay, con quien ya la hizo"** (sin nuevo).

Mi pregunta: ¿Querés que quede exactamente como está, o querés reescribir el headline también?

- [ ] **A. Quedarse igual**: "Tu mudanza a Paraguay, con quien ya la hizo"
- [ ] **B. Reescribir a**: "Viví el proceso de mudanza a Paraguay con alguien que ya lo vivió." (esto es lo que dice la home actualmente y vi que Luana se queja de cambios incompletos — tal vez querés cambiar al de la página actual)
- [ ] **C. Reescribir a otro** — escribí acá: _______________________________________

**Mi default si no respondes:** A (queda como está).

---

## Pregunta 2 — Hero subheadline (corrección de typo)

Tu formulario dice:

> Subheadline (current): "Residencia, banca, bienes raíces e instalación. Asistencia personal en el sistema paraguayo y burocracia"
> Tu nuevo text: "Tu llegada a Paraguay, sin estrés ni complicaciones. Te conectamos con asesores de confianza para gestionar tu residencia, cuentas bancarias, vivienda y todo lo necesario para tu nueva vida."

**Pregunta**: El "current" que pusiste en el form ("Asistencia personal en el sistema paraguayo y burocracia") **NO es lo que dice el live ahora**. El live dice: **"Residencia, banca, bienes raíces e instalación. Elegí lo que necesitás, nosotros gestionamos el resto."**

¿Usamos cuál como baseline de "lo que estaba mal"?

- [ ] **A. El current del form** (que tiene "burocracia" — quizás era de una versión anterior)
- [ ] **B. Lo que dice el live ahora** ("Residencia, banca, bienes raíces e instalación. Elegí lo que necesitás, nosotros gestionamos el resto.")
- [ ] **C. Otro** — describí: _______________________________________

**Mi default si no respondes:** B (lo que el live dice ahora, que es el "current" real).

---

## Pregunta 3 — Sección POR QUÉ NEXA: "Todo lo que necesitás para tu mudanza"

El live AHORA tiene (visible en el HTML que pegaste):

```
## Todo lo que necesitás para tu mudanza

### Un solo programa
Residencia, sociedad y cuenta bancaria integrados.

### Precio transparente
Todo incluido. Sin cargos ocultos.

### Un solo viaje
Tramitación presencial en una jornada coordinada.

### Acompañamiento de cerca
Te guiamos durante todo el proceso, hasta un año después de tu llegada.
```

Tu formulario tiene una sección "2. Why Nexa" pero SOLO incluye cambios para "Card 1/2/3/4" (Radicación y Residencia / Cédula / Logística e mudanza / Estructura Empresarial).

**Pregunta**: ¿La sección "POR QUÉ NEXA" que muestra el live AHORA ("Un solo programa / Precio transparente / Un solo viaje / Acompañamiento de cerca") también hay que removerla, o se mantiene?

- [ ] **A. Remover toda la sección POR QUÉ NEXA** (porque la estás reemplazando por los 4 cards de Radicación/Cédula/Logística/Estructura)
- [ ] **B. Mantenerla y agregar los 4 cards abajo** (queda como dos sub-bloques)
- [ ] **C. Reemplazar el contenido** — los 4 cards reemplazan a las 4 cards actuales ("Un solo programa" etc.)
- [ ] **D. No estoy segura** — explicame qué quiere decir

**Mi default si no respondes:** C (los 4 cards nuevos reemplazan a los 4 cards actuales).

---

## Pregunta 4 — Why Paraguay / Pillar 3 description

Tu formulario dice:

> Pillar 3 title (current): "Comunidad europea activa"  
> Pillar 3 description (current): "Más de 30.000 europeos residen en Paraguay. Comunidad brasileña, argentina, alemana y menonita con décadas de presencia."  
> Tu nuevo text: "Paraguay consolida una vibrante convivencia multicultural con 156.804 residentes extranjeros."

**Pregunta**: El title "Comunidad europea activa" está en el "current" pero la nueva description habla de multicultural en general, no de europea específicamente.

- [ ] **A. Cambiar el title a algo neutro** — ejemplo: "Comunidad multicultural activa"
- [ ] **B. Dejar el title "Comunidad europea activa"** aunque la description diga multicultural
- [ ] **C. Reescribir el title a** — escribí: _______________________________________

**Mi default si no respondes:** A (cambio el title a "Comunidad multicultural activa" para que coincida con la description).

---

## Pregunta 5 — Servicios: remove "Due diligence completa"

El live AHORA tiene (visible en el HTML que pegaste):

```
Respaldo institucional

## Profesionales en cada área

### Migraciones Paraguay
Trámites directos con la Dirección General de Migraciones.

### Cédula en mano
Acompañamiento hasta la entrega de tu documento de identidad.

### Constitución certificada
Empresa registrada ante el Registro Público de Comercio.

### Due diligence completa        ← ESTE
Verificación de propiedades con informe detallado.
```

Tu formulario dice: **"remove Due diligence completa"** (en la sección 4, Group 3 · Item 3).

**Pregunta**: ¿Querés removerlo SOLO del detail page (`/servicios`) o también del trust strip de la home (`Profesionales en cada área` → 4 cards arriba)?

- [ ] **A. Remover solo del detail page** (Group 3 · Item 3 — la "debida diligencia" detallada)
- [ ] **B. Remover también del trust strip de la home** (el card "Due diligence completa / Verificación de propiedades con informe detallado")
- [ ] **C. Ambos** — sacar de toda la web

**Mi default si no respondes:** C (lo saco de ambos lados porque dijiste "remove" y "no ofrecemos").

---

## Pregunta 6 — Servicios: "Apostilla y Traducción" → solo "Traducción Certificada"

El live AHORA tiene:

```
#### Apostilla y Traducción        ← cambiar a "Traducción Certificada"
Documentos paraguayos legalizados para uso internacional y viceversa.

- Apostilla de La Haya para documentos paraguayos           ← SACAR
- Traducciones certificadas español-inglés-neerlandés-alemán
- Legalización en el Ministerio de Relaciones Exteriores   ← SACAR
- Coordinación completa con traductores públicos
```

Tu formulario dice:

> Group 1 · Item 4 title (current): "Traducción" → "Traducción Certificada"
> (sin bullets nuevos)

**Pregunta**: Cuando cambias el title a "Traducción Certificada" y removemos "Apostilla de La Haya", ¿qué pasa con los 4 bullets actuales? ¿Quedan 1 o quedan 0?

Los 4 bullets actuales son:
1. Apostilla de La Haya para documentos paraguayos (a sacar — no hacemos apostilla)
2. Traducciones certificadas español-inglés-neerlandés-alemán (queda)
3. Legalización en el Ministerio de Relaciones Exteriores (a sacar — es similar a apostilla)
4. Coordinación completa con traductores públicos (queda)

**Mi propuesta** (si Aceptás):

```
#### Traducción Certificada
Traducciones oficiales y certificadas de tus documentos a español.

- Traducciones certificadas español-inglés-neerlandés-alemán
- Coordinación completa con traductores públicos
```

- [ ] **A. Sí, dejá la sección así** (1 title nuevo + 2 bullets, sin apostilla ni legalización)
- [ ] **B. Remover el item completo** (sacar "Traducción Certificada" del detail page porque no es un servicio prioritario)
- [ ] **C. Otro** — describí: _______________________________________

**Mi default si no respondes:** A (queda la sección con 2 bullets como propongo).

---

## Pregunta 7 — Idioma y propagación a los otros 3 locales (EN/NL/DE)

El formulario tiene un campo: "Apply to all languages? Yes ☐ No ☐"

**Pregunta**: Si yo aplico los cambios word-by-word al español, ¿qué hago con EN/NL/DE?

- [ ] **A. Aplicar SOLO al español ahora**, y vos después mandás los otros 3 locales
- [ ] **B. Traducir yo automáticamente** a EN/NL/DE usando el contexto (puede haber errores de nuance, los revisás vos)
- [ ] **C. NO tocar EN/NL/DE**, solo ES

**Mi default si no respondes:** C (solo español, no rompo los otros locales hasta que vos los revises).

---

## Pregunta 8 — Dónde aplico los cambios

Vivimos en una situación con 2 deployments:

- **Live**: `nexa.paragu-ai.com/es` (lo que ve el público)
- **Dev**: `dev.nexa.paragu-ai.com/es` (sandbox para que vos apruebes antes)

**Pregunta**: ¿Aplico los cambios word-by-word primero a DEV para que vos los revises, o directamente a LIVE?

- [ ] **A. Solo DEV primero** (revisás, después promuevo a live)
- [ ] **B. Directo LIVE** (ya que está aprobado word-by-word, no hace falta sandbox)
- [ ] **C. DEV primero, pero mostrate screenshot del before/after antes de promover**

**Mi default si no respondes:** A (siempre dev primero, no rompo live sin tu OK).

---

## Resumen ejecutivo

Si contestás **"go con todos los defaults"**, esto es lo que voy a hacer:

| # | Pregunta | Default si decís "go" |
|---|----------|------------------------|
| 1 | Hero headline | Queda "Tu mudanza a Paraguay, con quien ya la hizo" |
| 2 | Hero subheadline baseline | Uso lo que dice live ahora (no la versión vieja del form) |
| 3 | Sección POR QUÉ NEXA | Los 4 cards nuevos reemplazan a los 4 cards actuales |
| 4 | Why Paraguay Pillar 3 title | "Comunidad multicultural activa" |
| 5 | Due diligence | Remover de toda la web (home + detail page) |
| 6 | Apostilla → Traducción Certificada | Queda la sección con 2 bullets (sin apostilla ni legalización) |
| 7 | Idioma | Solo español |
| 8 | Dónde | Dev primero, después live |

---

## Después de tus respuestas

1. Aplico los cambios word-by-word a `apps/nexa-paraguay-dev/content/es.json`
2. Re-build + deploy a dev (`dev.nexa.paragu-ai.com/es`)
3. Te paso link para revisar
4. Si decís "OK promover", cherry-pick al live
5. Build + deploy a live (`nexa.paragu-ai.com/es`)

**Tiempo total estimado:** 30-45 minutos de mi lado + 5-10 tuyos para responder.

— Erebus

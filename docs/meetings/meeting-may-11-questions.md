# Meeting Prep Completo — 1 Hora con Sonia (May 11, 2026)

> **Propósito:** Extraer TODA la información que falta para el sitio, el modelo de negocio y la estrategia.
> **Formato:** 51 preguntas en 8 bloques. Cada una tiene: contexto de investigación + pregunta exacta + posible respuesta.
> **Tiempo estimado:** 60 min. Priorizar bloques 1-4 si se acaba el tiempo.
> **Documento fuente:** `docs/SOURCE_OF_TRUTH.md`
> **Quién lleva la reunión:** Iván (vos). Sonia escucha y responde.

---

## 🧭 GUÍA RÁPIDA PARA LA REUNIÓN

| Minuto | Bloque | Preguntas clave | Si falta tiempo |
|--------|--------|----------------|-----------------|
| 0-3 | **Apertura** | Contexto de lo que hicimos | No saltear |
| 3-15 | **1. Pricing** | P1-P8 (12 min) | **NO saltear** — desambiguación crítica |
| 15-25 | **2. Competencia** | P9-P14 (10 min) | Saltear si vamos atrasados |
| 25-33 | **3. Tu historia** | P15-P19 (8 min) | NO saltear — contenido del sitio |
| 33-45 | **4. Contenido** | P20-P27 (12 min) | P20-P23 prioritarias |
| 45-53 | **5. Legal/Logística** | P28-P33 (8 min) | P28-P30 solo |
| 53-60 | **6. Estrategia + Cierre** | P34-P39 (7 min) | Que cierre con acciones concretas |

---

## APERTURA (2 min)

### Lo que decís al principio (script sugerido)

> *"Sonia, gracias por el tiempo. Hicimos mucha investigación desde la última charla: analizamos 15 competidores, construimos un modelo financiero, investigamos el mercado de reubicación. Pero TODO se basa en suposiciones. Hoy necesito que vos confirmes, corrijas o rechaces cada una. No importa si no sabés algo — decímelo y lo averiguamos. Arranquemos."*

---

## BLOQUE 1 — PRICING & MODELO DE NEGOCIO (12 min)

### Contexto general para Sonia

> "Sonia, tenemos tres versiones distintas de tus precios. Necesitamos entender cuál es la correcta para actualizar todo."


### P1 — ¿CUÁL ES EL PRECIO REAL DE TU SERVICIO?

**Contexto de investigación:**
En tu audio briefing del 10 de mayo dijiste textual "en ese 1,500 ya está todo incluido" y comparaste con la competencia que cobra $2,800. Pero nuestro modelo financiero (basado en investigación de mercado anterior) tiene los programas a $2,900 / $4,400 / $6,900. También tenemos un FAQ de ventas que dice lo mismo.

**Pregunta exacta:**
> "En tu audio dijiste $1,500. En nuestra investigación previa encontramos $2,900. ¿Son dos cosas diferentes? Por ejemplo: ¿$1,500 es tu honorario y $2,900 es el programa completo con tasas y traducciones? ¿O cambió el precio?"

**Posibles respuestas:**
- **($1,500 es el precio correcto):** El servicio completo de residencia cuesta $1,500. Los $2,900/$4,400/$6,900 del modelo financiero están mal — son estimaciones de investigación de mercado, no datos reales.
- **($2,900 es el precio real):** El $1,500 era un ejemplo o un descuento. El precio real del servicio completo es $2,900 e incluye más cosas.
- **($1,500 = su fee / $2,900 = con tasas):** El modelo es: $1,500 es lo que ella cobra, y con costos/tasas el total llega a ~$2,900.
- **([Otra cosa]):** Escuchar con atención.

**Qué hacer con la respuesta:**
- Actualizar `docs/SOURCE_OF_TRUTH.md` sección 2.1
- Actualizar `docs/09-market-intelligence/financial-model.md` línea 34-40
- Actualizar `docs/06-marketing/faq-dealclosing.md` línea 57-64
- Notificar a los equipos de contenido


### P2 — ¿CÓMO SE ESTRUCTURA TU OFERTA? ¿UN SOLO SERVICIO O VARIOS NIVELES?

**Contexto de investigación:**
En el sitio tenemos 4 programas: Base, Business, Investor, Land — cada uno con duración y alcance distinto. En tu audio solo mencionaste el servicio de $1,500.

**Pregunta exacta:**
> "En el sitio armamos 4 programas: Base, Business, Investor y Compra de Tierras. ¿Vendés así realmente? ¿O tenés 1 servicio principal y después todo es adicional?"

**Posibles respuestas:**
- **Un solo servicio principal** ($1,500 residencia) + add-ons (banco $X, propiedades comisión 2.75%, etc.)
- **Paquetes reales** (Sí, vendo Base/Business/Investor como programas separados)
- **Precio personalizado** (Cada cliente es diferente, no tengo paquetes fijos)

**Qué hacer con la respuesta:**
- Si es un solo servicio → simplificar todo el modelo de programas en el sitio
- Si son paquetes → validar precios de cada uno
- Si es personalizado → cambiar el sitio a "consultá por tu caso"


### P3 — ¿CUÁNTO COBRÁS POR LOS SERVICIOS POST-RESIDENCIA?

**Contexto de investigación:**
Dijiste que el acompañamiento post-residencia (banco, compras, etc.) es "por día de trabajo" para vos y tu chofer, pero que no sabés cuánto cobrar. También mencionaste "si es una llamada, te ayudo gratis, si tengo que movilizarme, hay que cobrar".

**Pregunta exacta:**
> "Para los servicios después de la residencia — banco, médico, compras — ¿querés que te ayudemos a definir precios? ¿O preferís manejarlo caso por caso?"

**Posibles respuestas:**
- **Quiere ayuda:** "Sí, Iván, no sé cuánto cobrar. Ayudame." → Ofrecé: tarifa diaria sugerida $150-250/día (Sonia + chofer), basado en:
  - Competencia cobra $200-400/día por acompañamiento
  - $150/día = accesible, no "abusivo", consistente con su filosofía
  - Medio día = $100
- **Prefiere caso por caso:** "No, prefiero decidir según el cliente y el servicio"
- **No quiere cobrar:** "No quiero cobrar por eso, es parte del servicio" (riesgo: desgaste, sin margen)

**Qué hacer con la respuesta:**
- Si acepta ayuda: agregar pricing recomendado al SOURCE_OF_TRUTH.md
- Si no: documentar como "libre decisión de Sonia, no publicar precios"


### P4 — ¿CUÁNTO GANÁS CON LAS COMISIONES? (PROPIEDADES, ABOGADOS, ETC.)

**Contexto de investigación:**
Dijiste: 2.75% de propiedades (mitad del 5.5% del intermediario), comisión de estudios jurídicos/contables (de su margen, no del cliente), comisión por venta de autos y electrodomésticos. Esto NO está documentado como parte del modelo de ingresos.

**Pregunta exacta:**
> "El modelo de comisiones — propiedades, abogados, autos — es interesante porque es ingreso que no le cuesta más al cliente. ¿Aproximadamente cuánto representa de tus ingresos totales? ¿20%? ¿50%?"

**Posibles respuestas:**
- **Menos del 20%:** "Todavía no me pasó mucho, recién arranco en propiedades"
- **Entre 20-50%:** "Ya tuve algunas propiedades, ayuda bastante"
- **No sabe:** "No llevo cuenta, Iván"

**Qué hacer con la respuesta:**
- Si da un número: actualizar proyecciones del modelo financiero
- Si no sabe: ofrecerse a ayudarle a llevar registro (simple spreadsheet)


### P5 — ¿CUÁL ES TU COSTO REAL DE OPERAR?

**Contexto de investigación:**
Nuestro modelo financiero estima: Legal $5-8K/mes, Marketing $2-4K/mes, Tech $500-1K/mes, Oficina $1-2K/mes.

**Pregunta exacta:**
> "Para el modelo financiero, estimamos costos. Pero son estimaciones de escritorio. ¿Cuánto gastás realmente por mes? ¿Tenés empleados fijos? ¿Cuánto le pagás a tu chofer? ¿A los estudios jurídicos?"

**Posibles respuestas:**
- **Estructura liviana:** "Soy yo nomas. El chofer es por viaje. Los estudios cobran cuando hay cliente."
- **Estructura media:** "Tengo un par de personas part-time. El chofer fijo."
- **No comparte:** "Prefiero no decir, Iván" → Aceptar, no presionar.

**Qué hacer con la respuesta:**
- Si comparte: actualizar `financial-model.md`
- Si no: dejar como estimaciones, marcar como "pendiente de validar"


### P6 — ¿CUÁNTOS CLIENTES REALES ATENDÉS POR MES?

**Contexto de investigación:**
El modelo estima 5-10 clientes/mes, con ticket promedio $4,500. Dijiste haber ayudado a 10 personas en total (no por mes).

**Pregunta exacta:**
> "Ayudaste a 10 personas hasta ahora. ¿En qué período? ¿En un año? ¿En dos? ¿Cuántos clientes nuevos tenés por mes aproximadamente?"

**Posibles respuestas:**
- **1-2 por mes:** Realista para alguien que arranca
- **3-5 por mes:** Buen ritmo
- **Menos de 1 por mes:** "Los 10 fueron en 2 años, más o menos"
- **No sabe:** "No llevo cuenta"

**Qué hacer con la respuesta:**
- Actualizar todas las proyecciones del modelo
- Ajustar las metas del sitio (si son 2/mes, el sitio no necesita escalar a 30/mes)


### P7 — ¿DE DÓNDE VIENEN TUS CLIENTES?

**Contexto de investigación:**
El sitio no está generando leads (recién lanzado). Sospechamos que todo es boca a boca.

**Pregunta exacta:**
> "Tus 10 clientes — ¿cómo te encontraron? ¿Boca a boca? ¿Instagram? ¿WhatsApp? ¿Google? ¿O los conocías de antes?"

**Posibles respuestas:**
- **100% boca a boca:** "Todos me conocen o los refirieron amigos"
- **Instagram/Redes:** Algunos llegaron por La Vieja Holanda u otras redes
- **Comunidad holandesa:** Grupos de Telegram, Facebook de holandeses en Paraguay
- **Google:** Buscaron y la encontraron

**Qué hacer con la respuesta:**
- Define la estrategia de marketing: si es boca a boca → enfocar en testimonios y referidos. Si es Google → SEO. Si es Instagram → contenido visual.


### P8 — ¿CUÁL ES TU CAPACIDAD MÁXIMA? ¿CUÁNTOS CLIENTES PODÉS ATENDER?

**Contexto de investigación:**
Dijiste que acompañás hasta 12 meses. Si tenés 10 clientes simultáneos en diferentes etapas, ¿podés manejar ese volumen?

**Pregunta exacta:**
> "Si el sitio empieza a generar 5-10 leads por mes y cerramos 2-3 clientes — ¿podés con ese volumen? ¿O necesitás ayuda?"

**Posibles respuestas:**
- **Sí, capacity:** "Tranquilo, yo manejo 3-4 por mes sin problema"
- **No, necesito ayuda:** "Si vienen más de 2 por mes, no doy abasto. Necesitaría contratar"
- **Depende:** "Depende del tipo de cliente — familias son más trabajo que inversores"

**Qué hacer con la respuesta:**
- Define el techo del negocio y el roadmap de contratación
- Si necesita ayuda: plan de staffing (asistente, segundo acompañante)


---

## BLOQUE 2 — COMPETENCIA & POSICIONAMIENTO (10 min)

### Contexto general para Sonia

> "Investigamos 15 competidores. Casi todos tienen páginas rotas, no tienen AI, y son en inglés/español solamente. Pero hay algunos que están bien posicionados."


### P9 — ¿CONOCÉS A TUS COMPETIDORES?

**Contexto de investigación:**
Los 5 competidores más relevantes:

| Competidor | Precio | Por qué importa |
|-----------|--------|----------------|
| **WeParaguay** | $1,400-$6,500 | +marca, +servicios, +comunidad. Su página de precios da 404. |
| **Paraguay Sovereign** | $2,290-$5,490 | Buen SEO, calculadora, cripto-friendly. Página de paquetes da 404. |
| **Terravida** (polsia.app) | Sin precio | **Único con AI.** Usan chatbot, posible amenaza. |
| **MigratieMeesters** | No visible | Holandés, comunidad Telegram 400+. Target directo. |
| **Paraguay Adventures** | No visible | 4,920 subs en Telegram. Comunidad grande. |

**Pregunta exacta:**
> "De estos 5 competidores: WeParaguay, Paraguay Sovereign, Terravida, MigratieMeesters, Paraguay Adventures — ¿cuáles conocés? ¿Cuáles te preocupan? ¿Hay alguno que no esté en esta lista?"

**Posibles respuestas:**
- **Conoce algunos/nombra otros:** Anotar qué sabe de cada uno
- **No conoce ninguno:** "No sé, Iván, no miré el mercado"
- **Conoce a todos:** Detalle de su percepción

**Qué hacer con la respuesta:**
- Agregar competidores que Sonia conozca y no tengamos
- Validar o corregir las evaluaciones de amenaza
- Usar su conocimiento para el posicionamiento


### P10 — ¿PERDISTE CLIENTES CON ALGÚN COMPETIDOR?

**Contexto de investigación:**
Sabemos que hay 15+ competidores activos. Si Sonia perdió clientes, es información valiosa sobre qué valora su mercado.

**Pregunta exacta:**
> "¿Alguna vez un cliente te dijo 'encontré algo más barato' o 'fulano me lo hace más rápido'? ¿Cómo respondiste?"

**Posibles respuestas:**
- **Sí, por precio:** Perdió con Low Cost Paraguay ($350) o Move To Paraguay ($1,250)
- **Sí, por velocidad:** Perdió con la agencia de $2,800 que promete 1 mes 20 días
- **No, nunca:** "Todos los que vinieron conmigo se quedaron conmigo"
- **No sabe:** "No pregunto, si se van, se van"

**Qué hacer con la respuesta:**
- Si perdió por precio: fortalecer la propuesta de valor (no competir en precio)
- Si perdió por velocidad: ser honesta en el sitio sobre el timeline 3-6 meses
- Si nunca perdió: usar como testimonio de confianza


### P11 — ¿QUÉ HACEN TUS COMPETIDORES MEJOR QUE VOS?

**Contexto de investigación:**
Nuestro análisis muestra que la mayoría tiene páginas rotas, sin AI, sin equipo visible. Pero algunos hacen cosas bien:

**Pregunta exacta:**
> "Siendo honesta — ¿hay algo que los competidores hagan mejor que vos? ¿Más rápido? ¿Más barato? ¿Con mejor tecnología?"

**Posibles respuestas:**
- **Velocidad:** La competencia de $2,800 promete 1 mes 20 días vs tus 3-6 meses
- **Tecnología:** Terravida tiene chatbot AI (aunque básico)
- **Precio:** Low Cost Paraguay cobra $350
- **Nada:** "No, nadie hace acompañamiento como yo"

**Qué hacer con la respuesta:**
- Las debilidades de Sonia deben manejarse en el contenido del sitio
- Fortalezas → hero y landing
- Debilidades → FAQ (por qué más lento = mejor servicio)


### P12 — ¿CUÁL ES TU CLIENTE IDEAL? ¿A QUIÉN QUERÉS SERVIR?

**Contexto de investigación:**
En la investigación creamos 5 perfiles detallados de clientes. Pero Sonia es clara: prefiere familias. Necesitamos confirmar.

| Perfil | Descripción | ¿Sonia lo atiende? |
|--------|-------------|-------------------|
| **Emprendedor holandés (ZZP)** | 1.2M ZZPers, 20% considerando mudanza | ? |
| **Jubilado alemán 55+** | 230K+ pensionistas fuera de Alemania | ? |
| **Nómada digital belga** | 130K ICT workers, 52.7% tax wedge | ? |
| **Optimizador fiscal UK** | Non-dom abolition, 10,800 millionaires left | ? |
| **Expat USA (FIRE)** | 5.5M Americans abroad, FEIE + 0% PY | ? |
| **Familias** (tu preferencia) | Parejas con hijos, cambio de estilo de vida | ✅ |

**Pregunta exacta:**
> "De estos 6 perfiles — ¿a cuáles atendés? ¿A cuáles querés atender? ¿Hay alguno que NO querés?"

**Posibles respuestas:**
- **Solo holandeses/familias:** "Solo atiendo holandeses, y prefiero familias"
- **Todos menos USAs:** "USA no, es otro sistema (FBAR/FATCA)"
- **Todos:** "A todos, mientras paguen"
- **No sabe:** "Nunca pensé en perfiles, Iván"

**Qué hacer con la respuesta:**
- Redefinir el targeting completo del sitio
- Si solo holandeses: el sitio debe ser NL-first más marcado
- Si también alemanes/belgas: mantener EN/DE
- Si no USA: asegurarse de no tener contenido para USA


### P13 — ¿HAY CLIENTES QUE NO QUERÉS ATENDER?

**Contexto de investigación:**
Dijiste que los inversores te intimidan. ¿Hay otros segmentos que preferís evitar?

**Pregunta exacta:**
> "Además de inversores grandes — ¿hay algún tipo de cliente que NO querés atender? Gente problemática, casos muy complejos, nacionalidades específicas?"

**Posibles respuestas:**
- **Inversores institucionales:** Demasiado complejo, necesita apoyo de Iván
- **Cripto:** No entiende el tema, prefiere evitarlo
- **USA:** Sistema impositivo diferente (FBAR, FATCA)
- **Nacionalidades riesgosas:** Países con requerimientos especiales
- **Ninguno:** "A todos los ayudo mientras sean buena gente"

**Qué hacer con la respuesta:**
- Ajustar targeting y contenido del sitio
- Si evita cripto: no escribir blog posts sobre cripto
- Si evita USA: no tener landing pages para americanos


### P14 — ¿QUÉ HISTORIAS REALES PODÉS COMPARTIR? (PARA EL SITIO)

**Contexto de investigación:**
El sitio no tiene testimonios reales. Sonia tiene 10 clientes pero sin consentimiento firmado.

**Pregunta exacta:**
> "Para el sitio — sin usar nombres ni fotos sin permiso — ¿podés contarme 2-3 historias de clientes reales? ¿Qué problemas tenían? ¿Cómo los ayudaste?"

**Posibles respuestas:**
- **Historia 1:** [Anotar]
- **Historia 2:** [Anotar]
- **Historia 3:** [Anotar]
- **No quiere compartir:** "Prefiero pedir permiso primero"

**Qué hacer con la respuesta:**
- Convertir en case studies anónimos para el sitio
- Si da permiso: pedir que contacte a esos 10 clientes para consentimiento formal de testimonio


---

## BLOQUE 3 — LA HISTORIA DE SONIA (8 min)

### Contexto general para Sonia

> "Tu historia personal es EL diferencial más grande. Nadie más en el mercado tiene tu experiencia viviendo en Holanda y volviendo. Queremos contarla bien."


### P15 — ¿CÓMO CONTAMOS TU HISTORIA EN EL SITIO?

**Contexto de investigación:**
Sabemos que Sonia tuvo un colapso nervioso en Holanda. Es un detalle poderoso pero sensible. La versión PG actual es:

> "Sonia vivió 7 años en Holanda. Llegó sin hablar neerlandés, sin contactos, sin red. Trabajó en música, luego fue mamá. Siempre supo que volvería a Paraguay. Volvió para estar con su mamá."

**Pregunta exacta:**
> "Tu historia en el sitio hoy es linda pero genérica. La parte del colapso nervioso y la reinvención es mucho más poderosa. ¿Querés que la incluyamos? ¿Cómo te sentís compartiendo eso con clientes potenciales?"

**La respuesta ideal (lo que buscar):**
> "Sí, contalo. La gente necesita saber que no soy una oficina de trámites, que entiendo el dolor de emigrar."

**Otras respuestas:**
- **Versión completa:** Incluir colapso + reinvención (más poderoso, más riesgo)
- **Versión PG:** Solo "no era feliz, quería reinventarme" (más seguro, menos potente)
- **Solo versión actual:** Mantener el texto genérico (menos diferencial)

**Qué hacer con la respuesta:**
- Actualizar `content/es.json` sección story (líneas 674-687)
- Actualizar las 4 locales (EN/NL/DE)
- Si permite la versión completa: escribir nuevo draft y que apruebe


### P16 — "RELAX, I CAN HELP YOU": ¿ESLOGAN OFICIAL?

**Contexto de investigación:**
En la charla anterior, cuando le preguntaste por una frase que describa su servicio, Sonia dijo sin dudar: "Relax, I can help you." Es perfecto para el hero.

**Pregunta exacta:**
> "¿Confirmás 'Relax, I can help you' como el eslogan principal del sitio? Lo pondríamos en el hero, en la página principal, en los materiales de marketing."

**Posibles respuestas:**
- **Sí, confirmado:** "Me encanta, ponelo" → Actualizar hero del sitio
- **Sí, pero en español:** "Relájate, yo te ayudo" → Menos universal, decidir
- **Tal vez otra frase:** "Acompañamiento de cerca" o "Tu guía en Paraguay"
- **No estoy segura:** "Déjame pensarlo"

**Qué hacer con la respuesta:**
- Si confirma: cambiar `tagline` en `content/es.json` y todas las locales
- Si duda: dejar el hero actual y dar tiempo


### P17 — ¿CUÁL ES TU FRASE IDENTIDAD PREFERIDA?

**Contexto de investigación:**
Sonia usa varias frases que capturan su esencia:

- "Acompañamiento de cerca" (dicho múltiples veces)
- "Acompañamiento casi familiar" (dicho en el segundo audio)
- "Relax, I can help you" (confirmado en el briefing)
- "Como si fueras de la familia" (implicado)

**Pregunta exacta:**
> "Tenés varias frases lindas: 'acompañamiento de cerca', 'acompañamiento casi familiar', 'Relax, I can help you'. ¿Cuál sentís que te representa más? ¿O querés usar más de una?"

**Posibles respuestas:**
- "Relax, I can help you" para hero / "Acompañamiento de cerca" para About
- Una sola frase principal
- Combinación según contexto

**Qué hacer con la respuesta:**
- Definir la jerarquía de frases para el sitio
- "Relax, I can help you" → hero principal
- "Acompañamiento de cerca" → About + servicios
- "Acompañamiento casi familiar" → testimonios / confianza


### P18 — ¿QUÉ ES LO QUE MÁS ORGULLO TE DA?

**Contexto de investigación:**
Cuando le preguntaste "¿Qué es lo que más orgullo te da de tu trabajo? Decilo como se lo dirías a tu hermana", Sonia respondió: "Lo que más orgullo me da es poder trabajar con Luana." También mencionó orgullo por evitar que estafen a clientes.

**Pregunta exacta:**
> "Esa respuesta sobre Luana es hermosa. ¿Querés que esa frase aparezca en el sitio? ¿O preferís destacar más lo profesional — evitar estafas, propiedades a buen precio?"

**Posibles respuestas:**
- **La de Luana:** "Sí, ponela. Es lo que realmente siento."
- **La profesional:** "Mejor lo de las propiedades, es más profesional para el sitio."
- **Ambas:** "Pone las dos en distintas secciones."

**Qué hacer con la respuesta:**
- Si elige la frase de Luana: ponerla como testimonio principal (sección feedback/trust)
- Si elige propiedades: ponerlo en servicios / About
- Ambas: distribuir en el sitio


### P19 — ¿CÓMO MANEJÁS EL CHOQUE CULTURAL CON TUS CLIENTES?

**Contexto de investigación:**
Sonia dijo que el mayor choque para europeos no es la inseguridad sino la impuntualidad e ineficiencia paraguaya. Su consejo: "Volverse un europeo relajado — mantener su esencia pero adoptar la flexibilidad paraguaya."

**Pregunta exacta:**
> "Eso de 'volverse un europeo relajado' me parece excelente para el sitio. ¿Te parece bien usarlo? ¿O es más algo que decís en privado a los clientes?"

**Posibles respuestas:**
- **Sí, usalo:** "Es un buen consejo, pónganlo en el FAQ"
- **Es privado:** "Mejor no, queda como que Paraguay es desorganizado"
- **Tal vez:** "Dejame pensar cómo decirlo sin sonar mal"

**Qué hacer con la respuesta:**
- Si acepta: agregar al FAQ "¿Cuál es el mayor choque cultural?" con esa respuesta
- Si no: mantenerlo como consejo interno para sus conversaciones


---

## BLOQUE 4 — CONTENIDO DEL SITIO & ESTRATEGIA DIGITAL (12 min)

### Contexto general para Sonia

> "El sitio está armado pero tiene contenido genérico que escribimos nosotros asumiendo lo que necesitás. Queremos reemplazarlo con cosas reales."


### P20 — ¿VISTE EL SITIO? ¿QUÉ TE PARECE?

**Contexto de investigación:**
En la charla anterior Sonia dijo: "No puedo agregar mucho a la página todavía, Iván." No ha dado feedback real.

**Pregunta exacta:**
> "¿Tuviste tiempo de mirar el sitio? nexa.paragu-ai.com/nl ¿Qué te gustó? ¿Qué no te gustó? ¿Se lo mostraste a alguien?"

**Posibles respuestas:**
- **No lo vi:** No ha tenido tiempo (realista, probable)
- **Lo vi, me gusta:** Feedback positivo
- **Lo vi, no me gusta X:** Detalles específicos
- **Se lo mostré a un cliente/amigo:** Feedback de terceros

**Qué hacer con la respuesta:**
- Si no lo vio: agendar un walkthrough juntos durante la reunión o después
- Si tiene feedback: implementar
- Si lo mostró a alguien: incorporar ese feedback


### P21 — ¿QUÉ DEBERÍA VER UN CLIENTE NUEVO PRIMERO?

**Contexto de investigación:**
El sitio tiene muchas páginas. No sabemos cuál es la más importante desde la perspectiva de Sonia.

**Pregunta exacta:**
> "Si un holandés llega a tu sitio por primera vez — ¿qué querés que vea primero? ¿Tu historia? ¿Los servicios? ¿Por qué Paraguay? ¿El proceso?"

**Posibles respuestas:**
- **Tu historia (About):** "Que me conozcan primero"
- **Servicios:** "Que sepan qué ofrezco"
- **Proceso:** "Que entiendan cómo funciona"
- **Por qué Paraguay:** "Que vean las ventajas del país"

**Qué hacer con la respuesta:**
- Si dice historia: asegurarse que About sea outstanding, linkear desde hero
- Si dice servicios: priorizar página de Servicios
- Reordenar navegación según su respuesta


### P22 — ¿CÓMO QUERÉS EL CONTENIDO DEL SITIO?

**Contexto de investigación:**
El FAQ tiene 31 preguntas, muchas genéricas. El blog tiene 30 borradores. El tono es institucional. Sonia es cálida y personal.

**Pregunta exacta:**
> "Hoy el sitio habla como una empresa. Pero vos sos Sonia. ¿Querés que el sitio hable en PRIMERA PERSONA? 'Yo te ayudo', 'Mi servicio', 'Te acompaño'?"

**Posibles respuestas:**
- **Sí, primera persona:** "Soy yo la que atiende, que se sepa"
- **Formal/tercera persona:** "Nexa Paraguay ofrece..." (más profesional)
- **Mixto:** Hero e historia en primera persona, servicios en tercera

**Qué hacer con la respuesta:**
- Si elige primera persona: cambiar todo el tono del sitio
- Si elige tercera: mantener el tono actual
- Si mixto: definir reglas


### P23 — ¿BLOG: QUERÉS ESCRIBIR VOS O QUE NOSOTROS LO HAGAMOS?

**Contexto de investigación:**
El blog puede generar tráfico SEO. Tenemos 30 artículos en borrador. Podemos generar contenido con AI.

**Pregunta exacta:**
> "Para el blog — podemos:
> a) Escribir nosotros con AI contenido informativo (guías, impuestos, proceso)
> b) Vos escribís posts en primera persona sobre tus experiencias
> c) Una mezcla
> ¿Qué preferís?"

**Posibles respuestas:**
- **AI + revisión de Sonia:** "Escriban ustedes y yo reviso"
- **Sonia escribe:** "Quiero escribir yo, soy la que sabe"
- **No quiere blog:** "No me interesa el blog ahora"
- **Mezcla:** "Artículos técnicos ustedes, historias mías"

**Qué hacer con la respuesta:**
- Si elige AI: implementar content engine, Sonia revisa antes de publicar
- Si elige escribir: ayudarle con estructura y edición
- Si no quiere: no forzar, enfocar en otras estrategias


### P24 — ¿QUERÉS CONTENIDO ESPECÍFICO PARA FAMILIAS?

**Contexto de investigación:**
Sonia dijo que ofrece investigación de colegios por ciudad y presupuesto. Es un servicio que NO está en el sitio. Y las familias son su target preferido.

**Pregunta exacta:**
> "Las familias son tu target favorito, pero el sitio no tiene NADA específico para familias. ¿Querés que agreguemos:
> a) Una sección en Servicios sobre acompañamiento para familias con hijos
> b) Una guía descargable de colegios en Paraguay
> c) Testimonios de familias (si tenés permiso)
> d) Todo lo anterior?"

**Posibles respuestas:**
- **Sí, todo:** "Agreguen todo lo que ayuda a familias"
- **Solo servicios:** "Pongan que ayudo con colegios pero sin tanto detalle"
- **No público:** "Eso lo manejo en privado con cada cliente"
- **No sé:** "Nunca pensé en separarlo"

**Qué hacer con la respuesta:**
- Si acepta: crear sección de familias en servicios + FAQ items sobre colegios
- Si no público: documentar como servicio bajo demanda
- Agregar al `content/es.json`


### P25 — ¿CUÁNTA INFORMACIÓN DE IMPUESTOS QUERÉS EN EL SITIO?

**Contexto de investigación:**
El FAQ tiene muchas preguntas sobre impuestos. El modelo financiero asume que habrá una calculadora de ahorro fiscal. Pero Sonia rechazó la calculadora como "demasiado pronto."

**Pregunta exacta:**
> "El sitio habla bastante de impuestos (10% IRE, sistema territorial, etc.). ¿Te sentís cómoda con eso? ¿O preferís que el sitio hable menos de impuestos y más del proceso humano?"

**Posibles respuestas:**
- **Menos impuestos, más humanos:** "Sí, soy guía no contadora"
- **Igual está bien:** "La gente pregunta, hay que tenerlo"
- **Que lo revisen mis contadores:** "Preguntá a los estudios con los que trabajo"

**Qué hacer con la respuesta:**
- Si prefiere menos impuestos: reducir el FAQ fiscal, fortalecer sección de proceso/acompañamiento
- Si quiere que lo revisen: coordinar con sus contadores


### P26 — REDES SOCIALES: ¿QUÉ QUERÉS HACER?

**Contexto de investigación:**
Preparamos un calendario de 12 posts para Instagram/LinkedIn (mayo-junio 2026). Tenemos imágenes AI generadas.

**Pregunta exacta:**
> "Preparamos contenido para redes. Pero queremos saber: ¿usás Instagram o LinkedIn hoy? ¿Querés que empecemos a publicar? ¿O preferís tener presencia primero?"

**Posibles respuestas:**
- **Sí, empecemos:** "LinkedIn es mejor para mi negocio"
- **Sí, ambas:** "Instagram para lifestyle, LinkedIn para profesional"
- **No ahora:** "Primero quiero que el sitio esté bien"
- **No me interesa:** "No me gustan las redes"

**Qué hacer con la respuesta:**
- Si acepta: calendarizar primera publicación, definir frecuencia
- Si elige LinkedIn: adaptar el calendario a tono profesional
- Si no quiere: respetar decisión


### P27 — ¿CUÁL ES TU OPINIÓN SOBRE LOS IMANES DE LEAD (LEAD MAGNETS)?

**Contexto de investigación:**
Diseñamos 4 lead magnets: calculadora de impuestos (rechazada), guía fiscal, checklist de documentos, guía de primeros 30 días.

**Pregunta exacta:**
> "Para captar clientes, pensamos en ofrecer contenido gratis a cambio del email. Por ejemplo: una guía de '10 cosas que nadie te dice sobre mudarte a Paraguay'. ¿Te parece bien? ¿O preferís no hacer eso?"

**Posibles respuestas:**
- **Sí, buena idea:** "Dame contenido y lo reviso"
- **Sí, pero quiero escribirlo yo:** "Escribo algo personal"
- **No:** "No me gusta pedir email, los clientes vienen solos"

**Qué hacer con la respuesta:**
- Si acepta: priorizar lead magnets, implementar en el sitio
- Si no: no forzar, mantener formulario de contacto simple


---

## BLOQUE 5 — LEGAL, FOTOS & LOGÍSTICA (8 min)

### Contexto general para Sonia

> "Hay cosas técnicas que necesitamos resolver para que el sitio esté 100%. Algunas son rápidas, otras necesitan decisiones."


### P28 — FOTOS: ¿CÓMO CONSEGUIMOS IMÁGENES REALES?

**Contexto de investigación:**
Sonia confirmó que NO tiene fotos reales. El sitio usa imágenes AI (placeholders). La hero image actual es genérica.

**Pregunta exacta:**
> "Necesitamos fotos tuyas y de Paraguay para el sitio. Opciones:
> a) Voy a tu casa/oficina con un celular y sacamos fotos esta semana (15 min)
> b) Me enviás fotos que tengas del celular
> c) Buscamos fotos de stock de Paraguay (no son tuyas pero son reales)
> ¿Qué preferís?"

**Respuesta esperada:**
> "Vení a casa y sacamos fotos" (es lo más probable si es accesible)

**Posibles respuestas:**
- **Sí, vení:** Coordinar día y hora
- **Envío fotos:** Pedir que mande lo que tenga
- **Stock:** "Usen fotos de stock por ahora"
- **No quiero fotos:** "No me gusta salir en la página"

**Qué hacer con la respuesta:**
- Si acepta foto: coordinar shoot, hacerlo simple (15 min, celular, buena luz)
- Si envía: revisar calidad
- Si stock: buscar imágenes reales de Asunción/Paraguay (Unsplash, etc.)


### P29 — ¿CÓMO PRESENTAMOS EL "EQUIPO" EN EL SITIO?

**Contexto de investigación:**
El sitio muestra 5 roles con imágenes AI generadas. Sonia pidió sacar "Nuestro equipo" porque no hay equipo real. Hoy solo está Sonia y sus contactos.

**Pregunta exacta:**
> "Hoy el sitio muestra 5 personas de equipo que no existen. ¿Cómo querés manejar esto?
> a) Sacamos la sección de equipo completamente
> b) Ponemos solo a vos con tus estudios de confianza como partners
> c) Ponemos a vos sola como fundadora"

**Posibles respuestas:**
- **Solo yo:** "Soy yo la que atiende, no hay equipo"
- **Yo + partners:** "Pongo los estudios con los que trabajo como 'nuestra red profesional'"
- **Sacar todo:** "Mejor no poner nada de equipo"

**Qué hacer con la respuesta:**
- Actualizar la página About y el componente Team
- Si elige partners: crear sección "Nuestra red de confianza"


### P30 — ¿CUÁL ES TU DIRECCIÓN FÍSICA / OFICINA?

**Contexto de investigación:**
El sitio tiene "Villa Morra, Asunción" como dirección. No sabemos si Sonia tiene oficina real o atiende desde su casa/LVH.

**Pregunta exacta:**
> "¿Dónde atendés a los clientes? ¿En tu casa? ¿En La Vieja Holanda? ¿En algún espacio? ¿Querés que pongamos dirección o solo 'Asunción'?"

**Posibles respuestas:**
- **Casa/oficina:** Dirección específica
- **La Vieja Holanda:** "Ahí tengo el local, puedo atender ahí"
- **Cafeterías / espacios públicos:** "No tengo oficina fija"
- **No pongas dirección:** "Prefiero dar la dirección en privado"

**Qué hacer con la respuesta:**
- Si da dirección: actualizar site.json y content
- Si no quiere: mantener solo "Asunción, Paraguay"


### P31 — DOMINIO NEXAPARAGUAY.COM — ¿LO MOVEMOS?

**Contexto de investigación:**
`nexaparaguay.com` apunta a Shopify (placeholder del negocio anterior). El sitio real está en `nexa.paragu-ai.com`. Para tener credibilidad, necesitan el dominio real.

**Pregunta exacta:**
> "Tu sitio real está en nexa.paragu-ai.com. El dominio nexaparaguay.com apunta a Shopify. ¿Querés que lo movamos? Si es sí, necesito acceso a tu panel de dominio."

**Posibles respuestas:**
- **Sí, movelo:** "Decime qué necesitás"
- **No todavía:** "Primero quiero tener todo listo"
- **No sé cómo:** "Ayudame, no sé de dominios"

**Qué hacer con la respuesta:**
- Si acepta: pedir acceso al DNS, configurar A record a 72.61.44.159
- Si no: agenda para la semana siguiente


### P32 — WHATSAPP BOT — ¿ESCANEAMOS EL QR AHORA?

**Contexto de investigación:**
Configuramos un bot AI de WhatsApp que califica leads automáticamente. El QR está listo pero nadie lo escaneó.

**Pregunta exacta:**
> "El bot de WhatsApp está listo pero necesita que escaneés un QR desde WhatsApp Settings → Linked Devices. ¿Tenés tu teléfono ahora? Lo hacemos en 1 minuto."

**Respuesta esperada:**
Si tiene el teléfono: hacerlo en vivo durante la reunión.
Si no: coordinar para después.

**Qué hacer con la respuesta:**
- Si escanea: probar el bot enviando un mensaje
- Si no: enviarle instrucciones paso a paso por WhatsApp


### P33 — SEPRELAD — ¿CÓMO VAMOS?

**Contexto de investigación:**
El sitio tiene "SEPRELAD: registro pendiente". No sabemos si Sonia necesita registro SEPRELAD (aplica a quienes manejan activos de terceros, no necesariamente a servicios de consultoría).

**Pregunta exacta:**
> "El sitio dice SEPRELAD pendiente. ¿Tus abogados te dijeron si necesitás registro? Porque si solo das servicios de consultoría y acompañamiento — sin manejar plata de clientes — quizás no lo necesitás."

**Posibles respuestas:**
- **Ya lo está tramitando:** "Mi abogado lo está viendo"
- **No lo necesita:** "Me dijeron que no aplica a mi servicio"
- **No sabe:** "No pregunté, no sé qué es SEPRELAD"

**Qué hacer con la respuesta:**
- Si lo tramita: actualizar estado a "en proceso"
- Si no lo necesita: eliminar la nota del sitio
- Si no sabe: ofrecerse a consultar con sus abogados


---

## BLOQUE 6 — ESTRATEGIA & VISIÓN (10 min)

### Contexto general para Sonia

> "Ya tenemos el sitio, el modelo, la investigación. Ahora necesito entender hacia dónde querés ir."


### P34 — LA REUNIÓN CON INVERSORES (MAÑANA MAY 11)

**Contexto de investigación:**
Sonia tiene reunión con inversores holandeses (contacto de Stef y Magda). Dijo que le intimida porque no entiende terminología financiera. Quedó en grabar el audio para que Iván analice.

**Pregunta exacta:**
> "La reunión con los inversores — ¿la grabaste? Si ya tenés el audio, pasámelo y te preparo un reporte con las preocupaciones principales de ellos y cómo responderlas. ¿Cómo fue?"

**Posibles respuestas:**
- **Sí, grabé:** "Tomá el audio, ayudame" → prioridad: procesar el audio post-reunión
- **Todavía no:** "Es mañana, grabo y te paso"
- **Ya pasó:** "Ya hablé con ellos, [resumen de lo que pasó]"
- **No grabé:** "Se me olvidó / no se pudo"

**Qué hacer con la respuesta:**
- Si hay audio: procesar con AI → generar reporte de preocupaciones
- Si ya pasó: documentar resultado
- Agenda seguimiento


### P35 — ¿NEXA ES TU PRIORIDAD #1?

**Contexto de investigación:**
Sonia tiene múltiples negocios: La Vieja Holanda (8K seguidores, activa), WPG Group (33 importaciones desde China), Casa Weiss (restaurant).

**Pregunta exacta:**
> "Tenés varios negocios. La Vieja Holanda está activa con 8,000 seguidores. WPG importa de China. Casa Weiss. ¿Nexa es tu prioridad hoy? ¿O es un proyecto más?"

**Posibles respuestas:**
- **Sí, prioridad #1:** "A esto me quiero dedicar"
- **Mitad y mitad:** "Comparto tiempo con La Vieja Holanda"
- **Proyecto secundario:** "Voy viendo, sin apuro"

**Qué hacer con la respuesta:**
- Define el ritmo de desarrollo del sitio y las features
- Si es prioridad: roadmap agresivo
- Si no: ritmo más lento, menos features


### P36 — ¿QUERÉS AI EN TU NEGOCIO O TODO HUMANO?

**Contexto de investigación:**
Tenemos 8 oportunidades AI identificadas. Sonia rechazó la calculadora de impuestos por "demasiado pronto."

**Pregunta exacta:**
> "Podemos agregar AI a tu negocio: bot de WhatsApp que atiende 24/7, responde preguntas, califica leads. ¿Te interesa? ¿O preferís mantenerlo 100% humano — vos contestás cada mensaje?"

**Posibles respuestas:**
- **Sí, AI:** "Ayudame, no doy abasto"
- **No, humano:** "Prefiero responder yo, es mi estilo"
- **Tal vez:** "Qué más hace? Explícame"

**Qué hacer con la respuesta:**
- Si acepta AI: implementar WhatsApp bot (P0 del AI opportunity map)
- Si no: mantener contacto personal como diferencial
- Si duda: mostrar demo del bot


### P37 — ¿CUÁNTO QUERÉS ESCALAR?

**Contexto de investigación:**
El modelo financiero proyecta de $270K a $4.7M en 3 años. Sonia no ha visto estas proyecciones.

**Pregunta exacta:**
> "Pregunta importante: ¿querés ser la Sonia que atiende 3-4 clientes por mes personalmente? ¿O querés construir una agencia con empleados y escalar a 20-30 clientes por mes? Las dos están bien, pero cambian todo lo que construimos."

**Posibles respuestas:**
- **Boutique personal:** "3-4 clientes por mes, bien atendidos, referral-only"
- **Agencia escalable:** "Quiero crecer, contratar gente"
- **No sé:** "Nunca pensé en escala"
- **Depende:** "Si hay demanda, crezco"

**Qué hacer con la respuesta:**
- Si boutique: sitio enfocado en Sonia, servicios premium, sin escalar
- Si agencia: sitio institucional, equipo, procesos, escalabilidad
- Si no sabe: presentar los dos escenarios y pedir que decida


### P38 — ¿CUÁL ES TU MAYOR MIEDO CON EL NEGOCIO?

**Contexto de investigación:**
Sonia mencionó que los inversores le intimidan. También que no quiere "ser abusiva" con los precios. Parece tener dudas sobre su propio valor.

**Pregunta exacta:**
> "Siendo honesta — ¿cuál es tu mayor miedo con Nexa? ¿Qué te preocupa? ¿No conseguir clientes? ¿No dar la talla? ¿Cobrar mucho o poco?"

**Posibles respuestas:**
- **No conseguir clientes:** "Si el sitio no funciona, me quedé sola"
- **No dar la talla:** "Estos inversores saben más que yo"
- **Precios:** "No quiero que piensen que soy cara"
- **Todo bien:** "No tengo miedo, esto es lo que sé hacer"

**Qué hacer con la respuesta:**
- Documentar preocupaciones → plan de mitigación
- Si teme no conseguir clientes: enfocar en SEO + comunidad holandesa
- Si teme inversores: ofrecer apoyo continuo en temas financieros
- Si teme precios: ayudarle a entender su valor vs competencia


### P39 — CIERRE: ¿ALGO QUE NO PREGUNTÉ?

**Pregunta exacta:**
> "Última pregunta: ¿hay algo importante que NO te pregunté y que debería saber? ¿Algo que te preocupe, algo que quieras cambiar del sitio, algo que necesitás?"

**Qué buscar:**
Sonia puede tener preocupaciones no dichas, ideas que no compartió, o preguntas sobre el proceso. Esta es su oportunidad de hablar libremente.

**Qué hacer con la respuesta:**
- Documentar todo
- Agregar al SOURCE_OF_TRUTH.md si corresponde
- Crear tareas de seguimiento

---

## 📋 CIERRE DE LA REUNIÓN (2 min)

### Lo que decís al final (script sugerido)

> *"Sonia, gracias. Esto me sirvió muchísimo. Te resumo lo que entendí y los próximos pasos:*
>
> *1. [Decisión de pricing] → lo actualizamos en el modelo*
> *2. [Perfil de cliente] → ajustamos el contenido*
> *3. [Historia] → escribo borrador y te mando*
> *4. [Fotos] → coordinamos día*
> *5. [WhatsApp/Dominio/SEPRELAD] → yo me encargo*
> *6. [Audio inversores] → si lo tenés, pasámelo*
>
> **Te mando un resumen por WhatsApp hoy. Cualquier cosa, me decís.** *

---

## 📊 DECISIONES CLAVE A OBTENER

| # | Decisión | Depende de | Impacto si no se responde |
|---|----------|-----------|--------------------------|
| 1 | Precio real del servicio | Toda la estrategia de precios del sitio | El sitio muestra precios incorrectos |
| 2 | Perfil de cliente ideal | Targeting, contenido, SEO | El sitio habla al cliente equivocado |
| 3 | Versión de su historia | About page, hero, blog | Historia genérica = sin diferencial |
| 4 | Confirmación del eslogan | Hero del sitio, branding | Marca sin identidad fuerte |
| 5 | Fotos reales | About, hero, credibilidad | Placeholders AI = poca confianza |
| 6 | WhatsApp QR escaneado | Lead generation inmediata | Bot configurado pero muerto |
| 7 | Estado SEPRELAD | Compliance legal del sitio | Riesgo regulatorio no resuelto |
| 8 | Dominio nexaparaguay.com | Marca, credibilidad | Sitio en dominio ajeno |
| 9 | Audio reunión inversores | Estrategia inversores | Oportunidad perdida |
| 10 | Prioridad del negocio | Roadmap de features | Esfuerzo mal direccionado |
| 11 | Interés en AI | Feature roadmap completo | Oportunidad de AI perdida |

---

## 📚 REFERENCIAS RÁPIDAS PARA LA REUNIÓN

| Documento | Link |
|-----------|------|
| Source of Truth completo | `docs/SOURCE_OF_TRUTH.md` |
| Preguntas anteriores (respondidas) | `docs/client-questions-for-sonia.md` |
| Análisis completo del briefing | `docs/client-analysis-complete.md` |
| Historia de feedback | `docs/client-feedback-complete.md` |
| Perfil de Sonia (todas las empresas) | `docs/01-client/client-intelligence.json` |
| FAQ de ventas (precios a validar) | `docs/06-marketing/faq-dealclosing.md` |
| Modelo financiero (suposiciones) | `docs/09-market-intelligence/financial-model.md` |
| Mapa competitivo (15 competidores) | `docs/09-market-intelligence/competitor-landscape.md` |
| 8 oportunidades AI | `docs/09-market-intelligence/ai-opportunity-map.md` |
| 5 perfiles de cliente | `docs/09-market-intelligence/customer_persona_dossiers.md` |
| Calendario de contenido | `docs/05-content/CONTENT_CALENDAR.yml` |
| Lead magnets planeados | `docs/06-marketing/lead-magnets.md` |
| Email sequences | `docs/06-marketing/email-sequences.md` |
| Sitio live (NL) | https://nexa.paragu-ai.com/nl |

---

## ⏱ GESTIÓN DEL TIEMPO

| Si tenés solo... | Hacé estos bloques |
|-----------------|-------------------|
| **60 min** | Todos (ideal) |
| **45 min** | Bloques 1, 3, 4, 5 (saltear 2 y acortar 6) |
| **30 min** | Bloques 1 (P1-P3), 3 (P15-P16), 5 (P28, P31, P32) |
| **15 min** | P1 (precio), P15 (historia), P28 (fotos) — las 3 decisiones más críticas |

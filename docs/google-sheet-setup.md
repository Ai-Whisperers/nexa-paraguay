# Service Matrix for Sonia — Google Sheet + Form

Two options for Sonia to respond easily:

---

## Option A: Google Sheet (Recommended)

The CSV is ready at `docs/deliverables/service-matrix-sonia.csv` — **210 services** across 17 categories.

### How to Import into Google Sheets

1. Open [sheets.new](https://sheets.new)
2. **File → Import → Upload** → select `service-matrix-sonia.csv`
3. Check **"Replace current sheet"** → **Import**
4. Add 3 extra columns to the right:
   - **Column H**: `✅ Sí` (dropdown: Sí / No / Investigar)
   - **Column I**: `Precio (USD)` (free text)
   - **Column J**: `Notas de Sonia` (free text)
5. Protect the first 7 columns so she only edits H, I, J
6. Share with Sonia as **Editor**

### What Sonia Sees

| # | Fase | Categoría | Servicio | ¿Sonia lo hace? | Precio | Notas | **✅ Sí** | **Precio** | **Notas Sonia** |
|---|---|---|---|---|---|---|---|---|---|
| 1 | FASE 0 — PRE-ARRIVAL | Documentos | Pre-validación de documentos | ☐ Sí ☐ No | $____ | | [dropdown] | | |
| 2 | FASE 0 — PRE-ARRIVAL | Documentos | Coordinación de Apostilla | ☐ Sí ☐ No | $____ | | [dropdown] | | |

She clicks the dropdown per row, picks **Sí / No / Investigar**, fills the price if applicable, adds her own notes.

**Conditional formatting:** Highlight rows where she says "Sí" in green, "No" in red, "Investigar" in yellow.

---

## Option B: Google Form (More guided)

A form would show one service at a time with radio buttons. Better if she's easily overwhelmed.

### How to Create the Form

1. Open [forms.new](https://forms.new)
2. Create a **Section** per phase (5 phases: Pre-Arrival, Arrival, Post-Arrival, Continuous, Premium)
3. Within each section, add **Multiple choice** questions:
   - **Question:** "Pre-validación de documentos (checklist remoto)"
   - **Options:** Sí lo hago / No lo hago / Nunca lo pensé, investiguemos
4. If "Sí" → show follow-up: "¿Cuánto cobras?" (short answer)
5. If "Sí" → show follow-up: "¿Incluido en $1,500?" (Sí/No)

**Downside:** 210 questions = 210 form fields. Might be too many.

---

## Recommendation

**Use the Google Sheet (Option A).** It's faster to set up (5 min) and Sonia can scan all services at once. The CSV is already exported — just import it.

The Google Apps Script below generates the sheet automatically if you want the full automation.

---

## Google Apps Script (Optional — for auto-generating the sheet)

```javascript
// Paste this in Extensions → Apps Script in Google Sheets
// Run createServiceSheet() to auto-generate the sheet from the CSV

function createServiceSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  
  // Add headers
  const headers = ['#', 'Fase', 'Categoría', 'Servicio', '¿Sonia lo hace?', 'Precio', 'Notas', '✅ Decisión', '💲 Precio final', '📝 Notas de Sonia'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
  
  // Add data validation for column H
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Sí, lo hago', 'No, no lo hago', 'Nunca lo pensé, investiguemos'], true)
    .setAllowInvalid(false)
    .build();
  
  // Apply to all 210 rows
  sheet.getRange('H2:H211').setDataValidation(rule);
  
  // Conditional formatting: green for Sí, red for No, yellow for Investigar
  const range = sheet.getRange('H2:H211');
  
  const greenRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Sí, lo hago')
    .setBackground('#d9ead3')
    .setRanges([range])
    .build();
    
  const redRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('No, no lo hago')
    .setBackground('#f4cccc')
    .setRanges([range])
    .build();
    
  const yellowRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Nunca lo pensé, investiguemos')
    .setBackground('#fff2cc')
    .setRanges([range])
    .build();
  
  sheet.setConditionalFormatRules([greenRule, redRule, yellowRule]);
  
  // Freeze first row
  sheet.setFrozenRows(1);
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, headers.length);
}
```

## Files in This Repo

| File | What It Is |
|------|-----------|
| `docs/deliverables/service-matrix-sonia.csv` | **Ready to import** — 210 services, 7 columns |
| `docs/meetings/service-matrix-questions-sonia.md` | Original markdown with full context |
| `docs/meetings/meeting-sonia-questions-final.md` | 40 meeting questions (pricing, scope, etc.) |

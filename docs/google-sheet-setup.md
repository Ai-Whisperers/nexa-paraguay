# Google Sheets Auto-Setup for Nexa Paraguay

> **Purpose:** Create a Google Sheet with Sonia's 210 services, completely formatted with dropdowns and colors — automatically.
> **Time to set up:** 3 minutes in Google Cloud Console + 1 command

---

## Step 1: Enable Google Sheets API (2 min)

1. Go to **[Google Cloud Console](https://console.cloud.google.com/apis/credentials)**
2. Create a project (or select existing): **Nexa Paraguay**
3. Go to **APIs & Services → Library**
4. Search **Google Sheets API** → **Enable**
5. Also enable **Google Drive API** (same process)

## Step 2: Create Service Account (1 min)

1. Go to **[Credentials](https://console.cloud.google.com/apis/credentials)**
2. Click **+ Create Credentials** → **Service Account**
3. Name: `nexa-paraguay-sheets`
4. Click **Create and Continue** (skip permissions)
5. Click **Done**

## Step 3: Generate Key (30 sec)

1. Click on the new service account
2. Go to **Keys** tab → **Add Key** → **Create New Key** → **JSON**
3. The file downloads automatically
4. Upload it to the VPS:
   ```bash
   # From your laptop:
   scp ~/Downloads/nexa-paraguay-sheets-*.json root@72.61.44.159:/root/.hermes/google-service-account.json
   ```

## Step 4: Run the Script (5 sec)

```bash
# From the VPS:
cd /root/nexa-paraguay
python3 scripts/create-google-sheet.py
```

Expected output:
```
✅ Sheet created!
📊 Sheet ID: abc123...
🔗 URL: https://docs.google.com/spreadsheets/d/abc123...
🔓 Anyone with the link can edit
🎨 Formatting applied (frozen rows, dropdowns, colors)
```

## Step 5: Share with Sonia

1. Open the URL
2. Click **Share** in top-right
3. Add Sonia's email as **Editor**
4. Tell her: *"Sonia, acá tenés los 210 servicios en una planilla. Marcá en la columna H si lo hacés, no lo hacés, o querés investigar. Si lo hacés, poné el precio en la columna I."*

---

## What the Sheet Looks Like

| # | Fase | Categoría | Servicio | ¿Sonia lo hace? | Precio | Notas | ✅ Decisión | 💲 Precio | 📝 Notas |
|---|---|---|---|---|---|---|---|---|---|
| 1 | PRE-ARRIVAL | Documentos | Pre-validación de docs | ☐ Sí ☐ No | $____ | | [🟢 Sí, lo hago] | | |
| 2 | PRE-ARRIVAL | Documentos | Apostilla | ☐ Sí ☐ No | $____ | | [🔴 No, no lo hago] | | |
| 3 | PRE-ARRIVAL | Documentos | Traducción certificada | ☐ Sí ☐ No | $____ | | [🟡 Investigar] | | |

**Color coding:**
- 🟢 Green = Sí, lo hago
- 🔴 Red = No, no lo hago
- 🟡 Yellow = Nunca lo pensé, investiguemos

---

## Alternative: Create the Sheet Manually

If Google Cloud Console is too much trouble:

1. Open **[sheets.new](https://sheets.new)**
2. **File → Import → Upload**
3. Upload `docs/deliverables/service-matrix-sonia.csv`
4. Add 3 more columns: Decisión, Precio final, Notas
5. Add dropdown validation manually (Data → Data validation)
6. Share with Sonia

---

## Files

| File | Purpose |
|------|---------|
| `docs/deliverables/service-matrix-sonia.csv` | **210 services CSV** — ready to import manually |
| `scripts/create-google-sheet.py` | **Auto-create script** — requires service account |
| `docs/google-sheet-setup.md` | This file |

#!/usr/bin/env python3
"""Generate printable emergency card HTML for Sonia's clients"""

html = '''<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Nexa Paraguay — Emergency Card</title>
<style>
  @page { size: A4; margin: 1cm; }
  body { font-family: 'Inter', Arial, sans-serif; display: grid; grid-template-columns: 1fr 1fr; gap: 1cm; padding: 1cm; }
  .card { border: 2px solid #1B2A4A; border-radius: 12px; padding: 16px; text-align: center; page-break-inside: avoid; }
  .card h2 { color: #1B2A4A; font-size: 14px; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 2px; }
  .card .lang { color: #C9A96E; font-size: 11px; margin-bottom: 8px; }
  .card .phone { font-size: 22px; font-weight: 800; color: #1B2A4A; margin: 4px 0; }
  .card .label { font-size: 10px; color: #666; margin-top: 8px; }
  .card .divider { border: none; border-top: 1px dashed #ddd; margin: 8px 0; }
  .card .info { font-size: 11px; color: #333; }
  .card .nexa { margin-top: 8px; padding: 6px; background: #1B2A4A; color: white; border-radius: 6px; font-size: 11px; }
</style></head>
<body>'''

cards = [
    {"lang": "NL", "title": "NOODGEVAL", "police": "POLITIE", "ambulance": "AMBULANCE", "fire": "BRANDWEER",
     "hospital": "ZIEKENHUIS BAUTISTA (24u SEH)", "nexa": "Nexa Paraguay — Sonia"},
    {"lang": "EN", "title": "EMERGENCY", "police": "POLICE", "ambulance": "AMBULANCE", "fire": "FIRE",
     "hospital": "HOSPITAL BAUTISTA (24h ER)", "nexa": "Nexa Paraguay — Sonia"},
    {"lang": "ES", "title": "EMERGENCIA", "police": "POLICÍA", "ambulance": "AMBULANCIA", "fire": "BOMBEROS",
     "hospital": "HOSPITAL BAUTISTA (24h URGENCIAS)", "nexa": "Nexa Paraguay — Sonia"},
    {"lang": "DE", "title": "NOTFALL", "police": "POLIZEI", "ambulance": "KRANKENWAGEN", "fire": "FEUERWEHR",
     "hospital": "KRANKENHAUS BAUTISTA (24h NOTAUFNAHME)", "nexa": "Nexa Paraguay — Sonia"},
]

for c in cards:
    html += f'''
  <div class="card">
    <h2>{c['title']}</h2>
    <div class="lang">{c['lang']}</div>
    <hr class="divider">
    <div class="label">{c['police']}</div>
    <div class="phone">911</div>
    <div class="label">{c['ambulance']}</div>
    <div class="phone">141</div>
    <div class="label">{c['fire']}</div>
    <div class="phone">132</div>
    <hr class="divider">
    <div class="label">{c['hospital']}</div>
    <div class="phone">(021) 501-112</div>
    <hr class="divider">
    <div class="info">Mijn bloedgroep: ___________</div>
    <div class="info">Allergieën: ________________________</div>
    <hr class="divider">
    <div class="nexa">📱 {c['nexa']} — +595 982 515 138</div>
  </div>'''

html += '''</body></html>'''

with open('/home/ai-whisperers/projects/clients/Nexa-Paraguay/docs/emergency-card.html', 'w') as f:
    f.write(html)

print("Done: docs/emergency-card.html (printable, 4 cards per page)")
PYEOF
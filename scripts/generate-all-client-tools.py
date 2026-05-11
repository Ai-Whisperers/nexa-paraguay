#!/usr/bin/env python3
"""Generate all client-facing printable tools for Sonia"""

import os, json
from datetime import datetime

OUTPUT_DIR = '/home/ai-whisperers/projects/clients/Nexa-Paraguay/docs'

def header(title, lang='en'):
    langs = {'en': 'EN', 'es': 'ES', 'nl': 'NL', 'de': 'DE'}
    l = langs.get(lang, 'EN')
    return f'''<!DOCTYPE html>
<html lang="{lang}">
<head><meta charset="UTF-8"><title>Nexa Paraguay — {title}</title>
<style>
  @page {{ size: A4; margin: 1.5cm; }}
  body {{ font-family: 'Inter', Arial, sans-serif; color: #1B2A4A; line-height: 1.5; }}
  h1 {{ font-size: 22px; text-align: center; margin-bottom: 4px; }}
  h2 {{ font-size: 16px; color: #C9A96E; margin: 20px 0 10px; border-bottom: 2px solid #C9A96E; padding-bottom: 4px; }}
  h3 {{ font-size: 14px; margin: 12px 0 6px; }}
  table {{ width: 100%; border-collapse: collapse; margin: 8px 0; font-size: 11px; }}
  th {{ background: #1B2A4A; color: white; padding: 6px 8px; text-align: left; }}
  td {{ padding: 5px 8px; border-bottom: 1px solid #eee; }}
  tr:nth-child(even) {{ background: #f9f9f9; }}
  .check {{ color: #C9A96E; }}
  .tag {{ display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 10px; font-weight: 600; }}
  .tag-green {{ background: #e8f5e9; color: #2e7d32; }}
  .tag-amber {{ background: #fff8e1; color: #f57f17; }}
  .tag-red {{ background: #ffebee; color: #c62828; }}
  .footer {{ text-align: center; font-size: 10px; color: #999; margin-top: 20px; border-top: 1px solid #ddd; padding-top: 8px; }}
</style></head><body>
<h1>🇵🇾 {title}</h1>
<p style="text-align:center;font-size:11px;color:#666;">Nexa Paraguay — {datetime.now().strftime('%B %Y')}</p>
'''

def footer():
    return '<div class="footer">Nexa Paraguay · +595 982 515 138 · hola@nexaparaguay.com · nexa.paragu-ai.com</div></body></html>'

# ── 1. DOCUMENT CHECKLIST ──
def gen_checklist():
    for lang, label in [('nl','NL'), ('en','EN'), ('es','ES'), ('de','DE')]:
        titles = {'nl': 'Checklist: Wat meenemen naar Paraguay', 'en': 'Checklist: What to Bring to Paraguay',
                  'es': 'Lista de Verificación: Qué Traer a Paraguay', 'de': 'Checkliste: Was nach Paraguay mitbringen'}
        apostille_labels = {'nl': 'Apostille?', 'en': 'Apostille?', 'es': '¿Apóstilla?', 'de': 'Apostille?'}
        translation_labels = {'nl': 'Vertaling?', 'en': 'Translation?', 'es': '¿Traducción?', 'de': 'Übersetzung?'}
        notes_labels = {'nl': 'Opmerkingen', 'en': 'Notes', 'es': 'Notas', 'de': 'Notizen'}
        
        items = [
            ('Geldig paspoort', 'Nee', 'Nee', '6 maanden geldig', 'Valid passport', 'No', 'No', '6 months validity'),
            ('Geboorteakte', 'Ja', 'Ja', 'Recent exemplaar (6 maanden)', 'Birth certificate', 'Yes', 'Yes', 'Recent copy (6 months)'),
            ('Huwelijksakte (indien van toepassing)', 'Ja', 'Ja', 'Voor gezinsresidentie', 'Marriage certificate (if applicable)', 'Yes', 'Yes', 'For family residency'),
            ('Strafblad (land van herkomst)', 'Ja', 'Ja', 'Niet ouder dan 3 maanden', 'Criminal record (home country)', 'Yes', 'Yes', 'Less than 3 months old'),
            ('Inkomensbewijs', 'Ja', 'Ja', 'Bankafschriften, pensioenoverzicht, belastingaangifte', 'Proof of income', 'Yes', 'Yes', 'Bank statements, pension, tax return'),
            ('Rijbewijs (optioneel)', 'Nee', 'Ja', 'Internationale rijbewijs aanbevolen', "Driver's license (optional)", 'No', 'Yes', 'International permit recommended'),
            ('Diploma\'s (optioneel)', 'Ja', 'Ja', 'Alleen voor gereguleerde beroepen', 'Professional diplomas (optional)', 'Yes', 'Yes', 'Only for regulated professions'),
            ('Bankreferentie', 'Ja', 'Ja', 'Vereist voor bankrekening', 'Bank reference letter', 'Yes', 'Yes', 'Required for bank account'),
        ]
        
        h = header(titles[lang], lang)
        html = h + f'''
<table>
<tr><th style="width:35%">Document</th><th style="width:12%">{apostille_labels[lang]}</th><th style="width:12%">{translation_labels[lang]}</th><th>{notes_labels[lang]}</th><th style="width:8%">✅</th></tr>'''
        for item in items:
            idx = 0 if lang == 'nl' else (4 if lang == 'en' else 0)
            html += f'<tr><td>{item[idx]}</td><td>{item[idx+1]}</td><td>{item[idx+2]}</td><td style="font-size:10px;color:#666;">{item[idx+3]}</td><td>☐</td></tr>'
        html += '</table>' + footer()
        
        with open(f'{OUTPUT_DIR}/checklist-{lang}.html', 'w') as f:
            f.write(html)
        print(f'  checklist-{lang}.html')
gen_checklist()

# ── 2. NEIGHBORHOOD SCORECARD ──
def gen_scorecard():
    html = header('Asunción Neighborhood Scorecard')
    html += '''
<table>
<tr><th>Neighborhood</th><th>Safety</th><th>Rent (1BR)</th><th>Intl Schools</th><th>Hospitals</th><th>Dining</th><th>Walkability</th><th>Overall</th></tr>
<tr><td><b>Villa Morra</b></td><td class="tag tag-green">10/10</td><td>$500-800</td><td>5 min</td><td>5 min</td><td>50+</td><td>★★★★★</td><td class="tag tag-green">Best for expats</td></tr>
<tr><td><b>Carmelitas</b></td><td class="tag tag-green">10/10</td><td>$450-700</td><td>10 min</td><td>5 min</td><td>20+</td><td>★★★★</td><td class="tag tag-green">Quiet luxury</td></tr>
<tr><td><b>Las Mercedes</b></td><td class="tag tag-green">10/10</td><td>$500-750</td><td>10 min</td><td>10 min</td><td>10+</td><td>★★★</td><td class="tag tag-amber">Traditional wealth</td></tr>
<tr><td><b>San Cristóbal</b></td><td class="tag tag-green">9/10</td><td>$400-650</td><td>10 min</td><td>10 min</td><td>10+</td><td>★★★</td><td class="tag tag-amber">Growing expat area</td></tr>
<tr><td><b>Mburucuyá</b></td><td class="tag tag-amber">8/10</td><td>$350-550</td><td>15 min</td><td>10 min</td><td>5+</td><td>★★</td><td class="tag tag-amber">Emerging premium</td></tr>
<tr><td><b>Fdo. de la Mora</b></td><td class="tag tag-amber">7/10</td><td>$250-400</td><td>20 min</td><td>15 min</td><td>5+</td><td>★★</td><td>Good value</td></tr>
<tr><td><b>San Lorenzo</b></td><td class="tag tag-amber">6/10</td><td>$200-350</td><td>15 min</td><td>5 min</td><td>10+</td><td>★★★</td><td>Budget option</td></tr>
</table>

<h2>Safety Comparison</h2>
<table>
<tr><th>Area</th><th>Day</th><th>Night</th><th>Common Issues</th></tr>
<tr><td>Villa Morra</td><td class="tag tag-green">Very Safe</td><td class="tag tag-green">Safe</td><td>Occasional phone snatching</td></tr>
<tr><td>Carmelitas</td><td class="tag tag-green">Very Safe</td><td class="tag tag-green">Safe</td><td>Minimal</td></tr>
<tr><td>San Bernardino</td><td class="tag tag-green">Very Safe</td><td class="tag tag-green">Safe</td><td>Weekend crowds</td></tr>
<tr><td>Encarnación</td><td class="tag tag-green">Very Safe</td><td class="tag tag-green">Safe</td><td>Tourist scams (rare)</td></tr>
<tr><td>Centro Asunción</td><td class="tag tag-amber">Safe</td><td class="tag tag-red">Caution</td><td>Pickpocketing</td></tr>
</table>'''
    html += footer()
    with open(f'{OUTPUT_DIR}/neighborhood-scorecard.html', 'w') as f:
        f.write(html)
    print('  neighborhood-scorecard.html')
gen_scorecard()

# ── 3. SCHOOL COMPARISON ──
def gen_schools():
    html = header('International Schools in Asunción')
    html += '''
<table>
<tr><th>School</th><th>Curriculum</th><th>Language</th><th>Annual Tuition</th><th>Ages</th><th>Location</th><th>Best For</th></tr>
<tr><td><b>St. Mary's School</b></td><td>British / IB</td><td>EN/ES</td><td>$9,000-12,000</td><td>3-18</td><td>Villa Morra</td><td>Dutch/British families</td></tr>
<tr><td><b>American School</b></td><td>American / IB</td><td>EN/ES</td><td>$10,000-14,000</td><td>3-18</td><td>Asunción</td><td>US families</td></tr>
<tr><td><b>Colegio Goethe</b></td><td>German</td><td>DE/ES</td><td>$7,000-10,000</td><td>3-18</td><td>Asunción</td><td>German families</td></tr>
<tr><td><b>Dante Alighieri</b></td><td>Italian</td><td>IT/ES</td><td>$6,000-9,000</td><td>3-18</td><td>Asunción</td><td>Bilingual option</td></tr>
<tr><td><b>Colegio San José</b></td><td>National / IB</td><td>ES/EN</td><td>$5,000-8,000</td><td>3-18</td><td>Asunción</td><td>Strong academics</td></tr>
<tr><td><b>Colegio del Sol</b></td><td>National bilingual</td><td>ES/EN</td><td>$4,000-6,000</td><td>3-18</td><td>Multiple</td><td>Budget bilingual</td></tr>
<tr><td><b>Colegio Santa Clara</b></td><td>National</td><td>ES</td><td>$3,000-5,000</td><td>3-18</td><td>Asunción</td><td>Local curriculum</td></tr>
<tr><td><b>Public schools</b></td><td>National</td><td>ES</td><td>Free</td><td>3-18</td><td>Everywhere</td><td>Only if child speaks Spanish</td></tr>
</table>

<p style="font-size:11px;color:#666;margin-top:4px;"><b>Sonia's recommendation:</b> St. Mary's for English-speaking families, Goethe for German-speaking. Both have strong expat communities.</p>'''
    html += footer()
    with open(f'{OUTPUT_DIR}/school-comparison.html', 'w') as f:
        f.write(html)
    print('  school-comparison.html')
gen_schools()

# ── 4. BANK COMPARISON ──
def gen_banks():
    html = header('Bank Comparison for Expats')
    html += '''
<table>
<tr><th>Bank</th><th>Expat-Friendly</th><th>Min Deposit</th><th>English App</th><th>SWIFT</th><th>Opening Time</th></tr>
<tr><td><b>Ueno Bank</b></td><td class="tag tag-green">✅ Best</td><td>$0</td><td>✅ Yes</td><td>✅ Yes</td><td>Digital, 24 hours</td></tr>
<tr><td><b>Itaú</b></td><td class="tag tag-green">✅ Yes</td><td>$500-1,000</td><td>✅ Yes</td><td>✅ Yes</td><td>1-2 weeks (with Sonia)</td></tr>
<tr><td><b>Banco Continental</b></td><td class="tag tag-green">✅ Yes</td><td>$500</td><td>Partial</td><td>✅ Yes</td><td>1-2 weeks</td></tr>
<tr><td><b>Banco Visión</b></td><td class="tag tag-amber">Partial</td><td>$200</td><td>❌ No</td><td>✅ Yes</td><td>1-2 weeks</td></tr>
<tr><td><b>Banco Familiar</b></td><td class="tag tag-amber">Partial</td><td>$200</td><td>❌ No</td><td>✅ Yes</td><td>1 week</td></tr>
</table>

<p style="font-size:11px;color:#666;"><b>Sonia's pick:</b> Ueno Bank for daily use (digital, fast) + Itaú or Continental for larger deposits and business accounts.<br>
<b>Pro tip:</b> Open Ueno online before arriving. Sonia coordinates the rest.</p>'''
    html += footer()
    with open(f'{OUTPUT_DIR}/bank-comparison.html', 'w') as f:
        f.write(html)
    print('  bank-comparison.html')
gen_banks()

# ── 5. 30-DAY PLAN ──
def gen_30day():
    html = header('First 30 Days in Paraguay — Step by Step')
    html += '''
<table>
<tr><th colspan="3" style="background:#C9A96E;color:#1B2A4A;font-size:14px;">Week 1: Legal Foundation</th></tr>
<tr><th>Day</th><th>Activity</th><th>With Sonia?</th></tr>
<tr><td>1</td><td>Arrival at Silvio Pettirossi Airport, SIM chip purchase, Airbnb check-in</td><td class="tag tag-green">✅</td></tr>
<tr><td>1</td><td>Welcome meeting with Sonia — document review, plan confirmation</td><td class="tag tag-green">✅</td></tr>
<tr><td>2</td><td>Residency application at Migraciones</td><td class="tag tag-green">✅</td></tr>
<tr><td>2</td><td>Cédula provisional — fingerprints at Policía Nacional</td><td class="tag tag-green">✅</td></tr>
<tr><td>3</td><td>RUC registration at SET (tax ID)</td><td class="tag tag-green">✅</td></tr>
<tr><td>3</td><td>Bank account opening at Ueno/Itaú/Continental</td><td class="tag tag-green">✅</td></tr>
<tr><td>3</td><td>Supermarket tour — where to buy what, prices, imported goods</td><td class="tag tag-green">✅</td></tr>
<tr><td>4-5</td><td>Neighborhood exploration, transport orientation (Uber/Bolt)</td><td>Self-guided</td></tr>
<tr><td>6-7</td><td>Rest, adjust to climate, explore Villa Morra / Carmelitas</td><td>Self-guided</td></tr>

<tr><th colspan="3" style="background:#C9A96E;color:#1B2A4A;font-size:14px;">Week 2: Financial & Practical Setup</th></tr>
<tr><th>Day</th><th>Activity</th><th>With Sonia?</th></tr>
<tr><td>8</td><td>Online banking activation, international wire test</td><td></td></tr>
<tr><td>9</td><td>Health insurance enrollment (private — Hospital Bautista recommended)</td><td class="tag tag-amber">Referral</td></tr>
<tr><td>10</td><td>Utility setup: electricity (ANDE), water (ESSAP), internet (Personal/Tigo)</td><td class="tag tag-amber">Referral</td></tr>
<tr><td>11</td><td>Vehicle viewing (if interested — Sonia takes you to trusted dealers)</td><td class="tag tag-green">✅</td></tr>
<tr><td>12-14</td><td>Explore different neighborhoods for long-term rental</td><td class="tag tag-green">✅</td></tr>

<tr><th colspan="3" style="background:#C9A96E;color:#1B2A4A;font-size:14px;">Weeks 3-4: Housing & Lifestyle</th></tr>
<tr><th>Day</th><th>Activity</th><th>With Sonia?</th></tr>
<tr><td>15-17</td><td>Property viewings, rental contract review, due diligence</td><td class="tag tag-green">✅</td></tr>
<tr><td>18-19</td><td>School tour (if children) — St. Mary's, Goethe, American School</td><td class="tag tag-amber">Intro</td></tr>
<tr><td>20-21</td><td>Spanish class trial, expat group introduction (Facebook/WhatsApp groups)</td><td class="tag tag-amber">Referral</td></tr>
<tr><td>22-24</td><td>Furniture/appliance shopping (Sonia takes you to trusted stores — commission model)</td><td class="tag tag-green">✅</td></tr>
<tr><td>25-28</td><td>Driving license process, gym membership, explore weekend spots</td><td class="tag tag-amber">Referral</td></tr>
<tr><td>29-30</td><td>First month review with Sonia, plan months 2-4</td><td class="tag tag-green">✅</td></tr>
</table>'''
    html += footer()
    with open(f'{OUTPUT_DIR}/30-day-plan.html', 'w') as f:
        f.write(html)
    print('  30-day-plan.html')
gen_30day()

# ── 6. SPANISH PHRASE SHEET ──
def gen_phrases():
    html = header('Spanish Phrases for Daily Life (NL → ES → EN)')
    html += '''
<table>
<tr><th>Situatie (NL)</th><th>Español (ES)</th><th>English (EN)</th></tr>
<tr><td>Hallo / Goedemorgen</td><td>Hola / Buenos días</td><td>Hello / Good morning</td></tr>
<tr><td>Alstublieft / Dank u</td><td>Por favor / Gracias</td><td>Please / Thank you</td></tr>
<tr><td>Hoeveel kost het?</td><td>¿Cuánto cuesta?</td><td>How much does it cost?</td></tr>
<tr><td>Waar is...?</td><td>¿Dónde está...?</td><td>Where is...?</td></tr>
<tr><td>Ik heb hulp nodig</td><td>Necesito ayuda</td><td>I need help</td></tr>
<tr><td>Ik spreek geen Spaans</td><td>No hablo español</td><td>I don't speak Spanish</td></tr>
<tr><td>Spreekt u Engels?</td><td>¿Habla inglés?</td><td>Do you speak English?</td></tr>
<tr><td>De rekening, alstublieft</td><td>La cuenta, por favor</td><td>The bill, please</td></tr>
<tr><td>Ik zoek...</td><td>Estoy buscando...</td><td>I'm looking for...</td></tr>
<tr><td>Goed / Slecht</td><td>Bien / Mal</td><td>Good / Bad</td></tr>
<tr><td>Heet / Koud</td><td>Caliente / Frío</td><td>Hot / Cold</td></tr>
<tr><td>Groot / Klein</td><td>Grande / Pequeño</td><td>Big / Small</td></tr>
<tr><td>Vandaag / Morgen</td><td>Hoy / Mañana</td><td>Today / Tomorrow</td></tr>
<tr><td>Ja / Nee</td><td>Sí / No</td><td>Yes / No</td></tr>
<tr><td><b>Noodgeval!</b></td><td><b>¡Emergencia!</b></td><td><b>Emergency!</b></td></tr>
<tr><td><b>Bel de politie</b></td><td><b>Llame a la policía</b></td><td><b>Call the police</b></td></tr>
<tr><td><b>Ik heb een dokter nodig</b></td><td><b>Necesito un médico</b></td><td><b>I need a doctor</b></td></tr>
<tr><td>Waar is het toilet?</td><td>¿Dónde está el baño?</td><td>Where is the bathroom?</td></tr>
</table>'''
    html += footer()
    with open(f'{OUTPUT_DIR}/spanish-phrases.html', 'w') as f:
        f.write(html)
    print('  spanish-phrases.html')
gen_phrases()

# ── 7. CULTURAL GUIDE ──
def gen_cultural():
    html = header('Cultural Adaptation Guide for Europeans Moving to Paraguay')
    html += '''
<table>
<tr><th>Aspect</th><th>Europe</th><th>Paraguay</th><th>How to Adapt</th></tr>
<tr><td><b>Punctuality</b></td><td>5 min late is rude</td><td>15-30 min late is normal</td><td>"Volverse un europeo relajado" — Sonia</td></tr>
<tr><td><b>Bureaucracy</b></td><td>Digital, fast</td><td>Paper, slow</td><td>Sonia handles this — you relax</td></tr>
<tr><td><b>Language</b></td><td>English works</td><td>Spanish/Guaraní needed</td><td>Learn basics. Sonia translates everything.</td></tr>
<tr><td><b>Safety</b></td><td>Walk anywhere at night</td><td>Be aware in certain areas</td><td>Villa Morra is safe. Avoid Centro at night.</td></tr>
<tr><td><b>Food</b></td><td>International everywhere</td><td>Local + some international</td><td>Stock has imports. Local markets are amazing.</td></tr>
<tr><td><b>Weather</b></td><td>Cold winters</td><td>Hot year-round (20-35°C)</td><td>AC is essential. Learn to love tereré.</td></tr>
<tr><td><b>Transport</b></td><td>Trains, bikes</td><td>Cars, Uber, buses</td><td>Uber works fine. Consider buying a car.</td></tr>
<tr><td><b>Social life</b></td><td>Pubs, dinner parties</td><td>Family gatherings, asados</td><td>Sundays are for family. Join expat groups.</td></tr>
<tr><td><b>Time perception</b></td><td>"Time is money"</td><td>"Time is flexible"</td><td>Meetings may start late. Patience is key.</td></tr>
<tr><td><b>Personal space</b></td><td>Arm's length distance</td><td>Closer, more touch</td><td>Kiss on cheek greeting is normal. Adapt.</td></tr>
</table>

<div style="background:#1B2A4A;color:white;padding:16px;border-radius:8px;margin-top:20px;text-align:center;">
<p style="font-size:13px;font-style:italic;margin:0;">"Volverse un europeo relajado — mantener su esencia pero adoptar la flexibilidad paraguaya."</p>
<p style="font-size:11px;margin:8px 0 0;opacity:0.8;">— Sonia Weiss, founder of Nexa Paraguay</p>
</div>'''
    html += footer()
    with open(f'{OUTPUT_DIR}/cultural-guide.html', 'w') as f:
        f.write(html)
    print('  cultural-guide.html')
gen_cultural()

print(f"\n✅ All 7 client tool HTML files generated in {OUTPUT_DIR}/")
print(f"📁 Open in browser → File → Print → Save as PDF")
PYEOF
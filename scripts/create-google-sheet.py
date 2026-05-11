
"""Google Sheets Auto-Setup for Nexa Paraguay

Usage:
1. Go to https://console.cloud.google.com/apis/credentials
2. Create a Service Account → Download JSON key
3. Save as ~/.hermes/google-service-account.json
4. Run this script
"""

import csv, json, os
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseUpload

SERVICE_ACCOUNT_FILE = os.path.expanduser("~/.hermes/google-service-account.json")
CSV_FILE = "docs/deliverables/service-matrix-sonia.csv"

def create_sheet():
    """Create the Google Sheet with Sonia's service matrix"""
    
    if not os.path.exists(SERVICE_ACCOUNT_FILE):
        print(f"❌ Service account key not found at {SERVICE_ACCOUNT_FILE}")
        print()
        print("To create one:")
        print("  1. Go to https://console.cloud.google.com/apis/credentials")
        print("  2. Click 'Create Credentials' → 'Service Account'")
        print("  3. Name: 'nexa-paraguay-sheets'")
        print("  4. Click 'Done', then click on the new service account")
        print("  5. Go to 'Keys' tab → 'Add Key' → 'Create New Key' → JSON")
        print("  6. Save the file to ~/.hermes/google-service-account.json")
        print()
        print("Then enable the Sheets API:")
        print("  7. Go to https://console.cloud.google.com/apis/library")
        print("  8. Search 'Google Sheets API' → Enable")
        print("  9. Run this script again")
        return None
    
    # Load credentials
    creds = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE,
        scopes=['https://www.googleapis.com/auth/spreadsheets',
                'https://www.googleapis.com/auth/drive']
    )
    
    # Create the sheet
    service = build('sheets', 'v4', credentials=creds)
    drive_service = build('drive', 'v3', credentials=creds)
    
    # Read CSV data
    with open(CSV_FILE) as f:
        reader = csv.reader(f)
        data = list(reader)
    
    # Add header columns for Sonia's decisions
    headers = data[0] + ['✅ Decisión (Sí/No/Investigar)', '💲 Precio final (USD)', '📝 Notas de Sonia']
    
    # Create spreadsheet
    spreadsheet = {
        'properties': {'title': 'Nexa Paraguay — Matriz de Servicios para Sonia'},
        'sheets': [{
            'properties': {'title': 'Servicios'},
            'data': [{
                'startRow': 0,
                'startColumn': 0,
                'rowData': [{
                    'values': [{'userEnteredValue': {'stringValue': h}} for h in headers]
                }] + [{
                    'values': [{'userEnteredValue': {'stringValue': str(cell)}} for cell in row]
                } for row in data[1:]]
            }]
        }]
    }
    
    request = service.spreadsheets().create(body=spreadsheet)
    response = request.execute()
    sheet_id = response['spreadsheetId']
    sheet_url = response['spreadsheetUrl']
    
    print(f"✅ Sheet created!")
    print(f"📊 Sheet ID: {sheet_id}")
    print(f"🔗 URL: {sheet_url}")
    
    # Set permissions: anyone with link can edit
    drive_service.permissions().create(
        fileId=sheet_id,
        body={'type': 'anyone', 'role': 'writer'}
    ).execute()
    print("🔓 Anyone with the link can edit")
    
    # Apply formatting
    requests = []
    
    # Freeze first row
    requests.append({
        'updateSheetProperties': {
            'properties': {'sheetId': 0, 'gridProperties': {'frozenRowCount': 1}},
            'fields': 'gridProperties.frozenRowCount'
        }
    })
    
    # Bold header row
    requests.append({
        'repeatCell': {
            'range': {'sheetId': 0, 'startRowIndex': 0, 'endRowIndex': 1},
            'cell': {'userEnteredFormat': {'textFormat': {'bold': True}}},
            'fields': 'userEnteredFormat.textFormat.bold'
        }
    })
    
    # Data validation on column H (index 7): dropdown
    total_rows = len(data)
    if total_rows > 1:
        requests.append({
            'setDataValidation': {
                'range': {
                    'sheetId': 0,
                    'startRowIndex': 1,
                    'endRowIndex': total_rows,
                    'startColumnIndex': 7,
                    'endColumnIndex': 8
                },
                'rule': {
                    'condition': {
                        'type': 'ONE_OF_LIST',
                        'values': [
                            {'userEnteredValue': '✅ Sí, lo hago'},
                            {'userEnteredValue': '❌ No, no lo hago'},
                            {'userEnteredValue': '💡 Nunca lo pensé, investiguemos'}
                        ]
                    },
                    'showCustomUi': True
                }
            }
        })
    
    # Conditional formatting
    # Green for Sí
    requests.append({
        'addConditionalFormatRule': {
            'rule': {
                'ranges': [{'sheetId': 0, 'startRowIndex': 1, 'endRowIndex': total_rows}],
                'booleanRule': {
                    'condition': {
                        'type': 'TEXT_EQ',
                        'values': [{'userEnteredValue': '✅ Sí, lo hago'}]
                    },
                    'format': {'backgroundColor': {'red': 0.85, 'green': 0.92, 'blue': 0.83}}
                }
            },
            'index': 0
        }
    })
    
    # Red for No
    requests.append({
        'addConditionalFormatRule': {
            'rule': {
                'ranges': [{'sheetId': 0, 'startRowIndex': 1, 'endRowIndex': total_rows}],
                'booleanRule': {
                    'condition': {
                        'type': 'TEXT_EQ',
                        'values': [{'userEnteredValue': '❌ No, no lo hago'}]
                    },
                    'format': {'backgroundColor': {'red': 0.96, 'green': 0.80, 'blue': 0.80}}
                }
            },
            'index': 1
        }
    })
    
    # Yellow for Investigar
    requests.append({
        'addConditionalFormatRule': {
            'rule': {
                'ranges': [{'sheetId': 0, 'startRowIndex': 1, 'endRowIndex': total_rows}],
                'booleanRule': {
                    'condition': {
                        'type': 'TEXT_EQ',
                        'values': [{'userEnteredValue': '💡 Nunca lo pensé, investiguemos'}]
                    },
                    'format': {'backgroundColor': {'red': 1.0, 'green': 0.95, 'blue': 0.80}}
                }
            },
            'index': 2
        }
    })
    
    if requests:
        service.spreadsheets().batchUpdate(
            spreadsheetId=sheet_id,
            body={'requests': requests}
        ).execute()
        print("🎨 Formatting applied (frozen rows, dropdowns, colors)")
    
    return sheet_url

if __name__ == '__main__':
    create_sheet()

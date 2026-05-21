"""Google OAuth Setup — reads env from ~/.hermes/.env automatically."""
import os, json, sys, re
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

# Load env vars from ~/.hermes/.env
env_path = os.path.expanduser('~/.hermes/.env')
if os.path.exists(env_path):
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if line.startswith('GOOGLE_') and '=' in line:
                k, v = line.split('=', 1)
                os.environ[k] = v.strip('"').strip("'")

CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID', '')
CLIENT_SECRET = os.environ.get('GOOGLE_CLIENT_SECRET', '')

if not CLIENT_ID or not CLIENT_SECRET:
    print("❌ GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET not found in ~/.hermes/.env")
    print("   Run: echo 'GOOGLE_CLIENT_ID=\"...\"' >> ~/.hermes/.env")
    print("   Run: echo 'GOOGLE_CLIENT_SECRET=\"...\"' >> ~/.hermes/.env")
    sys.exit(1)

SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/documents',
]

CLIENT_CONFIG = {
    "installed": {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "redirect_uris": ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"]
    }
}

token_path = os.path.expanduser('~/.hermes/google_token.json')
creds = None

if os.path.exists(token_path):
    print("Found existing token — attempting refresh...")
    with open(token_path) as f:
        creds_data = json.load(f)
    from google.oauth2.credentials import Credentials as OCreds
    creds = OCreds.from_authorized_user_info(creds_data, SCOPES)
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
        print("✅ Token refreshed!")
        with open(token_path, 'w') as f:
            f.write(creds.to_json())

if not creds or not creds.valid:
    flow = InstalledAppFlow.from_client_config(CLIENT_CONFIG, SCOPES)
    
    print("\n" + "="*60)
    print("  OPEN THIS URL IN YOUR BROWSER:")
    print("="*60)
    auth_url, _ = flow.authorization_url(prompt='consent')
    print(f"\n{auth_url}\n")
    print("Log in with: weissvanderpol.ivan@gmail.com")
    print()
    
    if len(sys.argv) > 1:
        code = sys.argv[1]
        print(f"Using provided code: {code[:20]}...")
        flow.fetch_token(code=code)
        creds = flow.credentials
        with open(token_path, 'w') as f:
            f.write(creds.to_json())
        print(f"\n✅ Token saved to {token_path}")
    else:
        print("After you click Allow, copy the authorization code and run:")
        print()
        print(f"  python3 {sys.argv[0]} <paste-code-here>")
        print()
        sys.exit(1)

# Verify access
print(f"\n✅ Google OAuth setup complete!")
print(f"  Token file: {token_path}")
print(f"  Expires: {creds.expiry}")
print(f"  Scopes: {creds.scopes}")

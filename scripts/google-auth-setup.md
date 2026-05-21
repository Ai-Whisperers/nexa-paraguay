# Full Google Workspace OAuth — Setup Instructions

## What you need to do in Google Cloud Console

### Step 1: Create OAuth Credentials

1. Go to https://console.cloud.google.com/apis/credentials
2. Click **+ Create Credentials** → **OAuth client ID**
3. Application type: **Desktop app**
4. Name: `Hermes Agent`
5. Click **Create**
6. A popup shows your **Client ID** and **Client Secret**
7. **Copy both** — you won't see the secret again

### Step 2: Add to .env

Run this on your laptop terminal (or ask me to add it via the VPS):

```bash
echo 'GOOGLE_CLIENT_ID="<paste-your-client-id>"' >> ~/.hermes/.env
echo 'GOOGLE_CLIENT_SECRET="<paste-your-client-secret>"' >> ~/.hermes/.env
```

### Step 3: Enable APIs

1. Go to https://console.cloud.google.com/apis/library
2. Search and **Enable** each:
   - Google Sheets API
   - Google Drive API
   - Gmail API
   - Google Calendar API
   - Google Docs API

### Step 4: Run the Auth Flow

After the env vars are set, run this command from the **VPS terminal**:

```bash
hermes setup
```

It will print a URL. **Open that URL in your browser**, log into your Google account, click **Allow**, and you'll get a redirect URL. Paste that redirect URL back into the terminal.

### Step 5: Share the Sheet

1. Open https://docs.google.com/spreadsheets/d/11aGKyIUCAarORSt8YpUHDaFykvgf4DcfYG2K5iPXuqY/edit
2. Click **Share**
3. Add: `nexa-sheets@<project>.iam.gserviceaccount.com`
4. Set: **Editor**
5. Uncheck notify
6. Share

---

## Or: Fast Path (Service Account — no browser auth needed)

If you don't want to do the OAuth flow:

1. Go to https://console.cloud.google.com/apis/credentials
2. **+ Create Credentials** → **Service Account**
3. Name: `nexa-sheets` → Create → Done
4. Click the account → **Keys** → **Add Key** → **JSON** → downloads a file
5. Upload to VPS:
```bash
scp ~/Downloads/nexa-*.json root@72.61.44.159:/root/.hermes/google-service-account.json
```
6. Share the sheet with the service account email as Editor

That's it. No browser auth flow needed.

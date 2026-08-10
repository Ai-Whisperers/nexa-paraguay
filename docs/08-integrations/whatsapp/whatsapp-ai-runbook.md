# Messaging AI Bot Setup

This guide enables the Nexa Messaging AI bot to handle 80% of inquiries automatically.

## Prerequisites

- Evolution API is running at evolution.sunstein.cloud
- Instance for nexa-paraguay is already created
- AI personality is loaded in LightRAG mode ("ventas" persona)

## Step 1: Start the Bot

The Evolution API instance should already exist. If not, create it:

```bash
curl -X POST "http://evolution:8080/instance/create" \
  -H "Content-Type: application/json" \
  -d '{"instanceName": "nexa-paraguay-ai", "qrcode": true}'
```

## Step 2: Scan the QR Code (REQUIRED)

**This is the most important step. Without it, the bot cannot connect.**

1. On the team's phone, open **Messaging**
2. Go to **Settings → Linked Devices → Link a Device**
3. Open the QR code URL:
   ```
   evolution.sunstein.cloud/instance/qrcode/nexa-paraguay-ai
   ```
   OR via the internal Docker network:
   ```
   http://evolution:8080/instance/qrcode/nexa-paraguay-ai
   ```
4. Scan the QR code shown on the page
5. Verify: a green "connected" status appears

## Step 3: Configure Auto-Reply SLA

Run the setup script:

```bash
cd /root/nexa-paraguay
bash scripts/setup-messaging-sla.sh
```

This configures:
- Auto-reply message in English + Spanish
- Presence set to "available" 24/7
- SLA expectation: "we respond within 2 hours"

## Step 4: Test the Bot

1. Send a Messaging message to the Nexa number: **+595 982 515 138**
2. Verify you get the auto-reply within 5 seconds
3. Ask a question about residency (e.g., "How much does residency cost?")
4. Verify the AI responds with accurate information from the Nexa knowledge base

## Step 5: Set Up Monitoring

The AI conversations are logged via the Evolution API. To access logs:

```bash
docker service logs evolution_evolution_api --tail 100 | grep "nexa-paraguay-ai"
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| QR not showing | Check instance status: `curl -s http://evolution:8080/instance/fetchInstances` |
| QR expired | Restart connection: `curl -s -X DELETE http://evolution:8080/instance/logout/nexa-paraguay-ai` |
| AI not responding | Check LightRAG is seeded: verify `/root/nexa-paraguay/docs/08-integrations/messaging-ai-bridge.md` |
| Wrong language | AI uses "ventas" mode — it auto-detects user language |
| Rate limiting | Evolution API handles queue — max 50 messages/min |

## SLA Definition

| Metric | Target | Escalation |
|--------|--------|------------|
| First response | < 2 hours | If > 2h, ping team via Telegram |
| Auto-reply | < 5 seconds | N/A (automatic) |
| Resolution | < 24 hours | If > 24h, escalate to lead |
| Business hours | Mon-Fri 09:00-18:00 PYST | Weekend = next business day |

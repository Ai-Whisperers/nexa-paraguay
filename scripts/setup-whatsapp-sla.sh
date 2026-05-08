#!/bin/bash
# WhatsApp AI Auto-Reply SLA Setup — Configure via Evolution API
# Usage: ./setup-whatsapp-sla.sh [instance_name]
# Default: the Nexa WhatsApp AI instance

INSTANCE="${1:-nexa-paraguay-ai}"
EVOLUTION_URL="${EVOLUTION_URL:-http://evolution:8080}"
API_KEY="${EVOLUTION_API_KEY:-}"

echo "Configuring WhatsApp auto-reply SLA for instance: $INSTANCE"
echo "URL: $EVOLUTION_URL"

# 1. Set auto-reply (presence/away messages) via Evolution API
AUTO_REPLY_PAYLOAD='{
  "enabled": true,
  "type": "text",
  "value": "Thank you for reaching out to Nexa Paraguay! We typically respond within 2 hours during business hours (Mon-Fri 9:00-18:00 PYST). For urgent matters, please call us directly. We have received your message and will be with you shortly.\n\nGracias por contactar a Nexa Paraguay. Generalmente respondemos dentro de 2 horas en horario laboral. Hemos recibido tu mensaje y te atenderemos pronto."
}'

echo "Setting auto-reply message..."
curl -s -X PUT "$EVOLUTION_URL/instance/settings/$INSTANCE" \
  -H "Content-Type: application/json" \
  -H "apiKey: $API_KEY" \
  -d "$AUTO_REPLY_PAYLOAD" | python3 -c "import json,sys; d=json.load(sys.stdin); print(f'  Auto-reply: {d.get(\"status\",\"?\")}')" 2>/dev/null || echo "  (auto-reply API may differ — check Evolution docs)"

# 2. Set presence to "available" 24/7 for auto-reply
PRESENCE_PAYLOAD='{"presence": "available"}'
echo "Setting presence to available..."
curl -s -X PUT "$EVOLUTION_URL/instance/presence/$INSTANCE" \
  -H "Content-Type: application/json" \
  -H "apiKey: $API_KEY" \
  -d "$PRESENCE_PAYLOAD" | python3 -c "import json,sys; d=json.load(sys.stdin); print(f'  Presence: {d.get(\"status\",\"?\")}')" 2>/dev/null || echo "  (presence API may differ)"

# 3. Verify configuration
echo ""
echo "=== Verification ==="
echo "1. Open WhatsApp on your phone"
echo "2. Go to Settings → Linked Devices"
echo "3. Scan the QR code from the Evolution API dashboard"
echo "   (No QR? Check: $EVOLUTION_URL/instance/qrcode/$INSTANCE)"
echo ""
echo "4. Send a test message to the number"
echo "5. Verify you get the auto-reply within 5 seconds"
echo ""
echo "=== Quick Reference ==="
echo "Auto-reply text is set to both English and Spanish"
echo "Business hours: Mon-Fri 09:00-18:00 PYST (UTC-4)"
echo "SLA target: < 2 hours for first response"
echo "Escalation: If no response in 2 hours, notify team via Telegram"

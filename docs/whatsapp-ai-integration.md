# WhatsApp AI Agent — Integration Plan

Nexa Paraguay — relocation services. WhatsApp for client inquiries. AI can handle: visa questions, service info, document requirements.

The AI Agent at `whatsapp-ai.sunstein.cloud` handles WhatsApp conversations using DeepSeek AI with per-client memory (LightRAG) and business tools.

## Connection

The AI Agent processes messages via Evolution API instances. When a customer messages the client's WhatsApp Business number, the AI responds with:
- Context from past conversations (LightRAG graph memory)
- Accurate business info (products, pricing, policies)
- Sales scripts or support protocols based on mode

## Integration Steps

1. **Create an Evolution instance** for the client's WhatsApp Business number
2. **Seed LightRAG** with: product catalog, FAQ, pricing, policies
3. **Configure AI mode** (`ventas` for sales, `soporte` for support, `default` for general)
4. **Replace static WhatsApp number** on the website with the AI-connected number

## API Reference

- **Create client:** `POST https://whatsapp-ai.sunstein.cloud/clients`
- **List clients:** `GET https://whatsapp-ai.sunstein.cloud/clients`
- **Health check:** `GET https://whatsapp-ai.sunstein.cloud/health`

See `/root/paragu-ai-builder/docs/whatsapp-ai-integration.md` for full documentation.

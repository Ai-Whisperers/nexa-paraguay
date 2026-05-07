import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  try {
    const { nombre, email, telefono, pais, servicio, mensaje } = req.body
    // Log to console for now — replace with HubSpot API when configured
    console.log('[Contact Form]', { nombre, email, telefono, pais, servicio, mensaje })
    // TODO: POST to HubSpot CRM endpoint when credentials are available
    // await fetch('https://api.hsforms.com/submissions/v3/integration/submit/...', { method:'POST', body: JSON.stringify({...}) })
    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[Contact Form Error]', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

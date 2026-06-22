import type { Request, Response } from 'express';
import { handleContact } from '../server/contactHandler';

const requests = new Map<string, number[]>();
export default async function handler(request: Request, response: Response) {
  if (request.method !== 'POST') return response.status(405).json({ ok: false });
  const key = String(request.headers['x-forwarded-for'] || request.socket?.remoteAddress || 'unknown').split(',')[0]; const now = Date.now(); const recent = (requests.get(key) || []).filter((time) => now - time < 900000); if (recent.length >= 5) return response.status(429).json({ ok: false, error: 'Rate limit' }); recent.push(now); requests.set(key, recent);
  try { const result = await handleContact(request.body); return response.status(result.status).json(result.body); } catch { return response.status(502).json({ ok: false, error: 'Delivery failed' }); }
}

import type { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const contactSchema = z.object({
  projectType: z.string().min(2).max(80),
  budget: z.string().min(2).max(80),
  deadline: z.string().min(2).max(120),
  contactMethod: z.enum(['Email', 'Telegram']),
  name: z.string().min(2).max(120),
  email: z.string().email().max(160),
  brief: z.string().min(20).max(2000),
  company: z.string().max(0).optional(),
});

const requests = new Map<string, number[]>();
const env = (key: string) => process.env[key]?.trim();

async function deliverContact(input: unknown) {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) return { status: 400, body: { ok: false, issues: parsed.error.flatten().fieldErrors } };

  const message = [
    'New portfolio inquiry',
    `Name: ${parsed.data.name}`,
    `Email: ${parsed.data.email}`,
    `Type: ${parsed.data.projectType}`,
    `Budget: ${parsed.data.budget}`,
    `Deadline: ${parsed.data.deadline}`,
    `Contact: ${parsed.data.contactMethod}`,
    '',
    parsed.data.brief,
  ].join('\n');
  const deliveries: Promise<unknown>[] = [];

  const telegramToken = env('TELEGRAM_BOT_TOKEN');
  const telegramChatId = env('TELEGRAM_CHAT_ID');
  if (telegramToken && telegramChatId) {
    deliveries.push(fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: telegramChatId, text: message }),
    }).then(async (telegramResponse) => {
      if (!telegramResponse.ok) throw new Error(`Telegram delivery failed: ${telegramResponse.status}`);
    }));
  }

  const emailApiUrl = env('EMAIL_API_URL');
  const emailApiSecret = env('EMAIL_API_SECRET');
  const emailApiTo = env('CONTACT_TO_EMAIL') || env('EMAIL_TO') || env('SMTP_USER') || env('EMAIL_USER');
  if (emailApiUrl && emailApiSecret && emailApiTo) {
    deliveries.push(fetch(emailApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: emailApiSecret,
        to: emailApiTo,
        subject: `Portfolio inquiry — ${parsed.data.projectType}`,
        text: message,
        replyTo: parsed.data.email,
      }),
    }).then(async (emailApiResponse) => {
      const result = await emailApiResponse.json().catch(() => null);
      if (!emailApiResponse.ok || result?.ok !== true) throw new Error(`Email relay failed: ${emailApiResponse.status}`);
    }));
  }

  const smtpHost = env('SMTP_HOST') || env('EMAIL_HOST');
  const smtpPort = env('SMTP_PORT') || env('EMAIL_PORT') || '587';
  const smtpSecure = env('SMTP_SECURE') || env('EMAIL_SECURE');
  const smtpUser = env('SMTP_USER') || env('EMAIL_USER');
  const smtpPass = env('SMTP_PASS') || env('EMAIL_PASS');
  const contactTo = env('CONTACT_TO_EMAIL') || env('EMAIL_TO') || smtpUser;
  const contactFrom = env('CONTACT_FROM_EMAIL') || env('EMAIL_FROM') || smtpUser;
  if (smtpHost && smtpUser && smtpPass && contactTo) {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort),
      secure: smtpSecure === 'true',
      auth: { user: smtpUser, pass: smtpPass },
    });
    deliveries.push(transporter.sendMail({
      from: contactFrom,
      to: contactTo,
      replyTo: parsed.data.email,
      subject: `Portfolio inquiry — ${parsed.data.projectType}`,
      text: message,
    }));
  }

  if (!deliveries.length) return { status: 503, body: { ok: false, error: 'Delivery is not configured' } };
  await Promise.all(deliveries);
  return { status: 200, body: { ok: true } };
}

export default async function handler(request: Request, response: Response) {
  if (request.method !== 'POST') return response.status(405).json({ ok: false });

  const key = String(request.headers['x-forwarded-for'] || request.socket?.remoteAddress || 'unknown').split(',')[0];
  const now = Date.now();
  const recent = (requests.get(key) || []).filter((time) => now - time < 900000);
  if (recent.length >= 5) return response.status(429).json({ ok: false, error: 'Rate limit' });
  recent.push(now);
  requests.set(key, recent);

  try {
    const result = await deliverContact(request.body);
    return response.status(result.status).json(result.body);
  } catch {
    return response.status(502).json({ ok: false, error: 'Delivery failed' });
  }
}

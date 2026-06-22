import nodemailer from 'nodemailer';
import { contactSchema } from '../src/lib/contactSchema';

export async function handleContact(input: unknown) {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) return { status: 400, body: { ok: false, issues: parsed.error.flatten().fieldErrors } };
  const message = [`New portfolio inquiry`, `Name: ${parsed.data.name}`, `Email: ${parsed.data.email}`, `Type: ${parsed.data.projectType}`, `Budget: ${parsed.data.budget}`, `Deadline: ${parsed.data.deadline}`, `Contact: ${parsed.data.contactMethod}`, '', parsed.data.brief].join('\n');
  const deliveries: Promise<unknown>[] = [];
  if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) deliveries.push(fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text: message }) }).then(async (response) => { if (!response.ok) throw new Error(`Telegram delivery failed: ${response.status}`); }));
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.CONTACT_TO_EMAIL) {
    const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: process.env.SMTP_SECURE === 'true', auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } });
    deliveries.push(transporter.sendMail({ from: process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER, to: process.env.CONTACT_TO_EMAIL, replyTo: parsed.data.email, subject: `Portfolio inquiry — ${parsed.data.projectType}`, text: message }));
  }
  if (!deliveries.length) return { status: 503, body: { ok: false, error: 'Delivery is not configured' } };
  await Promise.all(deliveries);
  return { status: 200, body: { ok: true } };
}

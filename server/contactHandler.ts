import nodemailer from 'nodemailer';
import { contactSchema } from '../src/lib/contactSchema';

const env = (key: string) => process.env[key]?.trim();

export async function handleContact(input: unknown) {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) return { status: 400, body: { ok: false, issues: parsed.error.flatten().fieldErrors } };
  const message = [`New portfolio inquiry`, `Name: ${parsed.data.name}`, `Email: ${parsed.data.email}`, `Type: ${parsed.data.projectType}`, `Budget: ${parsed.data.budget}`, `Deadline: ${parsed.data.deadline}`, `Contact: ${parsed.data.contactMethod}`, '', parsed.data.brief].join('\n');
  const deliveries: Promise<unknown>[] = [];
  const telegramToken = env('TELEGRAM_BOT_TOKEN');
  const telegramChatId = env('TELEGRAM_CHAT_ID');
  if (telegramToken && telegramChatId) deliveries.push(fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: telegramChatId, text: message }) }).then(async (response) => { if (!response.ok) throw new Error(`Telegram delivery failed: ${response.status}`); }));
  const smtpHost = env('SMTP_HOST') || env('EMAIL_HOST');
  const smtpPort = env('SMTP_PORT') || env('EMAIL_PORT') || '587';
  const smtpSecure = env('SMTP_SECURE') || env('EMAIL_SECURE');
  const smtpUser = env('SMTP_USER') || env('EMAIL_USER');
  const smtpPass = env('SMTP_PASS') || env('EMAIL_PASS');
  const contactTo = env('CONTACT_TO_EMAIL') || env('EMAIL_TO') || smtpUser;
  const contactFrom = env('CONTACT_FROM_EMAIL') || env('EMAIL_FROM') || smtpUser;
  if (smtpHost && smtpUser && smtpPass && contactTo) {
    const transporter = nodemailer.createTransport({ host: smtpHost, port: Number(smtpPort), secure: smtpSecure === 'true', auth: { user: smtpUser, pass: smtpPass } });
    deliveries.push(transporter.sendMail({ from: contactFrom, to: contactTo, replyTo: parsed.data.email, subject: `Portfolio inquiry — ${parsed.data.projectType}`, text: message }));
  }
  if (!deliveries.length) return { status: 503, body: { ok: false, error: 'Delivery is not configured' } };
  await Promise.all(deliveries);
  return { status: 200, body: { ok: true } };
}

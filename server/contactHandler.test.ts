import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { handleContact } from './contactHandler';

const mailer = vi.hoisted(() => ({
  createTransport: vi.fn(),
  sendMail: vi.fn(),
}));

vi.mock('nodemailer', () => ({
  default: { createTransport: mailer.createTransport },
}));

const validInquiry = {
  projectType: 'Fix / deployment',
  budget: 'Under $500',
  deadline: 'June 2026',
  contactMethod: 'Email',
  name: 'Test User',
  email: 'test@example.com',
  brief: 'A sufficiently detailed portfolio inquiry for delivery testing.',
  company: '',
};

describe('contact handler delivery configuration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mailer.sendMail.mockResolvedValue({ messageId: 'test-message' });
    mailer.createTransport.mockReturnValue({ sendMail: mailer.sendMail });
    vi.unstubAllGlobals();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    for (const key of ['EMAIL_API_URL', 'EMAIL_API_SECRET', 'EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_SECURE', 'EMAIL_USER', 'EMAIL_PASS', 'EMAIL_FROM', 'EMAIL_TO', 'SMTP_HOST', 'SMTP_PORT', 'SMTP_SECURE', 'SMTP_USER', 'SMTP_PASS', 'CONTACT_FROM_EMAIL', 'CONTACT_TO_EMAIL']) {
      delete process.env[key];
    }
  });

  it('uses the HTTPS email relay when EMAIL_API_URL and EMAIL_API_SECRET are configured', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ ok: true }),
    });
    vi.stubGlobal('fetch', fetchMock);
    process.env.EMAIL_API_URL = 'https://example.com/email-relay';
    process.env.EMAIL_API_SECRET = 'relay-secret';
    process.env.CONTACT_TO_EMAIL = 'owner@example.com';

    const result = await handleContact(validInquiry);

    expect(result).toEqual({ status: 200, body: { ok: true } });
    expect(fetchMock).toHaveBeenCalledWith('https://example.com/email-relay', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }));
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual(expect.objectContaining({
      secret: 'relay-secret',
      to: 'owner@example.com',
      subject: 'Portfolio inquiry — Fix / deployment',
      replyTo: 'test@example.com',
    }));
  });

  it('uses TaskFlow-style EMAIL_* variables as an SMTP fallback', async () => {
    process.env.EMAIL_HOST = 'smtp.gmail.com';
    process.env.EMAIL_PORT = '587';
    process.env.EMAIL_SECURE = 'false';
    process.env.EMAIL_USER = 'owner@example.com';
    process.env.EMAIL_PASS = 'app-password';
    process.env.EMAIL_FROM = 'Portfolio <owner@example.com>';

    const result = await handleContact(validInquiry);

    expect(result).toEqual({ status: 200, body: { ok: true } });
    expect(mailer.createTransport).toHaveBeenCalledWith({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: { user: 'owner@example.com', pass: 'app-password' },
    });
    expect(mailer.sendMail).toHaveBeenCalledWith(expect.objectContaining({
      from: 'Portfolio <owner@example.com>',
      to: 'owner@example.com',
      replyTo: 'test@example.com',
    }));
  });
});

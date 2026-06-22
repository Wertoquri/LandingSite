import { describe, expect, it } from 'vitest';
import { contactSchema } from './contactSchema';

const valid = { projectType: 'Web application', budget: '$1,000–3,000', deadline: 'September 2026', contactMethod: 'Email', name: 'Test User', email: 'test@example.com', brief: 'A sufficiently detailed project brief for validation.', company: '' };
describe('contact schema', () => { it('accepts a complete inquiry', () => expect(contactSchema.safeParse(valid).success).toBe(true)); it('rejects spam honeypot and weak input', () => expect(contactSchema.safeParse({ ...valid, brief: 'short', company: 'bot' }).success).toBe(false)); });

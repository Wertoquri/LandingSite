import { useState, type ChangeEvent, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { siteConfig } from '../config/site';
import { useI18n } from '../i18n';
import { track } from '../lib/analytics';
import { contactSchema, type ContactPayload } from '../lib/contactSchema';
import { Seo } from '../lib/seo';

const initial: ContactPayload = { projectType: '', budget: '', deadline: '', contactMethod: 'Email', name: '', email: '', brief: '', company: '' };

export default function Contact() {
  const { t } = useI18n(); const navigate = useNavigate();
  const [form, setForm] = useState(initial); const [status, setStatus] = useState<'idle'|'sending'|'error'>('idle'); const [errors, setErrors] = useState<Record<string,string>>({});
  const change = (event: ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => { setForm({...form, [event.target.name]: event.target.value}); };
  const submit = async (event: FormEvent) => { event.preventDefault(); const parsed = contactSchema.safeParse(form); if (!parsed.success) { setErrors(Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message]))); return; } setErrors({}); setStatus('sending'); try { const response = await fetch('/api/contact', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(parsed.data) }); if (!response.ok) throw new Error('Request failed'); track('contact_submit'); navigate('/thank-you'); } catch { setStatus('error'); } };
  const fieldError = (key: keyof ContactPayload) => errors[key] ? <span className="field-error" role="alert">{errors[key]}</span> : null;
  return <div className="contact-page section-pad"><Seo title={t.nav.contact} path="/contact"/><header className="page-hero"><p className="eyebrow">{t.contact.eyebrow}</p><h1>{t.contact.title}</h1><p>{t.contact.intro}</p></header><div className="contact-layout"><aside><div className="availability-card"><CheckCircle2/><p>{t.contact.availability}</p></div><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><small>{siteConfig.location} / EET</small></aside><form onSubmit={submit} onFocus={() => track('contact_start')} noValidate>
    <div className="form-row"><label>{t.contact.projectType}<select name="projectType" value={form.projectType} onChange={change} aria-invalid={!!errors.projectType}><option value="">—</option>{t.contact.typeOptions.map(x=><option key={x}>{x}</option>)}</select>{fieldError('projectType')}</label><label>{t.contact.budget}<select name="budget" value={form.budget} onChange={change} aria-invalid={!!errors.budget}><option value="">—</option>{t.contact.budgetOptions.map(x=><option key={x}>{x}</option>)}</select>{fieldError('budget')}</label></div>
    <div className="form-row"><label>{t.contact.deadline}<input name="deadline" value={form.deadline} onChange={change} placeholder="e.g. September 2026" aria-invalid={!!errors.deadline}/>{fieldError('deadline')}</label><fieldset><legend>{t.contact.method}</legend><div className="radio-row">{t.contact.methodOptions.map(x=><label key={x}><input type="radio" name="contactMethod" value={x} checked={form.contactMethod===x} onChange={change}/><span>{x}</span></label>)}</div></fieldset></div>
    <div className="form-row"><label>{t.contact.name}<input name="name" autoComplete="name" value={form.name} onChange={change} aria-invalid={!!errors.name}/>{fieldError('name')}</label><label>{t.contact.email}<input name="email" type="email" inputMode="email" autoComplete="email" value={form.email} onChange={change} aria-invalid={!!errors.email}/>{fieldError('email')}</label></div>
    <label>{t.contact.brief}<textarea name="brief" rows={7} value={form.brief} onChange={change} aria-invalid={!!errors.brief}/>{fieldError('brief')}</label><label className="honeypot" aria-hidden="true">Company<input name="company" tabIndex={-1} autoComplete="off" value={form.company} onChange={change}/></label>
    <div className="form-submit"><small>{t.contact.consent}</small><button className="button primary" disabled={status==='sending'}>{status==='sending'?t.contact.sending:t.contact.submit}<ArrowRight/></button></div>{status==='error'&&<p className="submit-error" role="alert">{t.contact.error}</p>}
  </form></div></div>;
}

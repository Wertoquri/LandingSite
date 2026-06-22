import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { Seo } from '../lib/seo';

export function Privacy() { const {t}=useI18n(); return <div className="static-page section-pad"><Seo title={t.footer.privacy} path="/privacy"/><p className="eyebrow">LEGAL / 01</p><h1>{t.privacy.title}</h1><p>{t.privacy.body}</p><Link to="/"><ArrowLeft/>{t.common.backHome}</Link></div>; }
export function ThankYou() { const {t}=useI18n(); return <div className="static-page thank-you section-pad"><Seo title={t.thankYou.title} path="/thank-you"/><div className="success-ring">✓</div><h1>{t.thankYou.title}</h1><p>{t.thankYou.body}</p><Link className="button secondary" to="/"><ArrowLeft/>{t.common.backHome}</Link></div>; }

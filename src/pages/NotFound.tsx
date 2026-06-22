import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { Seo } from '../lib/seo';

export default function NotFound(){const {t}=useI18n();return <div className="not-found section-pad"><Seo title="404"/><div className="lost-grid" aria-hidden="true"/><p className="eyebrow">{t.notFound.code}</p><h1>{t.notFound.title}</h1><p>{t.notFound.body}</p><Link className="button secondary" to="/"><ArrowLeft/>{t.common.backHome}</Link></div>}

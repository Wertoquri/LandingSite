import { Download } from 'lucide-react';
import { siteConfig } from '../config/site';
import { useI18n } from '../i18n';
import { Seo } from '../lib/seo';

export default function About() {
  const { t } = useI18n();
  return <div className="page section-pad"><Seo title={t.nav.about} path="/about"/><header className="page-hero"><p className="eyebrow">{t.about.eyebrow}</p><h1>{t.about.title}</h1><p>{t.about.lead}</p></header><div className="about-grid"><section><span>01</span><h2>{t.about.principles}</h2><ul>{t.about.principleItems.map((item) => <li key={item}>{item}</li>)}</ul></section><section><span>02</span><h2>{t.about.style}</h2><p>{t.about.styleBody}</p></section><section><span>03</span><h2>{t.about.learning}</h2><p>{t.about.learningBody}</p></section><section><span>04</span><h2>{t.about.stack}</h2><p>JavaScript · TypeScript · React · Node.js · Express · MySQL · PostgreSQL · Redux · Git/GitHub · Unity basics</p></section></div><a className="button secondary" href={siteConfig.resumeUrl} download><Download />{t.about.resume}</a></div>;
}

import { ArrowLeft, ArrowRight, ExternalLink, Github } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { projects } from '../config/site';
import { useI18n } from '../i18n';
import { track } from '../lib/analytics';
import { Seo } from '../lib/seo';
import NotFound from './NotFound';

export default function CaseStudy() {
  const { slug } = useParams();
  const { t, locale } = useI18n();
  const index = projects.findIndex((item) => item.slug === slug);
  if (index < 0) return <NotFound />;
  const project = projects[index]; const copy = project.facts[locale];
  const previous = projects[(index - 1 + projects.length) % projects.length]; const next = projects[(index + 1) % projects.length];
  return <article className="case-page">
    <Seo title={project.name} description={copy.summary} path={`/work/${project.slug}`}/>
    <header className="case-hero section-pad"><div className="case-kicker"><span>{project.index} / {project.year}</span><span className={`status ${project.status}`}>{project.status === 'demo' ? t.common.demoLabel : t.common.confirmedLabel}</span></div><h1>{project.name}</h1><p>{copy.summary}</p><ul>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul></header>
    <div className={`case-cover art-${project.slug}`}><div className="cover-grid"/><strong>{project.name.slice(0, 2)}</strong><span>PRODUCT SYSTEM / {project.index}</span></div>
    <div className="case-content section-pad">
      <section><p className="section-index">01 / {t.case.context}</p><h2>{t.case.challenge}</h2><p className="large-copy">{copy.challenge}</p><p>{copy.solution}</p></section>
      <section className="split"><div><p className="section-index">02 / {t.case.responsibilities}</p><h2>{t.case.responsibilities}</h2><ul className="number-list">{copy.responsibilities.map((item, i) => <li key={item}><span>{String(i+1).padStart(2,'0')}</span>{item}</li>)}</ul></div><div><p className="section-index">03 / {t.case.flows}</p><h2>{t.case.flows}</h2><ul className="number-list">{copy.flows.map((item, i) => <li key={item}><span>{String(i+1).padStart(2,'0')}</span>{item}</li>)}</ul></div></section>
      <section><p className="section-index">04 / {t.case.architecture}</p><h2>{t.case.architecture}</h2><div className="architecture" role="img" aria-label={`${project.name} architecture diagram`}><div>CLIENT<br/><small>React UI</small></div><i/><div>API<br/><small>Express / validation</small></div><i/><div>DATA<br/><small>SQL / services</small></div></div></section>
      <section><p className="section-index">05 / {t.case.gallery}</p><h2>{t.case.gallery}</h2><div className="screen-grid">{project.screenshots.map((src, screenshotIndex) => <figure className="project-screen" key={src}><span>{String(screenshotIndex + 1).padStart(2, '0')} / {screenshotIndex === 0 ? 'OVERVIEW' : 'DETAIL'}</span><img src={src} alt={`${project.name} ${screenshotIndex === 0 ? 'overview' : 'detail'} screen`} loading="lazy"/></figure>)}</div></section>
      <section className="split"><div><p className="section-index">06 / {t.case.decisions}</p><h2>{t.case.decisions}</h2><ul className="decision-list">{copy.decisions.map((item) => <li key={item}>{item}</li>)}</ul></div><div><p className="section-index">07 / {t.case.verification}</p><h2>{t.case.verification}</h2><ul className="decision-list muted">{copy.verification.map((item) => <li key={item}>{item}</li>)}</ul></div></section>
      <section className="outcome"><p className="section-index">08 / {t.case.outcome}</p><h2>{copy.outcome}</h2><div className="case-ctas">{project.liveUrl ? <a className="button primary" href={project.liveUrl} target="_blank" rel="noreferrer" onClick={() => track('live_demo_click', {project: project.slug})}>{t.common.live}<ExternalLink/></a> : <span>{t.case.unavailable}</span>}{project.repoUrl && <a className="button secondary" href={project.repoUrl} target="_blank" rel="noreferrer" onClick={() => track('github_click', {project: project.slug})}><Github/>{t.common.github}</a>}</div></section>
    </div>
    <nav className="case-nav" aria-label="Project navigation"><Link to={`/work/${previous.slug}`}><ArrowLeft/><span>{t.common.previous}</span><strong>{previous.name}</strong></Link><Link to={`/work/${next.slug}`}><span>{t.common.next}</span><strong>{next.name}</strong><ArrowRight/></Link></nav>
  </article>;
}

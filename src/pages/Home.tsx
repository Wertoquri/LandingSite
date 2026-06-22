import { ArrowDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HeroVisual } from '../components/HeroVisual';
import { ProjectCard } from '../components/ProjectCard';
import { processSteps, projects, services, siteConfig } from '../config/site';
import { useI18n } from '../i18n';
import { Seo } from '../lib/seo';

export default function Home() {
  const { t } = useI18n();
  return <>
    <Seo />
    <section className="hero section-pad">
      <div className="hero-copy">
        <p className="eyebrow">{t.home.eyebrow}</p>
        <h1>{t.home.titleA}<br/><em>{t.home.titleB}</em></h1>
        <div className="hero-bottom"><p>{t.home.intro}</p><div className="cta-row"><Link className="button primary" to="/contact">{t.home.primaryCta}<ArrowRight /></Link><a className="button secondary" href="#work">{t.home.secondaryCta}<ArrowDown /></a></div></div>
      </div>
      <HeroVisual />
      <div className="availability"><i className={siteConfig.availability ? 'active' : ''}/>{siteConfig.availability ? t.common.available : t.common.unavailable}</div>
    </section>

    <section className="section-pad work" id="work">
      <header className="section-heading"><p className="section-index">01 / WORK</p><div><h2>{t.home.workTitle}</h2><p>{t.home.workIntro}</p></div></header>
      <div className="projects">{projects.map((project) => <ProjectCard project={project} key={project.slug}/>)}</div>
    </section>

    <section className="section-pad services" id="services">
      <header className="section-heading"><p className="section-index">02 / SERVICES</p><div><h2>{t.home.servicesTitle}</h2><p>{t.home.servicesIntro}</p></div></header>
      <div className="service-grid">{services.map((service) => <article key={service.key}><span>{service.number}</span><h3>{t.services[service.key].title}</h3><p>{t.services[service.key].body}</p></article>)}</div>
    </section>

    <section className="section-pad process">
      <header className="section-heading compact"><p className="section-index">03 / PROCESS</p><h2>{t.home.processTitle}</h2></header>
      <ol>{processSteps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{t.process[step]}</li>)}</ol>
    </section>

    <section className="section-pad evidence"><div className="evidence-mark">JS<span>+</span></div><div><p className="section-index">04 / CAPABILITY</p><h2>{t.home.evidenceTitle}</h2><p>{t.home.evidenceBody}</p><div className="stack-line">React / Node.js / Express / SQL / Git / AI-assisted delivery</div></div></section>

    <section className="section-pad about-strip"><p className="section-index">05 / ABOUT</p><h2>{t.home.aboutTitle}</h2><div><p>{t.home.aboutBody}</p><Link to="/about">{t.nav.about}<ArrowRight /></Link></div></section>

    <section className="inquiry section-pad"><p className="section-index">06 / START</p><h2>{t.home.inquiryTitle}</h2><p>{t.home.inquiryBody}</p><Link className="button light" to="/contact">{t.home.primaryCta}<ArrowRight /></Link></section>
  </>;
}

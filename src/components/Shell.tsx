import { useEffect, useState, type ReactNode } from 'react';
import { ArrowUpRight, Check, Clipboard, Github, Menu, Moon, Sun, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navigation, siteConfig } from '../config/site';
import { useI18n } from '../i18n';
import { track } from '../lib/analytics';

export function Shell({ children }: { children: ReactNode }) {
  const { t, locale, toggleLocale } = useI18n();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const location = useLocation();

  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('theme', theme); }, [theme]);
  useEffect(() => { setOpen(false); window.scrollTo({ top: 0, behavior: 'instant' }); }, [location.pathname]);
  const copyEmail = async () => { await navigator.clipboard.writeText(siteConfig.email); setCopied(true); window.setTimeout(() => setCopied(false), 1800); };

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <Link to="/" className="brand" aria-label={`${siteConfig.name} — home`}><span>{siteConfig.monogram}</span><i /></Link>
      <nav className={open ? 'nav open' : 'nav'} aria-label="Primary navigation">
        {navigation.map((item) => item.href.startsWith('/#')
          ? <a key={item.key} href={item.href}>{t.nav[item.key]}</a>
          : <NavLink key={item.key} to={item.href}>{t.nav[item.key]}</NavLink>)}
      </nav>
      <div className="header-tools">
        <button className="text-control" onClick={toggleLocale} aria-label={t.common.language}>{locale === 'uk' ? 'EN' : 'UK'}</button>
        <button className="icon-control" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={t.common.theme}>{theme === 'dark' ? <Sun /> : <Moon />}</button>
        <button className="icon-control menu-control" onClick={() => setOpen(!open)} aria-label={open ? t.common.close : t.common.menu} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
      </div>
    </header>
    <main id="main">{children}</main>
    <footer className="footer">
      <div><Link to="/" className="footer-brand">{siteConfig.name}<span>.</span></Link><p>{t.footer.note}</p></div>
      <div className="footer-contact"><span>{t.nav.contact}</span><button onClick={copyEmail}>{copied ? <Check /> : <Clipboard />}{copied ? t.common.copied : siteConfig.email}</button></div>
      <div className="footer-links"><a href={siteConfig.socials.github} target="_blank" rel="noreferrer" onClick={() => track('github_click')}><Github /> GitHub <ArrowUpRight /></a><Link to="/privacy">{t.footer.privacy}</Link></div>
      <small>© {new Date().getFullYear()} {siteConfig.name}</small>
    </footer>
  </>;
}

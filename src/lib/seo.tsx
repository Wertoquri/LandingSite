import { useEffect } from 'react';
import { seo, siteConfig } from '../config/site';

export function Seo({ title, description = seo.description, path = '/' }: { title?: string; description?: string; path?: string }) {
  useEffect(() => {
    document.title = title ? `${title} — ${siteConfig.name}` : seo.defaultTitle;
    const setMeta = (selector: string, attribute: string, value: string) => { let node = document.querySelector<HTMLMetaElement>(selector); if (!node) { node = document.createElement('meta'); const [key, raw] = selector.match(/\[(.+?)=['"](.+?)['"]\]/)?.slice(1) || []; if (key && raw) node.setAttribute(key, raw); document.head.appendChild(node); } node.setAttribute(attribute, value); };
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', document.title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', `${siteConfig.baseUrl}${path}`);
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]'); if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); } canonical.href = `${siteConfig.baseUrl}${path}`;
    let script = document.querySelector<HTMLScriptElement>('script[data-portfolio-schema]'); if (!script) { script = document.createElement('script'); script.type = 'application/ld+json'; script.dataset.portfolioSchema = 'true'; document.head.appendChild(script); } script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': ['Person', 'ProfessionalService'], name: siteConfig.name, url: siteConfig.baseUrl, email: siteConfig.email, areaServed: 'Worldwide', knowsAbout: ['JavaScript', 'React', 'Node.js', 'Web development'], sameAs: [siteConfig.socials.github] });
  }, [title, description, path]);
  return null;
}

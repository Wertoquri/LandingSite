import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../config/site';
import { useI18n } from '../i18n';
import { track } from '../lib/analytics';

export function ProjectCard({ project }: { project: Project }) {
  const { t, locale } = useI18n();
  const copy = project.facts[locale];
  return <article className="project-card">
    <div className="project-meta"><span>{project.index} / {project.year}</span><span>{project.type}</span></div>
    <Link className={`project-art art-${project.slug}`} to={`/work/${project.slug}`} aria-label={`${t.common.viewProject}: ${project.name}`} onClick={() => track('case_study_open', { project: project.slug })}><img src={project.screenshots[0]} alt="" loading="lazy"/><span>{project.name}</span></Link>
    <div className="project-copy"><div><h3>{project.name}</h3><p>{copy.summary}</p></div><ul>{project.stack.slice(0, 4).map((item) => <li key={item}>{item}</li>)}</ul></div>
    <div className="project-actions">
      <Link to={`/work/${project.slug}`} onClick={() => track('case_study_open', { project: project.slug })}>{t.common.viewProject}<ArrowRight /></Link>
      {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" onClick={() => track('live_demo_click', { project: project.slug })}><ExternalLink /><span className="sr-only">{t.common.live}</span></a>}
      {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer" onClick={() => track('github_click', { project: project.slug })}><Github /><span className="sr-only">{t.common.github}</span></a>}
    </div>
  </article>;
}

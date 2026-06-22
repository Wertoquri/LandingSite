import { describe, expect, it } from 'vitest';
import { projects, validateSiteConfig } from './site';

describe('site config', () => {
  it('has safe structural defaults', () => { expect(validateSiteConfig()).toEqual({ hasValidEmail: true, hasAbsoluteBaseUrl: true, projectSlugsUnique: true }); });
  it('keeps unknown project links explicit', () => { expect(projects.every((project) => project.liveUrl === null || project.liveUrl.startsWith('https://'))).toBe(true); expect(projects.every((project) => project.repoUrl === null || project.repoUrl.startsWith('https://'))).toBe(true); });
});

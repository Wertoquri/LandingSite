export type AnalyticsEvent = 'case_study_open' | 'live_demo_click' | 'github_click' | 'contact_start' | 'contact_submit';
export function track(event: AnalyticsEvent, data: Record<string, string> = {}) {
  if (import.meta.env.DEV) console.info('[analytics]', event, data);
  window.dispatchEvent(new CustomEvent('portfolio:analytics', { detail: { event, data } }));
}

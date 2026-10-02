// Consent-gated direct GA4 events. Only a fixed event name reaches the tag;
// form answers, labels, revenue bands and arbitrary payloads are never forwarded.
type DataLayerEvent =
  | { event: 'lead_form_submit'; revenue?: string; when?: string }
  | { event: 'audit_view' }
  | { event: 'kiosk_opened'; kiosk: 'command-center' | 'errorlens' | 'onboarding' | 'hub' }
  | { event: 'cta_clicked'; label: string; location: string };

declare global {
  interface Window {
    siteAnalytics?: {
      openPreferences(): void;
      track(eventName: DataLayerEvent['event']): void;
    };
  }
}

export function track(event: DataLayerEvent): void {
  if (typeof window === 'undefined') return;
  window.siteAnalytics?.track(event.event);
}

/** Honeypot requests receive a bot-facing 2xx but never become real leads. */
export function trackLeadSubmission(responseOk: boolean, isHoneypot: boolean): void {
  if (responseOk && !isHoneypot) track({ event: 'lead_form_submit' });
}

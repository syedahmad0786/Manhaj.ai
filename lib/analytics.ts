// Typed dataLayer helpers. The GTM container is configured in app/layout.tsx;
// these helpers are no-ops when the container hasn't loaded.
type DataLayerEvent =
  | { event: 'lead_form_submit'; revenue?: string; when?: string }
  | { event: 'audit_view' }
  | { event: 'kiosk_opened'; kiosk: 'command-center' | 'errorlens' | 'onboarding' | 'hub' }
  | { event: 'cta_clicked'; label: string; location: string };

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function track(event: DataLayerEvent): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

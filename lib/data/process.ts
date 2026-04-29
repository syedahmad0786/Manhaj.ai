// How a Manhaj install runs — five steps. Brand-aligned, derived from
// the AOS-001 lifecycle that ships with each engagement.
export const PROCESS = [
  {
    num: '01',
    title: 'Audit',
    body: 'Founder-led 45-minute audit. Map the existing stack, find the breaks, see whether AOS-001 fits.',
  },
  {
    num: '02',
    title: 'Architect',
    body: 'Bespoke install architecture. The 6-layer foundation is universal; modules on top are configured to your operations.',
  },
  {
    num: '03',
    title: 'Install',
    body: '2–4 week build. Capture, qualify, engage, convert wired in sequence; intelligence layer last so it sees the live data.',
  },
  {
    num: '04',
    title: 'Calibrate',
    body: 'First 30 days post-install. Watch live volume hit each layer. Tune, route, escalate. The OS settles into the business.',
  },
  {
    num: '05',
    title: 'Operate',
    body: 'Retainer cadence. Quarterly architecture review, ongoing optimization, direct line to the architect.',
  },
] as const;

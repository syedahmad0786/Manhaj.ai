// AOS-001 — Manhaj's 6-layer revenue foundation. Lifted verbatim from
// Manhaj-Brand-Positioning-One-Pager.md §02.
export type Layer = {
  num: string;
  name: string;
  function: string;
  detail: string;
  channels: string[];
};

export const LAYERS: readonly Layer[] = [
  {
    num: '01',
    name: 'Capture',
    function: 'Inbound · Ad · Referral · Web — every lead source unified',
    detail:
      'One pipeline, every channel. Forms, ads, calls, walk-ins, referrals — captured into a single qualified record without operator copy-paste.',
    channels: ['Inbound', 'Ad', 'Referral', 'Web'],
  },
  {
    num: '02',
    name: 'Qualify',
    function: 'Score · Enrich · Route — AI scoring inside 30 seconds',
    detail:
      'Every lead scored and routed in under a half-minute. The right rep, the right script, the right offer — no guesswork.',
    channels: ['Score', 'Enrich', 'Route'],
  },
  {
    num: '03',
    name: 'Engage',
    function:
      'SMS · Voice · Email · WhatsApp — multi-channel response inside 60 seconds',
    detail:
      'Reach inside a minute, on the channel they came from. Cold reach kills deals; speed-of-touch is the foundation of conversion.',
    channels: ['SMS', 'Voice', 'Email', 'WhatsApp'],
  },
  {
    num: '04',
    name: 'Convert',
    function: 'Book · Contract · Pay — booked call to first payment, automated',
    detail:
      'From booked call to signed contract to first payment, automated. The bridge that turns a closed call into a running engagement.',
    channels: ['Book', 'Contract', 'Pay'],
  },
  {
    num: '05',
    name: 'Retain',
    function:
      'Nurture · Reactivate · Upsell — dormant warmed, past clients reactivated',
    detail:
      "Nurture sequences keep new clients warm. Reactivation campaigns wake the dormant. Upsell triggers fire the moment a client's ready for more.",
    channels: ['Nurture', 'Reactivate', 'Upsell'],
  },
  {
    num: '06',
    name: 'Intelligence',
    function: 'Dashboards · Alerts · Attribution — founder-grade visibility',
    detail:
      'Founder-grade dashboards, real-time alerts, true source attribution. You see what every dollar is doing — without asking your team to assemble it.',
    channels: ['Dashboards', 'Alerts', 'Attribution'],
  },
] as const;

// 6-Layer data — used on Home + Foundation. Lifted verbatim from the
// Antigravity bundle (see .extracted-source/002_*.jsx).
export type Layer = {
  id: string;
  name: string;
  sub: string;
  summary: string;
  detail: string;
  modules: string[];
  tools: string[];
};

export const LAYERS: readonly Layer[] = [
  {
    id: '01', name: 'Capture',
    sub: 'Inbound · Ad · Referral · Web',
    summary: 'Every lead source unified into a single intake. No leads lost in inboxes, missed calls, or weekend DMs.',
    detail: 'A single source-of-truth ingress for every signal: web forms, ad platforms, referrals, missed calls, inbound DMs, partner APIs. Normalized, deduped, timestamped, and routed in real time.',
    modules: ['Web forms', 'Ad platform webhooks', 'Missed-call capture', 'WhatsApp / DM ingest', 'Referral attribution', 'Partner APIs'],
    tools: ['n8n', 'GHL', 'Webhooks', 'Twilio', 'Meta CAPI'],
  },
  {
    id: '02', name: 'Qualify',
    sub: 'Score · Enrich · Route',
    summary: 'AI scoring against your ICP within 30 seconds of capture. Unqualified gets nurture; qualified gets routed — instantly.',
    detail: 'Every captured lead is enriched and scored against your custom ICP within 30 seconds. Routing is deterministic: qualified leads page a human or an AI agent; unqualified leads enter the nurture engine. No spreadsheet roulette.',
    modules: ['ICP scoring', 'Firmographic enrichment', 'Behavioural signals', 'Routing rules', 'Owner assignment'],
    tools: ['Claude', 'Clearbit', 'Apollo', 'GHL', 'Airtable'],
  },
  {
    id: '03', name: 'Engage',
    sub: 'SMS · Voice · Email · WhatsApp',
    summary: 'Multi-channel response inside 60 seconds. Voice agent picks up missed calls. Memory persists across channels.',
    detail: 'Speed-to-lead under 60 seconds, every time. AI voice agent answers missed calls. SMS, email, WhatsApp converge on a single thread. Conversation memory is shared across every channel and every human handoff.',
    modules: ['Voice AI agent (VAPI)', 'SMS automation', 'Email sequences', 'WhatsApp Business API', 'Unified inbox'],
    tools: ['VAPI', 'Twilio', 'Resend', 'GHL', 'Claude'],
  },
  {
    id: '04', name: 'Convert',
    sub: 'Book · Contract · Pay',
    summary: 'Booked call to signed agreement to first payment — automated. Drop-off alerts trigger follow-up.',
    detail: 'Every conversion step is automated and observed. Booked call → reminder cadence → contract generation → ESign → invoice → payment. Stage progression is automatic; drop-offs trigger immediate follow-up — by AI or human, depending on stage.',
    modules: ['Calendar booking', 'Contract generation', 'eSign', 'Stripe / payment', 'Pipeline progression', 'Drop-off alerts'],
    tools: ['Cal.com', 'PandaDoc', 'Stripe', 'GHL', 'n8n'],
  },
  {
    id: '05', name: 'Retain',
    sub: 'Nurture · Reactivate · Upsell',
    summary: 'Dormant leads warmed monthly. Past clients reactivated quarterly. Upsell triggers fire on behaviour — not memory.',
    detail: "The retention engine treats your CRM as a living asset. Dormant leads receive value-led nurture. Past clients are re-engaged on a quarterly cadence. Behavioural signals — not a salesperson's memory — trigger upsell and renewal.",
    modules: ['Nurture sequences', 'Reactivation campaigns', 'Behavioural triggers', 'NPS + feedback loops', 'Upsell flows'],
    tools: ['GHL', 'Customer.io', 'Claude', 'Mixpanel'],
  },
  {
    id: '06', name: 'Intelligence',
    sub: 'Dashboards · Alerts · Attribution',
    summary: 'A single founder-grade dashboard surfacing pipeline health, source-level CAC, response-time SLAs, revenue attribution.',
    detail: 'One dashboard. Every metric that matters. Source-level CAC, channel ROAS, response-time SLAs, pipeline velocity, revenue attribution. Anomalies and stalls trigger alerts before they cost money.',
    modules: ['Pipeline dashboard', 'CAC + LTV', 'Response-time SLAs', 'Anomaly alerts', 'Attribution model'],
    tools: ['Supabase', 'Metabase', 'Claude', 'Slack alerts'],
  },
] as const;

'use client';

import { useEffect } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';

const FALLBACK_USERNAME = 'ahmadbukhari/manhaj-discovery';

export default function CalEmbed() {
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK ?? FALLBACK_USERNAME;

  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal('ui', {
        theme: 'dark',
        cssVarsPerTheme: {
          light: { 'cal-brand': '#C9A961' },
          dark: { 'cal-brand': '#C9A961' },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

  return (
    <div className="border border-line bg-ink-2/30 p-2">
      <Cal
        calLink={calLink}
        style={{ width: '100%', height: '660px', minHeight: '500px' }}
        config={{ theme: 'dark', layout: 'month_view' }}
      />
    </div>
  );
}

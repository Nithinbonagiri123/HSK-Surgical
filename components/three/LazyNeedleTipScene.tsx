'use client';

import dynamic from 'next/dynamic';

export const LazyNeedleTipScene = dynamic(
  () => import('./NeedleTipScene').then((m) => m.NeedleTipScene),
  { ssr: false, loading: () => <div className="h-full w-full" aria-hidden /> },
);

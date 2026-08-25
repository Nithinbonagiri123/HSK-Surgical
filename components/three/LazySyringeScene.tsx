'use client';

import dynamic from 'next/dynamic';

export const LazySyringeScene = dynamic(
  () => import('./SyringeScene').then((m) => m.SyringeScene),
  { ssr: false, loading: () => <div className="h-full w-full" aria-hidden /> },
);

export type DeviceTier = 'high' | 'medium' | 'low';

export function getDeviceTier(): DeviceTier {
  if (typeof window === 'undefined') return 'high';

  let tier: DeviceTier = 'high';

  const nav = navigator as unknown as { connection?: { effectiveType?: string } };
  const connection = nav.connection;
  if (connection && (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g')) {
    return 'low';
  }

  const cores = navigator.hardwareConcurrency || 4;
  if (cores >= 8) {
    tier = 'high';
  } else if (cores >= 4) {
    tier = 'medium';
  } else {
    tier = 'low';
  }

  if (window.innerWidth < 768 && tier === 'high') {
    tier = 'medium';
  }

  return tier;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

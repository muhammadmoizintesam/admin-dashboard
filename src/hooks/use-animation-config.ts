'use client';

import { useSettings } from '@/context/SettingsContext';

/**
 * When animationsEnabled is false: no animation anywhere (duration 0, no hover/tap).
 * hoverEffects is kept for settings UI but hover animation is disabled project-wide via CSS.
 */
export function useAnimationConfig() {
  const { settings } = useSettings();
  const enabled = settings.animationsEnabled && !settings.reduceMotion;
  const hoverOn = false; /* hover animation disabled project-wide */
  const subtle = settings.hoverEffects === 'subtle';

  const duration = settings.animationSpeed === 'fast' ? 0.15 : settings.animationSpeed === 'slow' ? 0.4 : 0.25;

  return {
    enabled,
    hoverOn,
    subtle,
    duration,
    transition: enabled ? { duration, ease: 'easeOut' as const } : { duration: 0 },
    hoverScale: 1,
    tapScale: 1,
  };
}

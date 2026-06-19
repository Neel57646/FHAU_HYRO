/**
 * Shared motion language for the Furever Happy storefront.
 *
 * One easing curve, used everywhere, is what makes choreography feel
 * intentional rather than assembled. [0.22, 1, 0.36, 1] is a soft "ease-out
 * expo" — it starts with confidence and settles gently, which reads as calm.
 */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Entrance durations live in the 0.6–1.2s range; micro-interactions in 0.2–0.3s.
export const DURATION = {
  micro: 0.25,
  entrance: 0.8,
  slow: 1.1,
} as const;

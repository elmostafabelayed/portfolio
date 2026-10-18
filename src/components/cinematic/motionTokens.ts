// Official Color Palette & Motion Design Tokens for EM. Cinematic Experience

export const PALETTE = {
  italianRoast: '#280B0F',
  tamarind: '#3B1319',
  rubine: '#8D3A3C',
  boho: '#7B694E',
  camelCoat: '#C6B39A',
  warmIvory: '#FAF5EF',
  warmIvoryMuted: 'rgba(250, 245, 239, 0.72)',
  borderCamel: 'rgba(198, 179, 154, 0.22)',
  borderRubine: 'rgba(141, 58, 60, 0.5)',
} as const;

// Restrained, luxury editorial easing curves (Cubic Bezier)
export const EASING = {
  // Velvety editorial ease out (primary deceleration)
  editorial: [0.22, 1, 0.36, 1] as const,
  // High-precision mask reveal curve (sharp onset, smooth settle)
  mask: [0.16, 1, 0.3, 1] as const,
  // Architectural line drawing curve
  architectural: [0.25, 1, 0.5, 1] as const,
  // Luxury transition curve
  luxury: [0.76, 0, 0.24, 1] as const,
  // Subtle micro-interaction hover
  hover: [0.22, 1, 0.36, 1] as const,
};

export const TIMING = {
  staggerCharacter: 0.02,
  staggerWord: 0.08,
  staggerCard: 0.12,
  hoverDuration: 0.35, // 350ms (within 250-450ms constraint)
  lineDrawDuration: 0.9,
  frameRevealDuration: 0.8,
};

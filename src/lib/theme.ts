// Brand design tokens for Nexa Paraguay
// These map to CSS variables + Tailwind v4 utility classes

export const BRAND = {
  // Primary palette
  navy: '#1B2A4A',
  navyLight: '#2C3E6B',
  gold: '#C9A96E',
  goldDark: '#B89450',
  goldLight: 'rgba(201,169,110,0.15)',
  goldBg: 'rgba(201,169,110,0.06)',

  // Greens
  whatsapp: '#25D366',

  // Neutral
  creamBg: '#F5F5F0',
  white: '#FFFFFF',
  offWhite: 'rgba(255,255,255,0.92)',

  // Shadows
  shadowCard: '0 2px 8px rgba(0,0,0,0.06)',
  shadowDrop: '0 2px 8px rgba(0,0,0,0.04)',
  shadowGold: '0 0 0 4px rgba(201,169,110,0.15)',
  shadowDark: '0 8px 32px rgba(0,0,0,0.15)',

  // Gradients
  gradientNavy: 'linear-gradient(135deg, #1B2A4A 0%, #2C3E6B 100%)',
  gradientNavyOverlay: 'linear-gradient(135deg, rgba(27,42,74,0.85) 0%, rgba(44,62,107,0.85) 100%)',

  // Overlay
  overlayLight: 'rgba(0,0,0,0.3)',
} as const

// Tailwind utility classes that replace common inline styles
export const TW = {
  flexCenter: 'flex items-center gap-2',
  flexBetween: 'flex items-center justify-between',
  sectionPadding: 'py-24',
  sectionInner: 'max-w-6xl mx-auto text-center px-4',
  accentLine: 'w-[60px] h-[3px] bg-accent mx-auto',
  cardGlass: 'bg-white/6 border border-gold/12 shadow-lg',
} as const

// ── Nexa Paraguay Brand Design Tokens ──
// Single source of truth. Import from here, not from src/theme.ts.

// Brand colors, shadows, gradients, and utility Tailwind class helpers
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

// ── Full Design Token Map ──
// For programmatic use (e.g., generating CSS variables, inline styles)
export const theme = {
  colors: {
    primary: '#1B2A4A',
    accent: '#C9A96E',
    accentLight: '#B8924A',
    bg: '#FAF8F5',
    bgLight: '#F5F5EE',
    white: '#FFFFFF',
    text: '#444',
    textDark: '#1B2A4A',
    textMuted: '#666',
    textLight: '#999',
    border: '#e0e0e0',
    success: '#10b981',
    error: '#dc2626',
    whatsapp: '#25D366',
    highlight: '#2a3f6a',
    overlay: 'rgba(255,255,255,0.08)',
    overlayDark: 'rgba(255,255,255,0.12)',
    footerText: 'rgba(255,255,255,0.7)',
    footerBorder: 'rgba(255,255,255,0.1)',
    gradient: 'linear-gradient(135deg, #1B2A4A 0%, #2a3f6a 100%)',
    gradientOverlay: 'linear-gradient(135deg, rgba(27,42,74,0.85) 0%, rgba(42,63,106,0.75) 100%)',
    accentGlow: 'rgba(201,169,110,0.15)',
    cardGlass: 'rgba(255,255,255,0.06)',
    cardBorder: 'rgba(201,169,110,0.2)',
  },
  radii: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '50px',
  },
  shadows: {
    card: '0 4px 20px rgba(0,0,0,0.08)',
    sm: '0 2px 10px rgba(0,0,0,0.06)',
    image: '0 4px 15px rgba(0,0,0,0.1)',
    cta: '0 4px 20px rgba(201,169,110,0.35)',
    ctaHover: '0 6px 30px rgba(201,169,110,0.5)',
    glass: '0 8px 32px rgba(0,0,0,0.12)',
    cardElevated: '0 12px 40px rgba(27,42,74,0.12)',
    darkCard: '0 8px 32px rgba(0,0,0,0.25)',
    darkElevated: '0 12px 48px rgba(0,0,0,0.35)',
    glow: '0 0 20px rgba(201,169,110,0.25)',
    luxury: '0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(201,169,110,0.15)',
  },
  fonts: {
    body: "'Inter', -apple-system, sans-serif",
    heading: "'Playfair Display', Georgia, serif",
  },
  spacing: {
    section: '4rem 1rem',
    sectionSm: '3rem 1rem',
    sectionLg: '5rem 1rem 3rem',
    sectionDark: '5rem 1rem',
    sectionMobile: '2.5rem 0.75rem',
    card: '1.5rem',
    cardSm: '1.25rem',
    btn: '0.85rem 2.5rem',
    btnSm: '0.5rem 1.25rem',
    input: '0.75rem 1rem',
  },
  sizes: {
    maxWidth: '1200px',
    contentWidth: '800px',
    contentWide: '1000px',
    contentNarrow: '700px',
    contentForm: '600px',
    contentBlog: '750px',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
  },
  transitions: {
    fast: '0.15s ease',
    base: '0.25s ease',
    slow: '0.4s ease',
  },
}

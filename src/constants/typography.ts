export const typography = {
  // Font Families (Figma tasarımına göre)
  fontFamily: {
    primary: '"Hiro Misake", serif', // Ana başlıklar için
    secondary: 'Satoshi, sans-serif', // Genel metin için
    japanese: 'var(--font-japanese)', // Japonca karakterler için
    fallback: 'Inter, system-ui, sans-serif', // Fallback font
  },
  
  // Font Sizes (Figma'dan alınan değerler)
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.75rem',  // 28px - Figma'da kullanılan
    '4xl': '2rem',     // 32px - Figma'da kullanılan
    '5xl': '2.5rem',   // 40px - Figma'da kullanılan
    '6xl': '3.75rem',  // 60px - Figma'da kullanılan
    '7xl': '5.5rem',   // 88px - Figma'da kullanılan
  },
  
  // Font Weights
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  
  // Line Heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    normal: '1.35',
    relaxed: '1.64',
    loose: '2',
  },
  
  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  
  // Figma'dan alınan spesifik stil tanımları
  styles: {
    // Hiro Misake ile tanımlanan stiller
    heroTitle: {
      fontFamily: '"Hiro Misake", serif',
      fontSize: '5.5rem', // 88px
      fontWeight: '400',
      lineHeight: '1',
    },
    
    mainTitle: {
      fontFamily: '"Hiro Misake", serif',
      fontSize: '3.75rem', // 60px
      fontWeight: '400',
      lineHeight: '1.0019999821980794',
      textTransform: 'uppercase' as const,
    },
    
    subTitle: {
      fontFamily: '"Hiro Misake", serif',
      fontSize: '2.5rem', // 40px
      fontWeight: '400',
      lineHeight: '1.0019999504089356',
    },
    
    sectionTitle: {
      fontFamily: '"Hiro Misake", serif',
      fontSize: '1.75rem', // 28px
      fontWeight: '400',
      lineHeight: '1.25',
      textTransform: 'uppercase' as const,
    },
    
    regularText: {
      fontFamily: '"Hiro Misake", serif',
      fontSize: '1.75rem', // 28px
      fontWeight: '400',
      lineHeight: '1.6428571428571428',
      textTransform: 'uppercase' as const,
    },
    
    // Satoshi ile tanımlanan stiller
    satoshiHero: {
      fontFamily: 'Satoshi, sans-serif',
      fontSize: '5.5rem', // 88px
      fontWeight: '700',
      lineHeight: '1',
    },
    
    satoshiTitle: {
      fontFamily: 'Satoshi, sans-serif',
      fontSize: '2.5rem', // 40px
      fontWeight: '400',
      lineHeight: '1.35',
    },
    
    satoshiSubtitle: {
      fontFamily: 'Satoshi, sans-serif',
      fontSize: '1.75rem', // 28px
      fontWeight: '500',
      lineHeight: '1.25',
      textTransform: 'uppercase' as const,
    },
    
    satoshiBody: {
      fontFamily: 'Satoshi, sans-serif',
      fontSize: '1.75rem', // 28px
      fontWeight: '400',
      lineHeight: '1.6428571428571428',
      textTransform: 'uppercase' as const,
    },
    
    satoshiRegular: {
      fontFamily: 'Satoshi, sans-serif',
      fontSize: '2rem', // 32px
      fontWeight: '400',
      lineHeight: '1.350000023841858',
    },
  },
} as const;

export type TypographyKeys = keyof typeof typography; 
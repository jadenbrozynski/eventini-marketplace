// Design tokens based on Marketplace Screen C from mobile app
export const designTokens = {
  colors: {
    background: '#FFFFFF',
    textPrimary: '#000000',
    textSecondary: '#333333',
    textMuted: 'rgba(0, 0, 0, 0.7)',
    ratingStar: '#FFD700',
    notificationBadge: '#FF3B30',
    overlay: 'rgba(0, 0, 0, 0.3)',
    overlayDark: 'rgba(0, 0, 0, 0.7)',
    border: '#E5E5E5',
    cardBackground: '#FFFFFF',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
  },
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '14px',
    xl: '18px',
    full: '9999px',
  },
  typography: {
    header: {
      fontSize: '32px',
      fontWeight: '600',
    },
    subheader: {
      fontSize: '14px',
      opacity: 0.7,
    },
    body: {
      fontSize: '14px',
    },
    small: {
      fontSize: '12px',
    },
  },
  shadows: {
    card: '0 2px 8px rgba(0, 0, 0, 0.1)',
    cardHover: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
  carousel: {
    cardHeight: '160px',
    autoScrollInterval: 3000,
    gap: '16px',
  },
  avatar: {
    size: '40px',
  },
} as const;

// Cloudinary configuration
export const cloudinaryConfig = {
  cloudName: 'ds6wefak1',
  baseUrl: 'https://res.cloudinary.com/ds6wefak1',
};

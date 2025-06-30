export const colors = {
  // Primary Colors
  primary: {
    light: '#FF7F28',
    DEFAULT: '#E56E0C',
    dark: '#CC5A00',
  },
  
  secondary: {
    light: '#4A5B8E',
    DEFAULT: '#333F72',
    dark: '#2A3458',
  },
  
  background: '#F3EDE1',
  
  // Additional Colors
  white: '#FFFFFF',
  black: '#000000',
  
  // Semantic Colors
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  
  // Gray Scale
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
} as const;

export type ColorKeys = keyof typeof colors; 

export type Theme = 'dark' | 'light' | 'system';

export type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

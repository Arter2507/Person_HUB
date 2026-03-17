import { createTheme } from '@mui/material/styles';

// This function creates an MUI theme that references the CSS variables
// defined in src/styles/index.css. This ensures that MUI components
// and Tailwind/shadcn components share the same design tokens.

export const getMuiTheme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode,
    primary: {
      main: 'hsl(var(--primary))',
      contrastText: 'hsl(var(--primary-foreground))',
    },
    secondary: {
      main: 'hsl(var(--secondary))',
      contrastText: 'hsl(var(--secondary-foreground))',
    },
    background: {
      default: 'hsl(var(--background))',
      paper: 'hsl(var(--card))',
    },
    text: {
        primary: 'hsl(var(--foreground))',
        secondary: 'hsl(var(--muted-foreground))'
    }
  },
  typography: {
    fontFamily: 'inherit', // Inherit font from Tailwind's base styles
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 'var(--radius)',
        }
      }
    }
  }
});

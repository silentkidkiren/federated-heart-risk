// File: src/theme/theme.js

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1565c0', // professional medical blue
    },
    secondary: {
      main: '#455a64', // neutral gray-blue
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h5: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

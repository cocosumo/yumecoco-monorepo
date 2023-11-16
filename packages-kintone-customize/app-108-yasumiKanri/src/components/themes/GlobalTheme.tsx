import { ThemeProvider, createTheme } from '@mui/material';
import { isMobile } from 'api-kintone';
import { ReactNode } from 'react';

const theme = createTheme({
  typography: {
    htmlFontSize: isMobile() ? 10 : 12,
  },
  components: {
    MuiSnackbar: {
      styleOverrides: {
        anchorOriginTopCenter: {
          top: '10%',
        },
        anchorOriginBottomCenter: {
          bottom: '10%',
        },
      },
    },
  },
});

const GlobalTheme = ({
  children,
}:{
  children: ReactNode
}) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

export default GlobalTheme;

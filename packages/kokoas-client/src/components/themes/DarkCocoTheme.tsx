import { ThemeProvider, createTheme } from '@mui/material/styles';
import { isMobile } from './../../helpers/kintone';
import { blueGrey, grey } from '@mui/material/colors';
import { ReactNode } from 'react';
import { jaJP as coreJaJP } from '@mui/material/locale';
import { jaJP as pickersJaJP } from '@mui/x-date-pickers/locales';




const background = '#434343';


const darkTheme = createTheme(
  {
    typography: {
    // Tell MUI what's the font-size on the html element is.
      htmlFontSize: isMobile ? 10 : 18,

    },
    components: {
      MuiButton: {
        styleOverrides: {

          outlinedPrimary: {
            color: grey[900],
            borderColor: grey[300],
            backgroundColor: blueGrey[100],
            ':hover': {
              borderColor: grey[700],
            },
          },
          outlinedSecondary: {
            color: grey[700],
            borderColor: grey[300],
            backgroundColor: blueGrey[50],
            ':hover': {
              borderColor: grey[300],
            },
          },
          outlinedWarning: {
            ':hover': {
              background: 'whitesmoke',
            },
          },
          containedPrimary: {
            color: 'whitesmoke',
            borderColor: '#9ecaed',
            boxShadow: '0 0 10px #9ecaed',
            background: grey[900],
            ':hover': {
              borderColor: grey[300],
              background: background,
            },
          },
          containedSecondary: {
            color: grey[700],
            background: grey[100],
            ':hover': {
              backgroundColor: grey[700],
              color : grey[100],
            },
          },
          textSecondary: {
            color: grey[700],
          },

        },
      },
      MuiInputBase: {
        defaultProps: {
        // すべての入力フィールドにグローバル スタイルを追加しないようにするために必要
          disableInjectingGlobalStyles: true,
        },
        styleOverrides: {
          root: {
            backgroundColor: 'white',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: background,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          root: {
            overflowY: 'auto',
          },
        },
      },
      MuiFab: {
        styleOverrides: {
          root: {
            color: 'whitesmoke',
            borderColor: '#9ecaed',
            boxShadow: '0 0 10px #9ecaed',
            background: background,
            ':hover': {
              background: background,
            },
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          asterisk: {
            color: '#db3131',
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          root: {
            color: 'rgba(0, 0, 0, 0.87)',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          subtitle1: {
            color: '#707070',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '&.Mui-disabled': {
              'background': 'lightgrey',
            },
          },
        },
      },
      MuiPagination: {
        styleOverrides: {
          root: {
            display: 'flex',
            justifyContent: 'center',
          },
        },
      },
    },
    palette : {
      secondary: {
        main: grey[700],
      },
    },

  },
  coreJaJP,
  pickersJaJP,
);

export default function EnableColorOnDarkAppBar({ children }: { children: ReactNode }) {

  return (
    <ThemeProvider theme={darkTheme}>
      {children}
    </ThemeProvider>

  );
}
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { isMobile } from './../../helpers/kintone';
import { grey } from '@mui/material/colors';



const background = '#434343';


const darkTheme = createTheme({
  typography: {
    // Tell MUI what's the font-size on the html element is.
    htmlFontSize: isMobile ? 10 : 18,
  },
  components: {
    MuiButton: {
      styleOverrides: {
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
        outlinedSecondary: {
          color: grey[700],
          borderColor: grey[300],
        },
      },
    },
    MuiInputBase: {
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
        caption: {
          color: '#d4d7d7',
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
});

export default function EnableColorOnDarkAppBar({ children }: Props) {

  return (
    <ThemeProvider  theme={darkTheme}>
      {children}
    </ThemeProvider>

  );
}

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import PersistentAppBar from './appBars/PersistentAppBar';
import PersistentDesktopDrawer from './nav/persistentNav/PersistentDesktopDrawer';
import Router from '../pages/Router';
import { useQuery } from '../hooks';
import { MainScreenContainer } from './MainScreenContainer';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: useMediaQuery(theme.breakpoints.down('sm')) ? 0 : `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function MainScreen() {
  const menuOpen = Boolean(+(useQuery().get('menuOpen') ?? 1));
  const [open, setOpen] = React.useState(menuOpen);

  const handleDrawerOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <MainScreenContainer>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <PersistentAppBar {...{ handleDrawerOpen }} />
        <PersistentDesktopDrawer {...{ handleDrawerClose, open, drawerWidth }} />
        <Main open={open}>
          <DrawerHeader />
          <Router />
        </Main>
      </Box>
    </MainScreenContainer>

  );
}
/* eslint-disable react/jsx-max-depth */

import CssBaseline from '@mui/material/CssBaseline';
import PersistentAppBar from './appBars/PersistentAppBar';
import PersistentDesktopDrawer from './nav/persistentNav/PersistentDesktopDrawer';
import { useQuery } from '../hooks';
import { MainScreenContainer } from './MainScreenContainer';
import { QueryContext } from './QueryContext';
import { StyledMain } from './StyledMain';
import { useState } from 'react';
import { Box } from '@mui/material';
import Router from '../pages/Router';



export default function MainScreen() {
  const menuOpen = Boolean(+(useQuery().get('menuOpen') ?? 1));
  const [open, setOpen] = useState(menuOpen);

  const drawerWidth = 240;
  const handleDrawerOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <QueryContext >
      <MainScreenContainer>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <PersistentAppBar {...{ handleDrawerOpen }} />
          <PersistentDesktopDrawer {...{ handleDrawerClose, open, drawerWidth }} />
          <StyledMain open={open} contents={<Router />} />
        </Box>
      </MainScreenContainer>
    </QueryContext>

  );
}

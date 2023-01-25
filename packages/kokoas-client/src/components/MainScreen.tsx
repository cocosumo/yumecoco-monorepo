/* eslint-disable react/jsx-max-depth */

import CssBaseline from '@mui/material/CssBaseline';
import PersistentAppBar from './appBars/PersistentAppBar';
import PersistentDesktopDrawer from './nav/persistentNav/PersistentDesktopDrawer';
import { useQuery } from '../hooks';
import { MainScreenContainer } from './MainScreenContainer';
import { QueryContext } from './QueryContext';
import { StyledMain } from './StyledMain';
import { useCallback, useMemo, useState } from 'react';
import { Box } from '@mui/material';



export default function MainScreen() {
  const menuOpen = Boolean(+(useQuery().get('menuOpen') ?? 1));
  const [open, setOpen] = useState(menuOpen);

  const drawerWidth = 240;

  const handleDrawerOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <QueryContext >
      <MainScreenContainer>
        <Box sx={useMemo(()=>({ display: 'flex' }), [])}>
          <CssBaseline />
          <PersistentAppBar handleDrawerOpen={handleDrawerOpen} />
          <PersistentDesktopDrawer 
            handleDrawerClose={handleDrawerClose}
            open={open}
            drawerWidth={drawerWidth}
          />
          <StyledMain open={open} />
        </Box>
      </MainScreenContainer>
    </QueryContext>

  );
}

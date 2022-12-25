/* eslint-disable react/jsx-max-depth */

import CssBaseline from '@mui/material/CssBaseline';
import PersistentAppBar from './appBars/PersistentAppBar';
import PersistentDesktopDrawer from './nav/persistentNav/PersistentDesktopDrawer';
import { useQuery } from '../hooks';
import { MainScreenContainer } from './MainScreenContainer';
import { QueryContext } from './QueryContext';
import { StyledMain } from './StyledMain';
import { createContext, useMemo, useState } from 'react';
import { Box } from '@mui/material';

const defaultMenuContext = {
  menuOpen: false,
  drawWidth: 240,
};

export const MenuContext = createContext(defaultMenuContext);


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

  const menuContextValue = useMemo(() => ({
    menuOpen: open,
    drawWidth: drawerWidth,
  }), [open, drawerWidth]);

  return (
    <QueryContext >
      <MenuContext.Provider value={menuContextValue}>
        <MainScreenContainer>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <PersistentAppBar {...{ handleDrawerOpen }} />
            <PersistentDesktopDrawer {...{ handleDrawerClose, open, drawerWidth }} />
            <StyledMain open={open} drawerWidth={drawerWidth} />
          </Box>
        </MainScreenContainer>
      </MenuContext.Provider>
    </QueryContext>

  );
}

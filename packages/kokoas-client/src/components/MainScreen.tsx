/* eslint-disable react/jsx-max-depth */

import CssBaseline from '@mui/material/CssBaseline';
import PersistentAppBar from './appBars/PersistentAppBar';
import PersistentDesktopDrawer from './nav/persistentNav/PersistentDesktopDrawer';
import { MainScreenContainer } from './MainScreenContainer';
import { QueryContext } from './QueryContext';
import { StyledMain } from './StyledMain';
import { useCallback, useMemo } from 'react';
import { Box } from '@mui/material';
import { atom, useAtom } from 'jotai';



export const menuAtom = atom(true);
export const drawerWidthAtom = atom(240);


export default function MainScreen() {
  const [open, setOpen] = useAtom(menuAtom);

  const handleDrawerOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, [setOpen]);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <QueryContext >
      <MainScreenContainer>
        <Box sx={useMemo(()=>({ display: 'flex' }), [])}>
          <CssBaseline />
          <PersistentAppBar handleDrawerOpen={handleDrawerOpen} />
          <PersistentDesktopDrawer 
            handleDrawerClose={handleDrawerClose}
            open={open}
          />
          <StyledMain open={open} />
        </Box>
      </MainScreenContainer>
    </QueryContext>

  );
}

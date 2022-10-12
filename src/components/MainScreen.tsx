
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import PersistentAppBar from './appBars/PersistentAppBar';
import PersistentDesktopDrawer from './nav/persistentNav/PersistentDesktopDrawer';
import { useQuery } from '../hooks';
import { MainScreenContainer } from './MainScreenContainer';
import { QueryContext } from './QueryContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StyledMain } from './StyledMain';

const drawerWidth = 240;

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
      <QueryContext>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <PersistentAppBar {...{ handleDrawerOpen }} />
          <PersistentDesktopDrawer {...{ handleDrawerClose, open, drawerWidth }} />
          <StyledMain open={open} />
        </Box>
        <ReactQueryDevtools />
      </QueryContext>
    </MainScreenContainer>

  );
}

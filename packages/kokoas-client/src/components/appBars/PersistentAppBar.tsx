/* eslint-disable import/named */

import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { Stack, Typography, useMediaQuery } from '@mui/material';
import { AppBarContent } from './AppBarContent';



interface AppBarProps extends MuiAppBarProps {
  handleDrawerOpen?: ()=>void
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: 5000,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

}));


export default function PersistentAppBar({ handleDrawerOpen }: AppBarProps) {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <AppBar position="fixed">

      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems={'center'}
        m={1}
      >
        <AppBarContent 
          handleDrawerOpen={handleDrawerOpen}
        />
        {!isSmallScreen &&
          (
          <Typography>
            {kintone.getLoginUser().name}
          </Typography>
          )}


      </Stack>

    </AppBar>
  );
}
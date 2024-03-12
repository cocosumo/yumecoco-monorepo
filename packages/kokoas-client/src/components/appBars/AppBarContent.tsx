import { IconButton, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import CocoLogo from './../../assets/logo-cocosumo-system.png';
import { ServerStatus } from './serverStatus/ServerStatus';

export const AppBarContent = ({
  handleDrawerOpen,
}:{
  handleDrawerOpen?: () => void
}) => {
  return (
    <Stack
      direction="row"
      spacing={2}
    >
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{ mx: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Link to="/"> 
        <img height="40px" src={CocoLogo} alt="" />
      </Link>
      <ServerStatus />
    </Stack>
  );
};
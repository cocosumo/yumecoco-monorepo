import { Button,  Menu } from '@mui/material';
import { MouseEvent, useState } from 'react';
import MoreIcon from '@mui/icons-material/More';
import { MenuVoidContract } from './MenuVoidContract';
export const MenuContainer = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <Button
        id="basic-button"
        color='secondary'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreIcon/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuVoidContract handleClose={handleClose} />
      </Menu>

    </div>
  );
};
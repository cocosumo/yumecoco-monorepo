import { Menu, MenuItem } from '@mui/material';

export const UnitTypeMenu = ({
  handleClose,
  open,
  anchorEl,
}: {
  open: boolean,
  handleClose: (selectedItem?: string) => void
  anchorEl: HTMLElement | null
}) => {
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={()=>handleClose()}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={()=>handleClose()}>
        Profile
      </MenuItem>
      <MenuItem onClick={()=>handleClose()}>
        My account
      </MenuItem>
      <MenuItem onClick={()=>handleClose()}>
        Logout
      </MenuItem>
    </Menu>
  );
};
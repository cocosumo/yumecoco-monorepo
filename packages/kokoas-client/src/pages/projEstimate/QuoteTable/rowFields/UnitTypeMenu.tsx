import { Menu, MenuItem } from '@mui/material';
import { unitChoices } from '../../form';

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
      {unitChoices.map((unit) => (
        <MenuItem key={unit} onClick={()=>handleClose(unit)}>
          {unit}
        </MenuItem>
      ))}
    </Menu>
  );
};
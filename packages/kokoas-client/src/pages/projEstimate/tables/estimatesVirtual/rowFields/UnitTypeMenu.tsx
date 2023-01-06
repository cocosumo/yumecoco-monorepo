import { Menu, MenuItem } from '@mui/material';
import { MouseEvent } from 'react';
import { unitChoices } from '../../../validationSchema';

export const UnitTypeMenu = ({
  handleClose,
  handleChange,
  open,
  anchorEl,
}: {
  open: boolean,
  handleClose: (selectedItem?: string) => void
  handleChange: (e: MouseEvent<HTMLLIElement>) => void
  anchorEl: HTMLElement | null
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={()=>handleClose()}
    > 
      {unitChoices.map((unit) => (
        <MenuItem key={unit} onClick={handleChange} data-value={unit}>
          {unit}
        </MenuItem>
      ))}
    </Menu>
  );
};
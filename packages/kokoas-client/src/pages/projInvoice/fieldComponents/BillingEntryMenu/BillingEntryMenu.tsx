import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem, Stack } from '@mui/material';
import { MouseEvent, useState } from 'react';



export const BillingEntryMenu = ({
  rowIdx,
  handleInsert,
  handleRemove,
}: {
  rowIdx: number
  handleInsert: () => void
  handleRemove: () => void
}) => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <Stack>
      <IconButton onClick={handleClick} >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => {
            handleInsert();
            handleClose();
          }}
        >
          下に追加
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleRemove();
            handleClose();
          }}
        >
          削除
        </MenuItem>
      </Menu>
    </Stack>
  );
};
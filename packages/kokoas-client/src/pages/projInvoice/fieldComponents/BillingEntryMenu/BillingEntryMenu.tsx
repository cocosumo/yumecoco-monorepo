import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem, Stack } from '@mui/material';
import { MouseEvent, useState } from 'react';

export const BillingEntryMenu = ({
  rowIdx,
}: {
  rowIdx: number,
}) => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  console.log('rowIdx', rowIdx);



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
            handleInsertRowBelow();
            handleClose();
          }}
        >
          下に追加
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleRemoveRow();
            handleClose();
          }}
        >
          削除
        </MenuItem>
      </Menu>
    </Stack>
  );
};
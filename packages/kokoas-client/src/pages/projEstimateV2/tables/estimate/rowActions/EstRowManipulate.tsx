import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { HotKeyTooltip } from 'kokoas-client/src/components';
import { UseManipulateItemRows } from '../../../hooks/useManipulateItemRows';

export const EstRowManipulate = (
  props : UseManipulateItemRows & {
    rowIdx: number,
  },
) => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { 
    rowIdx,
    handleInsertItemBelow,
    handleRemoveItem,
    handleCopyItemBelow,
  } = props;


  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleOpenMenu} >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}

      >
        <HotKeyTooltip title={'insert'}>
          <MenuItem onClick={() => {
            handleInsertItemBelow(rowIdx);
            handleClose();
          }}
          >
            下に追加
          </MenuItem>
        </HotKeyTooltip>

        <HotKeyTooltip title={'ctrl + delete'}>
          <MenuItem
            onClick={() => {
              handleRemoveItem(rowIdx);
              handleClose();
            }}
          >
            削除
          </MenuItem>
        </HotKeyTooltip>

        <MenuItem onClick={()=> {
          handleCopyItemBelow(rowIdx);
          handleClose();
        }}
        >
          下にコピー
        </MenuItem>

      </Menu>
    </>

  );
};
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useFormikContext } from 'formik';
import { useState } from 'react';
import { TypeOfForm } from '../../form';
import { HotKeyTooltip } from 'kokoas-client/src/components';
import { useManipulateItems } from '../../hooks/useManipulateItems';

export const QtRowAddDelete = ({
  rowIdx,
} :{
  rowIdx: number
}) => {
  const { values } = useFormikContext<TypeOfForm>();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { items } = values;

  const isJustOneRow = items.length === 1;

  const {
    handleCopyItemBelow,
    handleInsertItemBelow,
    handleRemoveItem,
  } = useManipulateItems(rowIdx);

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
          <MenuItem onClick={handleInsertItemBelow}>
            下に追加
          </MenuItem>
        </HotKeyTooltip>

        <HotKeyTooltip title={'ctrl + delete'}>
          <MenuItem
            disabled={isJustOneRow}
            onClick={handleRemoveItem}
          >
            削除
          </MenuItem>
        </HotKeyTooltip>

        <MenuItem onClick={handleCopyItemBelow}>
          下にコピー
        </MenuItem>

      </Menu>
    </>

  );
};
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { FieldArrayRenderProps } from 'formik';
import { useState } from 'react';
import { initialValues, TMaterials, TypeOfForm } from '../../form';
import { v4 as uuidv4 } from 'uuid';

export const RowControls = ({
  rowIdx, arrayHelpers, currentItem,
} :{
  rowIdx: number
  arrayHelpers: FieldArrayRenderProps
  currentItem: TMaterials
}) => {


  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { form, remove, insert } = arrayHelpers;
  const { items } = form.values as TypeOfForm;

  const isJustOneRow = items.length === 1;
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemoveRow = () => {
    remove(rowIdx);
    handleClose();
  };

  const handleAddToRowBelow = () => {
    insert(rowIdx + 1, { ...initialValues.items[0], key: uuidv4() });
    handleClose();
  };

  const handleCopyToRowBelow = () => {
    insert(rowIdx + 1, { ...currentItem, key: uuidv4() });
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClick} >
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
        <MenuItem onClick={handleAddToRowBelow}>
          下に追加
        </MenuItem>

        <MenuItem 
          disabled={isJustOneRow}
          onClick={handleRemoveRow}
        >
          削除
        </MenuItem>

        <MenuItem onClick={handleCopyToRowBelow}>
          下にコピー
        </MenuItem>

      </Menu>
    </>

  );
};
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { FieldArrayRenderProps, useFormikContext } from 'formik';
import { useState } from 'react';
import { initialValues, TypeOfForm } from '../form';

export const RowControls = ({
  rowIdx, arrayHelpers,
} :{
  rowIdx: number
  arrayHelpers: FieldArrayRenderProps
}) => {
  const { values: {
    items: { [rowIdx]: currRow },
  } } = useFormikContext<TypeOfForm>();


  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { remove, insert } = arrayHelpers;

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
    insert(rowIdx + 1, initialValues.items[0]);
    handleClose();
  };

  const handleCopyToRowBelow = () => {
    insert(rowIdx + 1, currRow);
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
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}

      >
        <MenuItem onClick={handleAddToRowBelow}>
          下に追加
        </MenuItem>
        <MenuItem onClick={handleRemoveRow}>
          削除
        </MenuItem>
        <MenuItem onClick={handleCopyToRowBelow}>
          下にコーピー
        </MenuItem>
      </Menu>
    </>

  );
};
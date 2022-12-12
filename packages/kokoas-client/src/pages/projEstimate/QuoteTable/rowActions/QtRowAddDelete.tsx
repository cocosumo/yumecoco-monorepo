import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { FieldArrayRenderProps } from 'formik';
import { useState } from 'react';
import { initialValues, TMaterials, TypeOfForm } from '../../form';
import { v4 as uuidv4 } from 'uuid';

export const QtRowAddDelete = ({
  rowIdx, arrayHelpers,
} :{
  rowIdx: number
  arrayHelpers: FieldArrayRenderProps
}) => {


  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { form, remove, insert } = arrayHelpers;
  const { items, projTypeProfit } = form.values as TypeOfForm;
  const currentItem = items[rowIdx];

  const isJustOneRow = items.length === 1;

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
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
    const newRow: TMaterials = {
      ...initialValues.items[0],
      key: uuidv4(),
      elemProfRate: projTypeProfit,
    };

    insert(rowIdx + 1, newRow);
    handleClose();
  };

  const handleCopyToRowBelow = () => {
    const newRow: TMaterials = {
      ...currentItem,
      key: uuidv4(),
      //elemProfRate: projTypeProfit,
    };
    insert(rowIdx + 1, newRow);
    handleClose();
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
import { IconButton, Menu, MenuItem } from '@mui/material';
import { FieldArrayRenderProps } from 'formik';
import { useState } from 'react';

const ITEM_HEIGHT = 48;

export const QtRowMoveAnywhere = ({
  rowIdx, rowsCount,
  move,
  resetArrows,
}: {
  rowIdx : number,
  rowsCount: number,
  resetArrows: () => void, // reset arrow animations
  move: FieldArrayRenderProps['move'],
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);


  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    resetArrows();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMoveAnywhere = (selectedRowIdx : number) => {
    move(rowIdx, selectedRowIdx);
    handleClose();

  };


  return (
    <>

      <IconButton
        size='small'
        onClick={handleClick}
      >
        {rowIdx + 1}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            // width: '20ch',
          },
        }}
      >
        {[...Array(rowsCount).keys()].map((option) => (
          <MenuItem key={option}
            selected={option === rowIdx}
            onClick={() => handleMoveAnywhere(option)}
          >
            {option}
          </MenuItem>
        ))}

      </Menu>
    </>
  );
};
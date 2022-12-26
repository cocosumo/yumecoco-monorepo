import { IconButton, Menu, MenuItem } from '@mui/material';
//import { FieldArrayRenderProps } from 'formik';
import { useState } from 'react';
import { UseManipulateItemRows } from '../../../hooks/useManipulateItemRows';

const ITEM_HEIGHT = 48;

export const EstRowMoveAnywhere = ({
  rowIdx, rowsCount,
  handleMoveAnywhere,
  resetArrowsAnimation,
  visible = true,
}: {
  rowIdx: number,
  rowsCount: number,
  resetArrowsAnimation: () => void,
  handleMoveAnywhere: UseManipulateItemRows['handleMoveAnywhere'],
  visible: boolean
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);


  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    resetArrowsAnimation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <>

      <IconButton
        size='small'
        onClick={handleClick}
      >
        {rowIdx + 1}
      </IconButton>
      {visible &&
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            horizontal: 'left',
            vertical: 'top',
          }}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
            },
          }}
        >
          {[...Array(rowsCount).keys()]
            .map((option) => (
              <MenuItem key={option}
                selected={option === rowIdx}
                onClick={() => {
                  handleMoveAnywhere(rowIdx, option);
                  handleClose();
                }}
              >
                {option + 1}
              </MenuItem>
            ))}

        </Menu>}
    </>
  );
};
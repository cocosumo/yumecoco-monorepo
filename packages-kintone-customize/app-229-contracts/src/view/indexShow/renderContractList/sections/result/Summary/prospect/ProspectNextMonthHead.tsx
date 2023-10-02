import { TableCell } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { MouseEvent, useState } from 'react';
import { ProspectsList } from './prospectsList/ProspectsList';

export const ProspectNextMonthHead = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <>
      <TableCell 
        colSpan={2} 
        rowSpan={2}
        onClick={handleClick}
        sx={{
          borderLeft: '4px double',
          borderColor: grey[300],
          '&:hover': {
            cursor: 'pointer',
            bgcolor: blue[800],
            color: 'white',
            transition: '0.3s all ease-in-out',
          },
        }}
      >
        来月の見込み
      </TableCell>
    
      <ProspectsList 
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
      />
    </>

  );
};
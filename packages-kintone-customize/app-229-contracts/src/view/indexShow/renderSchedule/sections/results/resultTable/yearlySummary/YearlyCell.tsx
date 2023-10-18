import { TableCell } from '@mui/material';
import { orange } from '@mui/material/colors';
import { ReactNode } from 'react';

export const YearlyCell = ({
  children,
}:{
  children?: ReactNode
}) => {
  return (
    <TableCell 
      sx={{
        bgcolor: orange[100],
      }}
    >
      {children}
    </TableCell>
  );
};
import { TableCell } from '@mui/material';

export const OffsetCells = ({
  offset,
}:{
  offset: number
}) => (
  <TableCell 
    colSpan={offset}
    sx={{
      '&.MuiTableCell-root' :{
        border: 'none',
      },
    }}
  />);
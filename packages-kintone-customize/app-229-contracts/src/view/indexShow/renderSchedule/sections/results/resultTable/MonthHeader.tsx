import { TableCell } from '@mui/material';
import { grey } from '@mui/material/colors';

export const MonthHeader = ({
  month,
}:{
  month: number;
}) => {
  return (
    <TableCell 
      component={'th'} 
      align='center' 
      rowSpan={3}
      sx={{
        color: grey[700],
      }}
    >
      {month}
      月
    </TableCell>
  );
};
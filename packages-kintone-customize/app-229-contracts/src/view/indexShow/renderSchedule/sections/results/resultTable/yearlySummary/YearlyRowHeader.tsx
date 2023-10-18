import { TableCell } from '@mui/material';

export const YearlyRowHeader = ({
  label,
}:{ 
  label: string
}) => {
  return (
    <TableCell 
      colSpan={3} 
      align='center'
      sx={{
        fontSize: 20,
      }}
    >
      {label}
    </TableCell>
  );
};
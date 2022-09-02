import { TableCell, TableRow } from '@mui/material';

export const SubTotalRow = ({
  majorItem,
  value,
}: {
  majorItem: string,
  value: number
}) => {
  return (
    <TableRow>
      <TableCell>{majorItem}</TableCell>
      <TableCell align='right'>{value.toLocaleString()} 円</TableCell>
    </TableRow>
  );
};
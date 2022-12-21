import { TableCell, TableCellProps } from '@mui/material';

export const TabelCellNumber = (
  props: TableCellProps,
) => {
  return (
    <TableCell {...props} align={'right'} />
  );
};
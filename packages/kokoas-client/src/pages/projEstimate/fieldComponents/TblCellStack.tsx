import { Stack, TableCell, TableCellProps } from '@mui/material';

export const TblCellStack = ({
  children,
  ...otherProps
}: TableCellProps) => {



  return (
    <TableCell
      {...otherProps}
    >
      <Stack spacing={1} direction={'column'}>
        {children}
      </Stack>
    </TableCell>
  );
};
import { Stack, TableCell, TableCellProps } from '@mui/material';

export const TblCellStack = ({
  children,
  ...otherProps
}: TableCellProps) => {



  return (
    <TableCell
      {...otherProps}
      sx={{
        py: 2,
      }}
    >
      <Stack spacing={1} direction={'column'}>
        {children}
      </Stack>
    </TableCell>
  );
};
import { Table, TableBody } from '@mui/material';
import { ReactNode } from 'react';

export const OutcomesRemarksContainer = ({
  children,
}:{
  children: ReactNode
}) => {
  return (

    <Table
      size='small'
      sx={{
        fontSize: 12,
        width: '28%',
      }}
    >
      <TableBody>
        {children}
      </TableBody>
    </Table>
  );
};
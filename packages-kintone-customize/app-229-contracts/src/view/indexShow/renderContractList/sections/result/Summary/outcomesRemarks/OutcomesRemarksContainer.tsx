import { Table, TableBody, TableContainer } from '@mui/material';
import { ReactNode } from 'react';

export const OutcomesRemarksContainer = ({
  children,
}:{
  children: ReactNode
}) => {
  return (
    <TableContainer
      sx={{
        width: 'auto',
      }}
    >
      <Table
        size='small'
      >
        <TableBody>
          {children}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
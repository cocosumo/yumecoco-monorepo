import { Paper, Table, TableContainer } from '@mui/material';
import { ReactNode } from 'react';
import { EstTableHead } from './EstTableHead';

export const EstTableContainer = ({
  children,
}:{
  children: ReactNode
}) => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader >
          <EstTableHead />
          {children}
        </Table>
      </TableContainer>
    </Paper>

  );
};
import { Paper, Table, TableContainer } from '@mui/material';
import { ReactNode } from 'react';

export const ResultsTableContainer = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <TableContainer component={Paper} sx={{ overflowX: 'initial' }}>
      <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
        {children}
      </Table>
    </TableContainer>
  );
};
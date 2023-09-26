import { Paper, Table, TableContainer } from '@mui/material';
import { ReactNode } from 'react';

export const ProspectContainer = ({
  children,
}:{
  children: ReactNode
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        {children}
      </Table>
    </TableContainer>
  );
};
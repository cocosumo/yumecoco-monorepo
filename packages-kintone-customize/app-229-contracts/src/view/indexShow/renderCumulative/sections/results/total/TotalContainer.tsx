import { Table, TableContainer } from '@mui/material';
import { ReactNode } from 'react';

export const TotalContainer = ({
  children,
}:{
  children: ReactNode;
}) => {
  return (
    <TableContainer>
      <Table>
        {children}
      </Table>
    </TableContainer>);
};
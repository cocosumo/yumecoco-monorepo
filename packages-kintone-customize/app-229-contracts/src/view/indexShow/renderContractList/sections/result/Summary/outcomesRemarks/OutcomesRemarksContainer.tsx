import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import { ReactNode } from 'react';

export const OutcomesRemarksContainer = ({
  children,
}:{
  children: ReactNode
}) => {
  return (
    <TableContainer
      sx={{
        width: '30%',
        
      }}
      component={Paper}
    >
      <Table
        size='small'
        sx={{
          fontSize: 12,
        }}
      >
        <TableBody>
          {children}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import { ReactNode } from 'react';

export const OutcomesRemarksContainer = ({
  children,
}:{
  children: ReactNode
}) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: '28%',
      }}
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
import { Paper, Table, TableContainer } from '@mui/material';
import { ReactNode } from 'react';

export const ProspectContainer = ({
  children,
}:{
  children: ReactNode
}) => {
  return (
    <TableContainer 
      component={Paper}
      sx={{
        width: '25%',
      }}
    >
      <Table 
        size='small'
        sx={{
          height: '100%',
        }}
      >
        {children}
      </Table>
    </TableContainer>
  );
};
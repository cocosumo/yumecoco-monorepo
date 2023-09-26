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
        width: 'fit-content',
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
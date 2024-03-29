import { Paper, Table, TableContainer } from '@mui/material';
import { ReactNode } from 'react';

export const ProspectContainer = ({
  children,
}:{
  children: ReactNode
}) => {
  return (
    <TableContainer
      sx={{
        width: '28%',
      }}
      component={Paper}
    
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
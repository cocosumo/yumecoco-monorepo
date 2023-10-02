import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ReactNode } from 'react';

export const OverallRemarksContainer = ({
  children,
}:{
  children: ReactNode
}) => {
  return (
    <TableContainer 
      sx={{
        width: '20%',
      }}
      component={Paper}
    >
      <Table
        size='small'
        sx={{
          height: '100%',
          '& th':{
            bgcolor: grey[200],
            fontWeight: 'bold',
            color: grey[700],
          },
          '& td, & th':{
            fontSize: '12px',
          },
        }}
      >
        <TableBody>
          {children}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
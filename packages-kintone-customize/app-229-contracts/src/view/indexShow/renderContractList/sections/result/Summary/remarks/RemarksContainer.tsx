import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ReactNode } from 'react';

export const RemarksContainer = ({
  children,
}:{
  children: ReactNode
}) => {
  return (
    <TableContainer 
      sx={{
        width: 'fit-content',
      }}
      component={Paper}
    >
      <Table
        size='small'
        sx={{
          '& th':{
            bgcolor: grey[200],
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
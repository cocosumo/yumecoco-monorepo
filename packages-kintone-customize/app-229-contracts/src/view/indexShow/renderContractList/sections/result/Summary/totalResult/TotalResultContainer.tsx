import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ReactNode } from 'react';

export const TotalResultContainer = ({
  children,
}:{
  children: ReactNode
}) => {
  
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: '22%',
      }}
    >
      <Table
        size='small'
        sx={{
          height: '100%',
          '& th':{
            fontWeight: 'bold',
            bgcolor: grey[200],
            fontSize: 16,
            color: grey[700],
            width: 160,
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
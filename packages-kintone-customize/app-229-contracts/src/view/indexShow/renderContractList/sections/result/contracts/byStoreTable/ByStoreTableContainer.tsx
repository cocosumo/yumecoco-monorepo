import { Box, Paper, Table, TableContainer } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ReactNode } from 'react';

export const ByStoreTableContainer = ({
  storeName,
  children,
}:{
  storeName: string,
  children: ReactNode,
}) => {

  return (
    <TableContainer component={Paper}>
      {/* 
        Tried to set the title as the first row in thead but 
        column widths were ignored.
      */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          height: '30px',
          fontWeight: 'bold',
          fontSize: '16px',
          bgcolor: grey[300],
          color: grey[800],
        }}
        
      >
        {storeName}
      </Box>
      <Table 
        size='small'
        sx={{
          tableLayout: 'fixed',
          width: '100%',
          '& tbody td, & th': {
            border: '1px solid rgba(224, 224, 224, 1)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          },
          '& td, & th': {
            padding: '0px 4px',
            fontSize: '12px',
            color: grey[700],
          },
          '& th': {
            fontWeight: 'bold ',
            bgcolor: grey[200],
          },
          // alternate row color
          '& tbody tr:nth-of-type(even)': {
            bgcolor: grey[50],
          },
          // change row color when hovered
          '& tbody tr:hover': {
            bgcolor: grey[200],
            cursor: 'pointer',
          },
        }}
      >
        {children}
      </Table>
    </TableContainer>
  );
};
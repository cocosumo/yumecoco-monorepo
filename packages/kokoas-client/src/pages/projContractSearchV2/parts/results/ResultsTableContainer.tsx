import { Paper, Table, TableContainer } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ReactNode } from 'react';

export const ResultsTableContainer = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        overflowX: 'initial',
        // grey color for odd rows
        '& tbody tr:nth-of-type(odd)': {
          backgroundColor: grey[50],
        },
      }}
    >
      <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
        {children}
      </Table>
    </TableContainer>
  );
};
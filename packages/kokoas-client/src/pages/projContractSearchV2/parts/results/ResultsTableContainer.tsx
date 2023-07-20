import { Paper, Table, TableContainer } from '@mui/material';
import { grey, yellow } from '@mui/material/colors';
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
        // clickable rows
        '& tbody tr:hover': {
          cursor: 'pointer',
          backgroundColor: yellow[50],
        },
      }}
    >
      <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
        {children}
      </Table>
    </TableContainer>
  );
};
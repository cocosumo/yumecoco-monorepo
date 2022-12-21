import { Paper, Table, TableContainer, TableHead, TableRow } from '@mui/material';
import { ReactNode } from 'react';

export const QuoteTableHeadContainer = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <TableContainer sx={{
      position: 'sticky',
      top: '120px',
      alignSelf: 'flex-start',
      opacity: '0.8',
      zIndex: 100,
      '& th': {
        px: 0.5,
      },
    }}
      component={Paper}
    >
      <Table
        sx={{
          tableLayout: 'fixed',
        }}
        size='small'
      >
        <TableHead >
          <TableRow>
            {children}
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
};
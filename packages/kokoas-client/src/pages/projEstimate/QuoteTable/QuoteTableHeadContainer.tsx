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
      zIndex: 500,
    }}
      component={Paper}
    >
      <Table size='small'>
        <TableHead >
          <TableRow>
            {children}
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
};
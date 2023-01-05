import { Paper, Table, TableContainer, TableHead, TableRow } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ReactNode } from 'react';

export const EstTHeadContainer = ({
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
      '&:hover': {
        opacity: '1',
      },
      transition: 'all 0.5s',
      background: grey[100],
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
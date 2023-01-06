import { Box, Paper, Table, TableContainer } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ReactNode } from 'react';

export const SummaryTableContainer = ({
  children,
}: {
  children: ReactNode
}) => {


  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '16px',
        transform: 'translateX(-50%)',
        left: '50%',
        transition: 'all 0.5s',
      }}
    >
      <TableContainer
        variant='elevation'
        component={Paper}
        sx={{
          background: grey[200],
          opacity: '0.7',
          transition: 'opacity 0.5s',
          '&:hover': {
            opacity: '1',
          },
        }}
      >
        <Table size="small" >
          {children}
        </Table>
      </TableContainer>
    </Box>
  );
};
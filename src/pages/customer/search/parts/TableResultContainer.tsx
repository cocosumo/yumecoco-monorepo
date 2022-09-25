import { Box, Paper, TableContainer } from '@mui/material';
import { ReactNode } from 'react';

export const TableResultContainer = (
  { children }:
  { children: ReactNode },
) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          {children}
        </TableContainer>
      </Paper>
    </Box>
  );
};
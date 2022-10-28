import {  TableContainer, Paper, Table } from '@mui/material';
import { ReactNode } from 'react';

export const EstimatesContainer = ({
  children,
} : {
  children: ReactNode
}) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        px: 0,
        py: 1,
        bgcolor: '#fff',
        '& .MuiTableCell-sizeSmall': {
          padding: '4px 8px 4px 8px', // <-- arbitrary value
        },
      }}
    >
      <Table
        size={'small'}
      >
        {children}
      </Table>
    </TableContainer>
  );
};
import { Paper, Table, TableContainer } from '@mui/material';
import { ReactNode } from 'react';
import { EstTableHead } from './EstTableHead';

export const EstTableContainer = ({
  body,
  summary,
}:{
  body: ReactNode,
  summary: ReactNode,
}) => {
  return (
    <Paper sx={{ 
      width: '100%', 
      overflow: 'hidden', 
    }}
    >
      <TableContainer 
        sx={{
          height: '45vh', 
        }}
      >
        <Table 
          stickyHeader
          size="small"
        >
          <EstTableHead />
          {body}
        </Table>
      </TableContainer>
      {summary}
    </Paper>

  );
};
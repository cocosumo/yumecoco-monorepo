import { Paper, Table, TableContainer } from '@mui/material';
import { ResultHead } from './ResultHead';
import { ResultBody } from './ResultBody';

export const ResultTable = () => {
  return (
    <Paper sx={{ width: '100%', overflow: 'scroll' }}>
      <TableContainer 
        sx={{ 
          overflowX: 'initial', 
          maxHeight: 440, 
        }}
      >
        <Table 
          size="small" 
          stickyHeader
        >
          <ResultHead />
          <ResultBody />
        </Table>
      </TableContainer>
    </Paper>
  );
};
import { Paper, Table, TableContainer } from '@mui/material';
import { ResultHead } from './ResultHead';
import { ResultBody } from './ResultBody';
import { SearchResult } from '../../types';

export const ResultTable = ({
  data,
}: {
  data?: SearchResult[]
}) => {
  return (
    <Paper sx={{ width: '100%', overflow: 'scroll' }}>
      <TableContainer 
        sx={{ 
          overflowX: 'initial', 
          maxHeight: '70vh', 
        }}
      >
        <Table 
          size="small" 
          stickyHeader
        >
          <ResultHead />
          <ResultBody data={data} />
        </Table>
      </TableContainer>
    </Paper>
  );
};
import { Table, TableContainer } from '@mui/material';
import { ColHeaders } from './ColHeaders';
import { TBody } from './TBody';
import { blue, grey } from '@mui/material/colors';

export const ResultTable = () => {
  return (
    <TableContainer
      sx={{
        '& .MuiTableCell-root': {
          border: 1,
          borderColor: grey[500],
        },
        '& .MuiTableCell-head': {
          fontWeight: 'bold',
        },
        '& th' : {
          backgroundColor: blue[50],
        },

      }}
    >
      <Table size='small'>
        <ColHeaders />
        <TBody />
      </Table>
    </TableContainer>);
};
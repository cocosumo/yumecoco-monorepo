import { TableCell, TableHead, TableRow } from '@mui/material';

export const QuoteTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding='none' />

        <TableCell>
          {'大項目'}
        </TableCell>

        <TableCell>
          {'中項目'}
        </TableCell>

        <TableCell>
          {'部材(手入力可)'}
        </TableCell>

        <TableCell align='right'>
          {'原価*'}
        </TableCell>

        <TableCell align='right'>
          {'数量*'}
        </TableCell>

        <TableCell>
          {'単位'}
        </TableCell>

        <TableCell align='right'>
          {'利益率(%)'}
        </TableCell>

        <TableCell>
          {'税(課税 / 非課税)'}
        </TableCell>

        <TableCell align='right'>
          {'単価'}
        </TableCell>

        <TableCell align='right'>
          {'金額'}
        </TableCell>

        <TableCell padding='none' />

      </TableRow>
    </TableHead>
  );
};
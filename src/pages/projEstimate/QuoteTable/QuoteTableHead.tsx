import { TableHead, TableRow } from '@mui/material';
import { QtHeadCell } from './QtHeadCell';

export const QuoteTableHead = () => {
  return (
    <TableHead> 
      <TableRow>
        <QtHeadCell />

        <QtHeadCell>
          {'大項目'}
        </QtHeadCell>

        <QtHeadCell>
          {'中項目'}
        </QtHeadCell>

        <QtHeadCell helperText='手入力可'>
          {'部材'}
        </QtHeadCell>

        <QtHeadCell required rightAligned>
          {'原価'}
        </QtHeadCell>

        <QtHeadCell required rightAligned>
          {'数量'}
        </QtHeadCell>

        <QtHeadCell>
          {'単位'}
        </QtHeadCell>

        <QtHeadCell rightAligned>
          {'利益率(%)'}
        </QtHeadCell>

        <QtHeadCell helperText='課税 / 非課税'>
          {'税'}
        </QtHeadCell>

        <QtHeadCell rightAligned>
          {'単価'}
        </QtHeadCell>

        <QtHeadCell rightAligned>
          {'金額'}
        </QtHeadCell>

        <QtHeadCell />

      </TableRow>
    </TableHead>
  );
};
import {  TableCell, TableHead, TableRow } from '@mui/material';
import { useMemo } from 'react';
import { QtHeadCell, QtHeadCellProps } from './QtHeadCell';

export const QuoteTableHead = () => {

  const heads  = useMemo<QtHeadCellProps[]>( () => {
    const required = true;
    const rightAligned = true;
    return [
      { text: '大項目' },
      { text: '中項目' },
      { text: '部材', helperText: '手入力可' },
      { text: '原価', required, rightAligned },
      { text: '数量', required, rightAligned },
      { text: '利益率(%)', rightAligned },
      { text: '税', helperText : '課税 / 非課税' },
      { text: '単価', rightAligned },
      { text: '金額', rightAligned },
    ];
  }, [] );

  return (
    <TableHead>
      <TableRow>

        {/* Offset for move row controls */}
        <TableCell padding="none" />

        {heads
          .map((props) => <QtHeadCell key={props.text} {...props} />)}

        {/* Offset for add / delete row controls  */}
        <TableCell padding="none"  />

      </TableRow>
    </TableHead>
  );
};
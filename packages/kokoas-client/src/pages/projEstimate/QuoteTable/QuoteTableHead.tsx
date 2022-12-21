import {  TableCell } from '@mui/material';
import { useMemo } from 'react';
import { QtHeadCell, QtHeadCellProps } from './QtHeadCell';
import { QuoteTableHeadContainer } from './QuoteTableHeadContainer';

export const QuoteTableHead = () => {

  const heads  = useMemo<QtHeadCellProps[]>( () => {
    const required = true;
    const rightAligned = true;
    return [
      { text: ['大項目', '中項目'] },
      { text: ['部材 (手入力可)', '品番・色'] },
      { text: '原価', required, rightAligned },
      { text: '数量', required, rightAligned },
      { text: '利益率', rightAligned },
      { text: '税 (課税 / 非課税)' },
      { text: '単価', rightAligned },
      { text: '金額', rightAligned },
    ];
  }, [] );

  return (
    <QuoteTableHeadContainer>

      {/* Offset for move row controls */}
      <TableCell padding="none" />

      {heads
        .map((props) => <QtHeadCell key={String(props.text)} {...props} />)}

      {/* Offset for add / delete row controls  */}
      <TableCell padding="none"  />

    </QuoteTableHeadContainer>
  );
};
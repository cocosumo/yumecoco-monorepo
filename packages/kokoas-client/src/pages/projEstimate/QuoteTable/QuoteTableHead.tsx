import { QtHeadCell, QtHeadCellProps } from './QtHeadCell';
import { QuoteTableHeadContainer } from './QuoteTableHeadContainer';

const required = true;
const rightAligned = true;

export const headers: QtHeadCellProps[]  =  [
  { width: '4%' },
  { text: ['大項目', '中項目'], width: '19%' },
  { text: ['部材 (手入力可)', '品番・色'], width: '12%' },
  { text: '原価', required, rightAligned, width: '10%' },
  { text: '数量', required, rightAligned, width: '10%' },
  { text: '利益率', rightAligned, width: '8%' },
  { text: '税 (課税 / 非課税)', width: '8%' },
  { text: '単価', rightAligned, width: '12%' },
  { text: '金額', rightAligned, width: '12%' },
  { width: '4%' },
];


export const QuoteTableHead = () => {

  return (
    <QuoteTableHeadContainer>
      {headers
        .map((props) => <QtHeadCell key={String(props.text)} {...props} />)}

    </QuoteTableHeadContainer>
  );
};
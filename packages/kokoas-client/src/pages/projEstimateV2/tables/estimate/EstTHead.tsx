import { useMemo } from 'react';
import { EstTHeadContainer } from './EstTHeadContainer';
import { EstTHeadCell, QtHeadCellProps } from './EstTHeadCell';
import shortid from 'shortid';


const required = true;
const rightAligned = true;

export const headers: QtHeadCellProps[]  =  [
  { width: '4%' },
  { text: ['大項目', '中項目'], width: '19%' },
  { text: ['部材 (手入力可)', '品番・色'], width: '12%' },
  { text: '原価', required, rightAligned, width: '10%' },
  { text: '数量', required, width: '10%' },
  { text: '利益率', width: '8%' },
  { text: ['税', '(課税 / 非課税)'], width: '10%' },
  { text: '単価', rightAligned, width: '12%' },
  { text: '金額', rightAligned, width: '12%' },
  { width: '4%' },
];


export const EstTHead = () => {
  const headerComponents = useMemo(() => {
    return headers
      .map((props) => <EstTHeadCell key={shortid.generate()} {...props} />);
  }, []);

  return (
    <EstTHeadContainer>
      {headerComponents}

    </EstTHeadContainer>
  );
};
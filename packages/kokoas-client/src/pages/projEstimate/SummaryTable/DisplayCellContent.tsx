import { Typography } from '@mui/material';
import { SummaryElem } from '../hooks/useTotalCalc';


const DisplayCellContent = ({
  name,
  value,
}: {
  name: SummaryElem,
  value: number,
}) => {

  // 粗利率のみ単位を%、その他は3桁ごとにカンマ+単位に円を付与する
  const dispVal = (name === 'grossProfitRate') ? (value + ' %')
    : (Math.round(value).toLocaleString() + '円');

  return (
    <Typography variant='body2' >
      {dispVal}
    </Typography>
  );
};

export default DisplayCellContent;
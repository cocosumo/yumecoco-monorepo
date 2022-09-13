import { Typography } from '@mui/material';


const DisplayCellContent = ({
  name,
  value,
}: {
  name: string,
  value: number,
}) => {

  // 粗利率のみ単位を%、その他は3桁ごとにカンマ+単位に円を付与する
  const dispVal = (name.indexOf('grossProfitMargin')) !== -1 ? (value + ' %')
    : (Math.round(value).toLocaleString() + '円');

  return (
    <Typography variant='body2' >
      {dispVal}
    </Typography>
  );
};

export default DisplayCellContent;
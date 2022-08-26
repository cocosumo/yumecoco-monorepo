import { Typography } from '@mui/material';
import { useField } from 'formik';

export type DisplayCellContentProps = {
  name: string,
  /* value: string, */
};
const DisplayCellContent = (props: DisplayCellContentProps) => {
  const [field] = useField(props);

  // 粗利率のみ単位を%、その他は3桁ごとにカンマ+単位に円を付与する
  const dispVal = (field.name === 'grossProfitMargin') ? (field.value + ' %')
    : (field.value.toLocaleString() + '円');

  return (
    <Typography variant='body2' >
      {dispVal}
    </Typography>
  );
};

export default DisplayCellContent;
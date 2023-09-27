import { Typography } from '@mui/material';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import { useMemo } from 'react';
import { getFiscalYear } from '../../../../../helpers/getFiscalYear';

export const Title = () => {
  const [
    year,
    month,
  ] = useTypedWatch({
    name: [
      'year',
      'month',
    ],
  });

  const fiscalYear = useMemo(() => getFiscalYear(new Date(year, month - 1, 1)), [year, month]);

  // 和暦と西暦を変換
  // https://tech-blog.s-yoshiki.com/entry/291
  const formatter = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
    year: 'numeric',
  });

  const jpYear = formatter.format(new Date(fiscalYear, 0, 1));

  //extract the number part of the year using regex
  const yearNumber = jpYear.match(/\d+/g)?.[0];
  
  return (
    <Typography 
      variant='h1' 
      fontSize={32}
      fontWeight='bold'
      textAlign='center'
      letterSpacing={2}
    >
      {`R${yearNumber}.${month}　契約一覧表　ここすも　株式会社　山豊工建`}
    </Typography>
  );
};
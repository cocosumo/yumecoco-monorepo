import { Typography } from '@mui/material';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import { TForm } from '../../schema';
import { useStores } from '../../../../../hooks/useStores';
import { useMemo } from 'react';

export const Title = () => {
  const [
    fiscalYear,
    territory,
  ] = useTypedWatch({
    name: [
      'fiscalYear',
      'territory',
    ],
  }) as [
    TForm['fiscalYear'],
    TForm['territory'],
  ];

  const { data: storeData = [] } = useStores();

  const resolvedStores = useMemo(
    () => {
      if (territory === '全店舗') return '全店舗';
      return storeData
        .filter((store) => store.territory.value === territory)
        .map((store) => store.店舗名.value)
        .join('／');
    }, 
    [storeData, territory],
  );

  return (
    <Typography 
      variant='h1' 
      fontSize={20} 
      fontWeight={'bold'}
      textAlign='center'
    >
      {`${fiscalYear}年スケジュール　ここすも${resolvedStores}　（※金額は全て税別です。）`}
    </Typography>);
};
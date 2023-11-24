import { LinearProgress, Stack } from '@mui/material';
import { useContractsByFiscalYear } from '../../hooks/useContractsByFiscalYear';
import { FiscalYearResult } from './fiscalYearResult/FiscalYearResult';
import { FiscalMonths } from './fiscalMonths/FiscalMonths';
import style from './Results.module.css';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import { FiscalYearResultToltal } from './fiscalYearResult/FiscalYearResultToltal';

export const Results = () => {
  const [
    year,
    storeId,
  ] = useTypedWatch({
    name: [
      'year',
      'storeId',
    ],
  }) as [
    string,
    string,
  ];

  const fiscalYearQueryByStore = useContractsByFiscalYear({
    year,
    storeId,
  });



  const {
    isLoading,
  } = fiscalYearQueryByStore;

  if (isLoading) {
    return <LinearProgress />;
  }

  const isJishaBukken = storeId === '自社物件';

  return (
    <Stack 
      spacing={2} 
      id={'printNode'} 
      className={style.print}
      mx={1}
    >
      <FiscalYearResult fiscalYearQuery={fiscalYearQueryByStore} hasTitle />
      <FiscalMonths fiscalYearQuery={fiscalYearQueryByStore} />
      {isJishaBukken && <FiscalYearResultToltal />}
    </Stack>
  );
};
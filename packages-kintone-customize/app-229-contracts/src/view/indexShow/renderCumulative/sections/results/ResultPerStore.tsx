import { Stack } from '@mui/material';
import { FiscalYearResult } from './fiscalYearResult/FiscalYearResult';
import { FiscalYearResultToltal } from './fiscalYearResult/FiscalYearResultToltal';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import { useContractsByFiscalYear } from '../../hooks/useContractsByFiscalYear';
import { FiscalMonths } from './fiscalMonths/FiscalMonths';

export const ResultPerStore = ({
  storeId,
}:{
  storeId: string
}) => {

  const [
    year,
  ] = useTypedWatch({
    name: [
      'year',
    ],
  }) as [
    string,
    string,
  ];

  const fiscalYearQueryByStore = useContractsByFiscalYear({
    year,
    storeId: storeId,
  });

  const isJishaBukken = storeId === '自社物件';


  
  return (
    <Stack>
      <FiscalYearResult fiscalYearQuery={fiscalYearQueryByStore} hasTitle />
      <FiscalMonths fiscalYearQuery={fiscalYearQueryByStore} />
      {isJishaBukken && <FiscalYearResultToltal />}
    </Stack>
  );
};
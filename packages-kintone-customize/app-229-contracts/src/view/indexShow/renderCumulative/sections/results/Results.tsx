import { LinearProgress, Stack } from '@mui/material';
import { useContractsByFiscalYear } from '../../hooks/useContractsByFiscalYear';
import { FiscalYearResult } from './fiscalYearResult/FiscalYearResult';
import { FiscalMonths } from './fiscalMonths/FiscalMonths';
import style from './Results.module.css';
import { useTypedWatch } from '../../hooks/useTypedRHF';

export const Results = () => {
  const [
    year,
    stores,
  ] = useTypedWatch({
    name: [
      'year',
      'stores',
    ],
  }) as [
    string,
    string,
  ];

  const fiscalYearQueryByStore = useContractsByFiscalYear({
    year,
    stores,
  });

  const fiscalYearQuery = useContractsByFiscalYear({
    year,
  });


  const {
    isLoading,
  } = fiscalYearQueryByStore;

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <Stack 
      spacing={2} id={'printNode'} className={style.print}
      mx={1}
    >
      <FiscalYearResult fiscalYearQuery={fiscalYearQueryByStore} hasTitle />
      <FiscalMonths fiscalYearQuery={fiscalYearQueryByStore} />
      {!!stores && <FiscalYearResult fiscalYearQuery={fiscalYearQuery} />}
    </Stack>
  );
};
import { LinearProgress, Stack } from '@mui/material';
import { useContractsByFiscalYear } from '../../hooks/useContractsByFiscalYear';
import { FiscalYearResult } from './fiscalYearResult/FiscalYearResult';
import { FiscalMonths } from './fiscalMonths/FiscalMonths';
import style from './Results.module.css';
import { Total } from './total/Total';

export const Results = () => {

  const fiscalYearQuery = useContractsByFiscalYear();

  const {
    isLoading,
  } = fiscalYearQuery;

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <Stack 
      spacing={2} id={'printNode'} className={style.print}
      mx={1}
    >
      <FiscalYearResult fiscalYearQuery={fiscalYearQuery} />
      <FiscalMonths fiscalYearQuery={fiscalYearQuery} />
      <Total />
    </Stack>
  );
};
import { LinearProgress } from '@mui/material';
import { useContractsByFiscalYear } from '../../hooks/useContractsByFiscalYear';
import { FiscalYearResult } from './fiscalYearResult/FiscalYearResult';
import { FiscalMonths } from './fiscalMonths/FiscalMonths';

export const Results = () => {

  const fiscalYearQuery = useContractsByFiscalYear();

  const {
    isLoading,
  } = fiscalYearQuery;

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <>
      <FiscalYearResult fiscalYearQuery={fiscalYearQuery} />
      <FiscalMonths fiscalYearQuery={fiscalYearQuery} />
    </>
  );
};
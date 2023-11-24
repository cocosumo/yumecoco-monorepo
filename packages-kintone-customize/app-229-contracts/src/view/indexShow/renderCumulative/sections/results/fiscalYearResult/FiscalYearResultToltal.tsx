import { useContractsByFiscalYear } from '../../../hooks/useContractsByFiscalYear';
import { useTypedWatch } from '../../../hooks/useTypedRHF';
import { FiscalYearResult } from './FiscalYearResult';

export const FiscalYearResultToltal = () => {
  const [
    year,
  ] = useTypedWatch({
    name: [
      'year',
    ],
  }) as [
    string,
  ];

  const fiscalYearQuery = useContractsByFiscalYear({
    year,
  });

  return (
    <FiscalYearResult fiscalYearQuery={fiscalYearQuery} />
  );
};
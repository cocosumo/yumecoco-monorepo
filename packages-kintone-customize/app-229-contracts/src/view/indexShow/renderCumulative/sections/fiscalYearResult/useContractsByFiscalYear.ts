import { useTypedWatch } from '../../hooks/useTypedRHF';
import { useContracts } from '../../hooks/useContracts';
import format from 'date-fns/format';
import endOfMonth from 'date-fns/endOfMonth';
import { useMemo } from 'react';
import { getFiscalMonths } from '../../../../../helpers/getFiscalMonths';

interface FiscalMonth {
  contracts: DB.SavedRecord[],
  totalAmountInclTax: number,
  totalAmountExclTax: number,
  totalProfit: number,
}

interface FiscalYearData {
  [key: string]: FiscalMonth
}

const contractDateKey: keyof DB.SavedRecord = 'contractDate';

export const useContractsByFiscalYear = () => {
  const year = useTypedWatch({
    name: 'year',
  }) as string;

  const minDateStr = format(new Date(+year - 1, 11, 1), 'yyyy-MM-dd');
  
  const maxDateteStr = format(endOfMonth(new Date(+year, 10, 1)), 'yyyy-MM-dd');
  
  const {
    data: contracts,
    ...contractsQuery
  } = useContracts({
    condition: `${contractDateKey} >= "${minDateStr}" and ${contractDateKey} <= "${maxDateteStr}"`,
  });

  const groupedByMonth = useMemo(() => {
    if (!contracts) return null;

    return contracts
      ?.reduce(
        (acc, contract) => {
          const {
            contractDate,
            contractAmountIntax,
            contractAmountNotax,
            profit,
          } = contract;

          const month = format(new Date(contractDate.value), 'yyyy-MM');

          const fiscalMonth = acc[month] || {
            contracts: [],
            totalAmountInclTax: 0,
            totalAmountExclTax: 0,
            totalProfit: 0,
          };

          fiscalMonth.contracts.push(contract);
          fiscalMonth.totalAmountInclTax += +contractAmountIntax.value;
          fiscalMonth.totalAmountExclTax += +contractAmountNotax.value;
          fiscalMonth.totalProfit += +profit.value;
          
          return {
            ...acc,
            [month]: fiscalMonth,
          };

        }, 
        {} as FiscalYearData,
      );

  }, [contracts]);

  return {
    data: groupedByMonth,
    fiscalMonths: getFiscalMonths(year),
    ...contractsQuery,
  };
};
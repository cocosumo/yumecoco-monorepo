import { useContracts } from '../../../../hooks/useContracts';
import format from 'date-fns/format';
import endOfMonth from 'date-fns/endOfMonth';
import { useMemo } from 'react';
import { getFiscalMonths } from '../../../../helpers/getFiscalMonths';

interface FiscalMonth {
  contracts: DB.SavedRecord[],
  totalAmountInclTax: number,
  totalAmountExclTax: number,
  totalProfit: number,
}

interface FiscalYearDetails {
  [key: string]: FiscalMonth
}
interface FiscalYearData {
  totalCount: number,
  totalAmountInclTax: number,
  totalAmountExclTax: number,
  totalProfit: number,
  details: FiscalYearDetails,
}



const contractDateKey: keyof DB.SavedRecord = 'contractDate';


export const useContractsByFiscalYear = ({
  year,
  storeId,
}: {
  year: string,
  storeId?: string,
}) => {


  const minDateStr = format(new Date(+year - 1, 11, 1), 'yyyy-MM-dd');
  
  const maxDateteStr = format(endOfMonth(new Date(+year, 10, 1)), 'yyyy-MM-dd');


  const conditionArr = [
    `${contractDateKey} >= "${minDateStr}"`,
    `${contractDateKey} <= "${maxDateteStr}"`,
  ];

  if (storeId) {
    if (storeId === '自社物件') { // 自社物件はstoreIdないので、別の条件で絞り込む
      conditionArr.push('自社物件 in ("自社物件")');
    } else {
      conditionArr.push(`storeId = "${storeId}"`);
      conditionArr.push('自社物件 not in ("自社物件")');
    }
  }

  const condition = conditionArr.filter(Boolean).join(' and ');
  
  const {
    data: contracts,
    ...contractsQuery
  } = useContracts({
    condition: condition,
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

          const newAcc =  { ...acc };

          const month = format(new Date(contractDate.value), 'yyyy-MM');

          const fiscalMonth = acc.details?.[month] || {
            contracts: [],
            totalAmountInclTax: 0,
            totalAmountExclTax: 0,
            totalProfit: 0,
          };

          fiscalMonth.contracts.push(contract);
          fiscalMonth.totalAmountInclTax += +contractAmountIntax.value;
          fiscalMonth.totalAmountExclTax += +contractAmountNotax.value;
          fiscalMonth.totalProfit += +profit.value;

          newAcc.totalCount += 1;
          newAcc.totalAmountInclTax += +contractAmountIntax.value;
          newAcc.totalAmountExclTax += +contractAmountNotax.value;
          newAcc.totalProfit += +profit.value;
          
          return {
            ...newAcc,
            details: {
              ...newAcc.details,
              [month]: fiscalMonth,
            },
          };

        }, 
        {
          totalCount: 0,
          totalAmountInclTax: 0,
          totalAmountExclTax: 0,
          totalProfit: 0,
          details: {},
        } as FiscalYearData,
      );

  }, [contracts]);


  return {
    data: groupedByMonth,
    fiscalMonths: getFiscalMonths(year),
    ...contractsQuery,
  };
};

export type UseContractsByFiscalYearReturn = ReturnType<typeof useContractsByFiscalYear>;

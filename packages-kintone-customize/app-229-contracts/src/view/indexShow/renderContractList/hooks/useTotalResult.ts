import { useContractsResult } from './useContractsResult';
import { useQuery } from '@tanstack/react-query';

/**
 * 
 * Needs optimzation as the calculation is done every call
 * to the hook
 */
export const useTotalResult = () => {

  const { data, condition } = useContractsResult();


  return useQuery(
    ['totalResult', condition],
    async () => {
      if (!data) return {
        totalAmtInclTax: 0,
        totalAmtExclTax: 0,
        totalNumOfContracts: 0,
      };

      return data?.reduce((acc, cur) => {
        const {
          contractAmountIntax,
          contractAmountNotax,
        } = cur;

        return {
          totalAmtInclTax: acc.totalAmtInclTax + +contractAmountIntax.value,
          totalAmtExclTax: acc.totalAmtExclTax + +contractAmountNotax.value,
          totalNumOfContracts: acc.totalNumOfContracts + 1,
        };
      }, {
        totalAmtInclTax: 0,
        totalAmtExclTax: 0,
        totalNumOfContracts: 0,
      });
    },
    {
      enabled: !!data,
    },
  );
};
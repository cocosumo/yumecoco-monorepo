import { Territory } from 'types';
import { useContractsResult } from './useContractsResult';
import { useMemo } from 'react';

const defaultTotalResult = {
  totalAmtInclTax: 0,
  totalAmtExclTax: 0,
  totalNumOfContracts: 0,
  eastTotalAmtInclTax: 0,
  westTotalAmtInclTax: 0,
  territoryUnknownRecords: [] as DB.SavedRecord[],
  eastRecords: [] as DB.SavedRecord[],
  westRecords: [] as DB.SavedRecord[],
};

/**
 * 
 * Needs optimzation as the calculation is done every call
 * to the hook
 */
export const useTotalResult = () => {

  const { data } = useContractsResult();

  const result = useMemo(() => {
    if (!data) return { ...defaultTotalResult };

    return data?.reduce((acc, cur) => {
      const {
        contractAmountIntax,
        contractAmountNotax,
        territory,
      } = cur;

      const parsedTerritory = territory.value as Territory;
      const parsedContractAmountIntax = +contractAmountIntax.value;
      const parsedContractAmountNotax = +contractAmountNotax.value;

      return {
        ...acc,
        totalAmtInclTax: acc.totalAmtInclTax + parsedContractAmountIntax,
        totalAmtExclTax: acc.totalAmtExclTax + parsedContractAmountNotax,
        totalNumOfContracts: acc.totalNumOfContracts + 1,
        eastTotalAmtInclTax: parsedTerritory === '東' ? acc.eastTotalAmtInclTax + parsedContractAmountIntax : acc.eastTotalAmtInclTax,
        westTotalAmtInclTax: parsedTerritory === '西' ? acc.westTotalAmtInclTax + parsedContractAmountIntax : acc.westTotalAmtInclTax,
        eastRecords: parsedTerritory === '東' ? [...acc.eastRecords, cur] : acc.eastRecords,
        westRecords: parsedTerritory === '西' ? [...acc.westRecords, cur] : acc.westRecords,
        territoryUnknownRecords: parsedTerritory === '東' || parsedTerritory === '西' ? acc.territoryUnknownRecords : [...acc.territoryUnknownRecords, cur],
      };
    }, {
      ...defaultTotalResult,
    });

  }, [data]);

  if (result.territoryUnknownRecords.length > 0) {
    console.error('UNKNOWN TERRITORY', result.territoryUnknownRecords);
  }

  return result;
};
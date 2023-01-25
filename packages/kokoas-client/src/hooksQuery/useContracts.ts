import { calculateEstimateRecord } from 'api-kintone';
import { TEnvelopeStatus } from 'types';
import { useEstimates } from './useEstimates';

export const useContracts = () => {
  return useEstimates(({
    select: (data) => {
      const filteredData = data
        .filter((rec) => (rec.envStatus.value as TEnvelopeStatus) === 'completed');
      return {
        records: filteredData,
        calculated: filteredData.map((rec) => calculateEstimateRecord({ record: rec })),
      };
    },
  }));
};
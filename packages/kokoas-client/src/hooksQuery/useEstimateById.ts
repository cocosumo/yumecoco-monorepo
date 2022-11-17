import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { getEstimateById } from 'api-kintone';


/**
 * 見積番号で取得する
 */
export const useEstimateById = (projEstimateId: string) => {

  return useQuery(
    [AppIds.projEstimates, { projEstimateId }],
    () => getEstimateById(projEstimateId),
    {
      enabled: !!projEstimateId,
    },
  );
};

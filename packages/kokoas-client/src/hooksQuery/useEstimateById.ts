import { useQuery } from '@tanstack/react-query';
import { APPIDS } from '../api/kintone';
import { getEstimatesById } from '../api/kintone/estimates/getEstimatesById';


/**
 * 見積番号で取得する
 */
export const useEstimateById = (projEstimateId: string) => {

  return useQuery(
    [APPIDS.projectEstimate, projEstimateId],
    () => getEstimatesById(projEstimateId),
    {
      enabled: !!projEstimateId,
    },
  );
};

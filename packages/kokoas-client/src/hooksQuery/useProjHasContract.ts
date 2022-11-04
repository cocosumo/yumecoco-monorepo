import { useQuery } from '@tanstack/react-query';
import { APPIDS } from '../api/kintone';
import { getEstimatesByProjId } from '../api/kintone/estimates/getEstimatesByProjId';

/**
 * 工事番号で契約済み見積もりが存在するかを取得する
 */
export const useProjHasContract = (
  projId = '',
) => {

  return useQuery(
    [APPIDS.projectEstimate, projId],
    () =>  getEstimatesByProjId(projId),
    {
      enabled: !!projId,
      select: ({ records }) => {
        return records?.some(({ envStatus }) => !!envStatus.value);
      },
    },
  );
};
import { useQuery } from '@tanstack/react-query';
import { APPIDS } from '../api/kintone';
import { getEstimatesByProjId } from '../api/kintone/estimates/getEstimatesByProjId';

/**
 * 工事番号で契約済み見積もり一覧を取得する
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
        return records?.filter(({ envStatus }) => !!envStatus.value);
      },
    },
  );
};
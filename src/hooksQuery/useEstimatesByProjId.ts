import { useQuery } from '@tanstack/react-query';
import { APPIDS } from '../api/kintone';
import { getEstimatesByProjId } from '../api/kintone/estimates/getEstimatesByProjId';

/**
 * 工事番号で見積リストを取得する
 * @param projId
 * @returns {Estimates.main.SavedData[]} 見積リスト
 */
export const useEstimatesByProjId = (
  projId: string,
) => {

  return useQuery(
    [APPIDS.projectEstimate, projId],
    () =>  getEstimatesByProjId(projId),
    {
      enabled: !!projId,
    },
  );
};
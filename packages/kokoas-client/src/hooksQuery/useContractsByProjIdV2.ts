
import { getContractsByProjId } from 'api-kintone';
import { AppIds } from 'config';
import { useQuery } from '@tanstack/react-query';

/**
 * 工事番号で契約一覧を取得する
 */
export const useContractsByProjIdV2 = (
  projId = '',
) => {

  return useQuery(
    [AppIds.contracts, 'projId', projId],
    () => getContractsByProjId(projId),
    {
      enabled: !!projId,
    },
  );
};
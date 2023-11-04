
import { getContractByEstId } from 'api-kintone';
import { AppIds } from 'config';
import { useQuery } from '@tanstack/react-query';

export type ContractByEstId = Awaited<ReturnType<typeof getContractByEstId>>;

/**
 * 見積番号で契約一覧を取得する
 */
export const useContractsByEstId = (
  projEstimateId = '',
) => {

  return useQuery(
    [AppIds.contracts, 'estId', projEstimateId],
    () => getContractByEstId(projEstimateId),
  );
};
import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { getLatestCompletedContracts } from 'api-kintone/src/contracts/getLatestCompleteContracts';

export type LatestCompletedContracts = Awaited<ReturnType<typeof getLatestCompletedContracts>>;

/**
 * 部材を取得する
 */
export const useLatestCompletedContracts = <T = LatestCompletedContracts>(
  options?: {
    select: (data: LatestCompletedContracts) => T
  }) => {
  return useQuery(
    [AppIds.contracts, 'latestCompletedContracts'],
    getLatestCompletedContracts,
    { ...options },
  );
};
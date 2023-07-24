import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { getLatestCompletedContracts } from 'api-kintone/src/contracts/getLatestCompleteContracts';

/**
 * 部材を取得する
 */
export const useLatestCompletedContracts = <T>(
  options?: {
    select: (data: Awaited<ReturnType<typeof getLatestCompletedContracts>>) => T
  }) => {
  return useQuery(
    [AppIds.contracts, 'latestCompletedContracts'],
    getLatestCompletedContracts,
    { ...options },
  );
};
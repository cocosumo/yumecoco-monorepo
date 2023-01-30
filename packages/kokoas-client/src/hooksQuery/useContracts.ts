import { useQuery } from '@tanstack/react-query';
import { getContracts } from 'api-kintone';
import { AppIds } from 'config';


/**
 * 契約を取得する。
 *
 */
export const useContracts = (params: Parameters<typeof getContracts>[0]) => {

  return useQuery(
    [AppIds.projEstimates, 'contracts', params],
    () => getContracts(params),
  );
};
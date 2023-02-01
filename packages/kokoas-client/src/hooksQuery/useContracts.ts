import { useQuery } from '@tanstack/react-query';
import { getContracts } from 'api-kintone';
import { AppIds } from 'config';
import { useCommonOptions } from './useCommonOptions';


/**
 * 契約を取得する。
 *
 */
export const useContracts = (params: Parameters<typeof getContracts>[0]) => {
  const {
    onError,
  } = useCommonOptions();

  return useQuery(
    [AppIds.projEstimates, 'contracts', params],
    () => getContracts(params),
    {
      onError,
    },
  );
};
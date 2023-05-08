import { useQuery } from '@tanstack/react-query';
import { getContracts } from 'api-kintone';
import { AppIds } from 'config';
import { useCommonOptions } from './useCommonOptions';


/**
 * 契約を取得する。
 * @deprecated 契約に関するデータは見積もりに依存しなくなるため、この関数は廃止されます。
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
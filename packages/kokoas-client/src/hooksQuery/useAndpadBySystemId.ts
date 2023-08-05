import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { getOrderBySystemId } from '../api/andpad/getOrderBySystemId';
import { GetOrderBySystemIdParams } from 'api-andpad';


interface QueryOptions {
  onError?: (error: Error) => void,
  enabled?: boolean,
}

/**
 * Andpadから案件データを取得する
 */
export const useAndpadBySystemId = (
  params: GetOrderBySystemIdParams,
  options?: QueryOptions,
) => {

  const {
    onError,
    enabled = true,
  } = options || {};

  const {
    systemId,
  } = params || {};

  return useQuery(
    [AppIds.projects, 'andpad', params],
    () => getOrderBySystemId(params),
    {
      enabled: !!systemId && enabled,
      staleTime: 5000,
      onError,
    },
  );
};
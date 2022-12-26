import { useQuery } from '@tanstack/react-query';
import { getSystemUpdate } from 'api-kintone/src/systemUpdate/getSystemUpdate';
import { AppIds } from 'config';

/**　最新のシステム改修履歴を取得する */
export const useSystemUpdate = () => {
  return useQuery(
    [AppIds.systemUpdate],
    getSystemUpdate,
  );
};
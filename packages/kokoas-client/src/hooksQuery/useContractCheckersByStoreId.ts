

import { getContractCheckers } from 'api-kintone';
import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';


/**
 * 契約の確認者のレコードを取得する
 */
export const useContractCheckersByStoreId = ({
  storeId,
  territory,
}: {
  storeId: string,
  territory: string,
}) => {
  return useQuery(
    [AppIds.contracts, storeId],
    () => getContractCheckers({
      storeId,
      territory,

    }),
    {
      enabled: !!storeId,
    },
  );

};

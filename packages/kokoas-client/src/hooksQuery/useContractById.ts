

import { getContractById } from 'api-kintone';
import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';


/**
 * 契約のuuidで契約レコードを取得する
 */
export const useContractById = (id: string) => {
  return useQuery(
    [AppIds.contracts, 'contractId', id],
    () => getContractById(id),
    {
      enabled: !!id,
    },
  );

};


import { AppIds } from 'config';
import { useQuery } from '@tanstack/react-query';
import { getContractsByProjIds } from 'api-kintone/src/contracts/getContractsByProjIds';
import { TEnvelopeStatus } from 'types';

/**
 * 複数工事番号で契約一覧を取得する
 */
export const useContractsByProjIds = ({
  projIds = [],
  envStatus,
  enabled = true,
}:{
  projIds: string[],
  envStatus?: TEnvelopeStatus,
  enabled?: boolean,
}) => {

  return useQuery(
    [AppIds.contracts, 'projIds', projIds],
    () => getContractsByProjIds({
      projIds,
      envStatus,
    }),
    {
      enabled: !!projIds.length && enabled,
    },
  );
};
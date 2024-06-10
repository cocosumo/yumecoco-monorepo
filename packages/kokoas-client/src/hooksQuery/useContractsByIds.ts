
import { TEnvelopeStatus } from 'types';
import { useAllContracts } from './useAllContracts';
import { useCallback } from 'react';

/**
 * 複数uuidで契約一覧を取得する
 */
export const useContractsByIds = ({
  contractIds = [],
  envStatus,
}:{
  contractIds: string[],
  envStatus?: TEnvelopeStatus,
}) => {

  return useAllContracts({
    select: useCallback((data) => {
      return data
        .filter(
          (rec) => contractIds
            .includes(rec.uuid.value) 
            && (envStatus === undefined || (rec.envelopeStatus.value as TEnvelopeStatus) === envStatus),
        );
    }, [envStatus, contractIds]),
  });

};

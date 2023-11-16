
import { TEnvelopeStatus } from 'types';
import { useAllContracts } from './useAllContracts';
import { useCallback } from 'react';

/**
 * 複数工事番号で契約一覧を取得する
 */
export const useContractsByProjIds = ({
  projIds = [],
  envStatus,
}:{
  projIds: string[],
  envStatus?: TEnvelopeStatus,
}) => {

  return useAllContracts({
    select: useCallback((data) => {
      return data.filter((rec) => projIds.includes(rec.projId.value) && (rec.envelopeStatus.value as TEnvelopeStatus) === envStatus);
    }, [envStatus, projIds]),
  });

};
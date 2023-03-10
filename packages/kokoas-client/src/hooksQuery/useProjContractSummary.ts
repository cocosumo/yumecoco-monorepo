import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { getEstimatesByProjId } from 'api-kintone';
import { TEnvelopeStatus } from 'types';

/**
 * 工事番号で契約済み見積もりが存在するかを取得する
 */
export const useProjContractSummary = (
  projId = '',
) => {

  return useQuery(
    [AppIds.projEstimates, { projId }],
    () =>  getEstimatesByProjId(projId),
    {
      enabled: !!projId,
      select: ({ records }) => {
        let hasContract = false;
        const summary = {
          ...records.reduce((acc, cur) => {
            const envStatus: TEnvelopeStatus = cur.envStatus.value as TEnvelopeStatus;

            if (envStatus) hasContract = true;

            acc[envStatus] = (acc[envStatus] || 0) + 1;

            return acc;
          }, Object.create(null) as Record<TEnvelopeStatus, number>),
          hasContract,
        };

        return summary;
      },
    },
  );
};
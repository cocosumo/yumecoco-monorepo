import { useQuery } from '@tanstack/react-query';
import { getAllContracts } from 'api-kintone';
import { KContracts } from 'types';

/** ココアスの契約情報 */
const envStatusKey: KContracts = 'envelopeStatus';
const projIdKey: KContracts = 'projId';
export const useCompletedContracts = (projIds: string[]) => {

  const projIdsConditions = projIds
    .map((projId) => `${projIdKey} = "${projId}"`)
    .join(' or ');

  const condition = [
    `${envStatusKey} != ""`,
    `(${projIdsConditions})`,
  ].join(' and ');

  return useQuery(
    ['completed-contracts', projIds],
    async () => getAllContracts({
      condition,
      orderBy: `${envStatusKey} desc`,
    }),
    {
      enabled: projIds.length > 0,
    },
  );
};
import { useQuery } from '@tanstack/react-query';
import { getAllContracts } from 'api-kintone';
import { KContracts } from 'types';

/** ココアスの契約情報 */
const envStatusKey: KContracts = 'envelopeStatus';
export const useCompletedContracts = () => {

  const condition = [
    `${envStatusKey} = "completed"`,
  ].join(' and ');

  return useQuery(
    ['completed-contracts'],
    async () => getAllContracts({
      condition,
      orderBy: `${envStatusKey} desc`,
    }),
  );
};
import { TEnvelopeStatus } from 'types';
import { useContractsByProjIds } from './useContractsByProjIds';
import { useProjsByCustGroupId } from './useProjsByCustGroupId';

/**
 * Returns a list of contracts by customer group ID.
 * @param custGroupId - The ID of the customer group.
 * @param envStatus - The status of the envelope.
 * @param enabled - Whether the hook is enabled or not.
 * @returns A list of contracts by project IDs.
 */
export const useContractsByCustGroupIdV2 = ({
  custGroupId,
  envStatus = 'completed',
}:{
  custGroupId: string,
  envStatus?: TEnvelopeStatus,
}) => {
  const { data: projRecs = [] } = useProjsByCustGroupId(custGroupId);
  
  const projIds = projRecs.map(({ uuid }) => uuid.value);

  return useContractsByProjIds({
    projIds,
    envStatus: envStatus,
  });

};
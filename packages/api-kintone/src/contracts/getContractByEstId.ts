import { RecordKey } from './config';
import { getAllContracts } from './getAllContracts';

const projEstimateIdKey : RecordKey = 'projEstimateId';

export const getContractByEstId = async (projId: string) => {
  return getAllContracts({
    condition: `${projEstimateIdKey} = "${projId}"`,
  });
};
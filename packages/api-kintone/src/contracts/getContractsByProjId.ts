import { RecordKey } from './config';
import { getAllContracts } from './getAllContracts';

const projIdKey : RecordKey = 'projId';

export const getContractsByProjId = async (projId: string) => {
  return getAllContracts({
    condition: `${projIdKey} = "${projId}"`,
  });
};
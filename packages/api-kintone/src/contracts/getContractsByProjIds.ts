import { TEnvelopeStatus } from 'types';
import { RecordKey } from './config';
import { getAllContracts } from './getAllContracts';

const projIdKey : RecordKey = 'projId';
const envelopeStatusKey : RecordKey = 'envelopeStatus';

export const getContractsByProjIds = async ({
  projIds,
  envStatus,
}:{
  projIds: string[],
  envStatus?: TEnvelopeStatus,
}) => {

  const idConditions = projIds.map(projId => `${projIdKey} = "${projId}"`).join(' or ');

  const condition = [
    idConditions,
  ];

  if (envStatus) {
    condition.push(`${envelopeStatusKey} = "${envStatus}"`);
  }
  

  return getAllContracts({
    condition: condition.join(' and '),
  });
};
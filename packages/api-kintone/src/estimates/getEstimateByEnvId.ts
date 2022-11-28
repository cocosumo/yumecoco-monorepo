import { getRecords } from '../common';
import { appId, RecordKey, RecordType } from './config';

export const getEstimateByEnvId = async (envelopeId: string) => {

  const envIdField : RecordKey = 'envId';

  const { records } = await getRecords<RecordType>({
    app: appId,
    query: `${envIdField} = "${envelopeId}"`,
  });

  if (!records.length) throw new Error('Envelope not linked to kintone.');

  return records[0];
};

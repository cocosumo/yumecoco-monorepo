import { getRecords } from '../common';
import { appId, RecordKeys, RecordType } from './config';

export const getEstimateByEnvId = async (envelopeId: string) => {

  const envIdField : RecordKeys = 'envId';

  const { records } = await getRecords<RecordType>({
    app: appId,
    query: `${envIdField} = "${envelopeId}"`,
  });

  if (!records.length) throw new Error('Envelope not linked to kintone.');

  return records[0];
};

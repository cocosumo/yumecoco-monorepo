import { IProjestimates, KProjects } from 'types';
import { APPIDS, KintoneRecord } from './config';
import { getKeyEstimate } from './getKeys';

export const getEstimateByEnvId = async (envelopeId: string) => {

  const { records } = await KintoneRecord.getRecords({
    app: APPIDS.projEstimate,
    query: `${getKeyEstimate('envId')} = "${envelopeId}"`,
    fields: ['$id', 'voidedEnvelopes'] as KProjects[],
  });

  if (!records.length) throw new Error('Envelope not linked to kintone.');

  return records[0] as unknown as IProjestimates;
};

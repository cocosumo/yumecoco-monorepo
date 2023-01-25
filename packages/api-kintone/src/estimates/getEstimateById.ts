import { getRecords } from '../common';
import { appId, RecordKey, RecordType } from './config';

const idField : RecordKey = 'uuid';

export const getEstimateById = async (
  estimateId: string,
) => getRecords<RecordType>({
  app: appId,
  query: `${idField} = "${estimateId}"`,
}).then(({ records }) => records[0] );
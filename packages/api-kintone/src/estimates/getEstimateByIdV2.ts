import { getRecords } from '../common';
import { appId, RecordKey, RecordType } from './config';

const idField : RecordKey = 'uuid';

export const getEstimateByIdV2 = async (
  estimateId: string,
) => getRecords<RecordType>({
  app: appId,
  query: `${idField} = "${estimateId}"`,
}).then(({ records }) => records[0] );
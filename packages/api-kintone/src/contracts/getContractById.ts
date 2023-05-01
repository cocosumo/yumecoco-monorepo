import { getRecords } from '../common';
import { appId, RecordKey, RecordType } from './config';

const idField : RecordKey = 'uuid';

export const getContractById = async (
  uuid: string,
) => getRecords<RecordType>({
  app: appId,
  query: `${idField} = "${uuid}"`,
}).then(({ records }) => records[0] );
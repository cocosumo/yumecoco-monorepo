import { getRecords } from '../common';
import { appId, RecordKey, RecordType } from './config';

const idField: RecordKey = 'uuid';

export const getExternalMemberById = async (
  recordId: string,
) =>  getRecords<RecordType>({
  app: appId,
  query: `${idField} = "${recordId}"`,
}).then(({ records }) => records[0] ?? null);

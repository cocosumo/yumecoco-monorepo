import { getRecords } from '../common';
import { appId, RecordKeys, RecordType } from './config';

export const getInvoiceByCustGroupId = async (custGroupId: string) => {
  if (!custGroupId) throw new Error('Invalid project id.');

  const custGroupIdKey: RecordKeys = 'custGroupId';

  return getRecords<RecordType>({
    app: appId,
    query: `${custGroupIdKey} = "${custGroupId}"`,
  });
};
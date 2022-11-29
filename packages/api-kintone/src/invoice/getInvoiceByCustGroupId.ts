import { KProjestimates } from 'types';
import { getRecords } from '../common';
import { appId, RecordType } from './config';

export const getInvoiceByCustGroupId = async (custGroupId: string) => {
  if (!custGroupId) throw new Error('Invalid project id.');

  const custGroupIdKey: KProjestimates = 'custGroupId';

  return getRecords<RecordType>({
    app: appId,
    query: `${custGroupIdKey} = "${custGroupId}"`,
  });
};
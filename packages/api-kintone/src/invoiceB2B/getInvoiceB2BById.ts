

import { appId, RecordKey, RecordType } from './config';
import { getRecords } from '../common';

const idField: RecordKey = 'uuid';

export const getInvoiceB2BById = async (
  recordId: string,
) => getRecords<RecordType>({
  app: appId,
  query: `${idField} = "${recordId}"`,
}).then(({ records }) => records[0] ?? null);
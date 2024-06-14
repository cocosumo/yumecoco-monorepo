import { getRecords } from '../common';
import { RecordKey, RecordType, appId } from './config';

const idField: RecordKey = 'uuid';

export const getInvoiceB2CById = async (
  uuid: string,
) => getRecords<RecordType>({
  app: appId,
  query: `${idField} = "${uuid}"`,
}).then(({ records }) => records[0]);

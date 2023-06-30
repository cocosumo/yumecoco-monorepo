import { getRecords } from '../common';
import { RecordKey, RecordType, appId } from './config';

export const getAndpadPaymentsBySystemId = async (systemId: string | number) => {
  const idField: RecordKey = 'systemId';
  const orderField: RecordKey = 'inquiryId';
  const query = `${idField}="${systemId}" order by ${orderField} desc`;

  return getRecords<RecordType>({
    app: appId,
    query,
  }).then(({ records }) => records);
};
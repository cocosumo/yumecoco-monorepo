import { getRecords } from '../common';
import { appId, RecordKeys, RecordType } from './config';

export const getInvoiceByEstDataId = async (estDataId: string) => {
  if (!estDataId) throw new Error('Invalid estData id.');

  const dataIdKey: keyof RecordType['estimateLists']['value'][number]['value'] = 'dataId';
  const invStatusKey: RecordKeys = 'invoiceStatus';

  const query = [
    `(${invStatusKey} = "sent" or ${invStatusKey} = "created")`,
    `${dataIdKey} in ("${estDataId}")`,
  ].join(' and ');

  return getRecords<RecordType>({
    app: appId,
    query: query,
  });
};
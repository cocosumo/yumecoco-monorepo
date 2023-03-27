import { getRecords } from '../common';
import { appId, RecordType } from './config';

export const getInvoiceByEstDataId = async (estDataId: string) => {
  if (!estDataId) throw new Error('Invalid estData id.');

  const dataIdKey : keyof RecordType['estimateLists']['value'][number]['value'] = 'dataId';
  
  return getRecords<RecordType>({
    app: appId,
    query: `${dataIdKey} in ("${estDataId}")`,
  });
};
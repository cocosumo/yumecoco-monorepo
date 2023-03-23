import { getRecords } from '../common';
import { appId, RecordKeys, RecordType } from './config';

export const getInvoiceByEstDataId = async (estDataId: string) => {
  if (!estDataId) throw new Error('Invalid estData id.');


  const dataIdKey: RecordKeys = 'dataId';
  
  return getRecords<RecordType>({
    app: appId,
    query: `${dataIdKey} in "${estDataId}"`,
  });



};

import { ktRecord } from '../client';
import { appId, RecordKey, RecordType } from './config';

export const searchFields: RecordKey[] = ['supplierName', 'supplierName_ruby'];


export const findSuppliersByName = async (
  supplierName = '',
) => {

  const query = searchFields.map((field) => `${field} like "${supplierName}"`).join(' or ');

  return (await ktRecord()).getRecords({
    app: appId, 
    query, 
  }).then(({ records }) => records as unknown as RecordType[]);
};

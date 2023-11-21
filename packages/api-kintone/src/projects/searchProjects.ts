import { ktRecord } from '../client';
import { appId, RecordKey, RecordType } from './config';

const resolveOperator = (field: RecordKey) => {
  switch (field) {
    case '$id': return '=';
    default: return 'like';
  }
};

export const searchProjects = async (search: string) => {

  const searchFields : RecordKey[] = [
    'projName', 
    '$id', 
    'store', 
    'address1', 
    'address2', 
  ]; 

  const query = searchFields
    .map((fld) => `(${fld} ${resolveOperator(fld)} "${search}")`)
    .join(' or ');

  return (await ktRecord()).getRecords({
    app: appId,
    query,
    totalCount: true,
  })
    .then(r => r.records as unknown as RecordType[]);
};
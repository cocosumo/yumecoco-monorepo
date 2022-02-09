import { APP_ID } from './config';
import { KintoneRecord } from './../config';

type KeyOfEmployee = keyof EmployeeTypes.SavedData;

export const getEmployees  = async (params ?: GetRecordParams) => {
  const queryArray = ['状態 in ("有効")', '役職 in ("店長", "主任", "営業")'];
  if (params?.query) queryArray.push(params.query);
  return KintoneRecord.getAllRecords({
    app: APP_ID, 
    fields: ['$id', 'storeNumber', 'affiliation', '文字列＿氏名'] as KeyOfEmployee[], 
    condition: queryArray.join(' and '),

  });
};


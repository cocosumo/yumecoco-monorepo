import { APP_ID } from './config';
import { APPIDS, KintoneRecord } from './../config';

type KeyOfEmployee = keyof EmployeeTypes.SavedData;

export const getEmployees  = async (params ?: GetRecordParams) => {
  const queryArray = ['状態 in ("有効")', '役職 in ("店長", "主任", "営業", "工務")'];
  if (params?.query) queryArray.push(params.query);
  return KintoneRecord.getAllRecords({
    app: APP_ID,
    fields: ['$id', 'mainStoreId', 'affiliation', 'affiliateStores', '文字列＿氏名'] as KeyOfEmployee[],
    condition: queryArray.join(' and '),
  });
};

export const getConstructionAgents = async () => {

  return KintoneRecord.getAllRecords({
    app: APPIDS.employees,
    fields: ['$id', 'mainStore', '文字列＿氏名'] as KeyOfEmployee[],
    condition:[
      `${'状態' as KeyOfEmployee} in ("有効")`,
      `${'affiliation' as KeyOfEmployee} in ("ここすも")`,
      `${'役職' as KeyOfEmployee} in ("工務")`,
    ].join(' and '),
  }) as unknown as Promise<EmployeeTypes.SavedData[]>;
};


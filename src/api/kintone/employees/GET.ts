import { APP_ID } from './config';
import { APPIDS, KintoneRecord } from './../config';
import { resolveAffiliations, resolveRoles } from './helpers';


type KeyOfEmployee = keyof EmployeeTypes.SavedData;

export type EmployeeType = 'yumeAG' | 'cocoAG' | 'cocoConst' | 'sutekura';
export type EmpAffiliations = 'ここすも' | 'すてくら' | 'ゆめてつ';
export type EmpRoles = '店長' | '主任' | '営業' | '工務';

export const AGLabels : Record<EmployeeType, string> = {
  cocoAG : '営業担当者',
  yumeAG : 'ゆめてつAG',
  cocoConst : '工事担当者',
  sutekura: 'すてくら',
};


export interface GetEmployeesParams {
  type : EmployeeType | EmployeeType[],
  isActiveOnly?: boolean,
  storeId ?: string,
  isStoreIdRequired ?: boolean,
  territory?: '西' | '東' | null
}

export const getEmployees  = async (params ?: GetRecordParams) => {
  const queryArray = ['状態 in ("有効")', '役職 in ("店長", "主任", "営業", "工務")'];
  if (params?.query) queryArray.push(params.query);
  return KintoneRecord.getAllRecords({
    app: APP_ID,
    fields: ['$id', 'mainStoreId', 'affiliation', 'affiliateStores', '文字列＿氏名'] as KeyOfEmployee[],
    condition: queryArray.join(' and '),
  });
};


export const getCocoConst = async () => {

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

export const getSpecifiedEmployees = async (params: GetEmployeesParams) => {
  const {
    type = 'yumeAG',
    isActiveOnly = true,
    isStoreIdRequired = false,
    storeId,
    territory,
  } = params;

  if (isStoreIdRequired && !storeId) return [];

  const affiliations = resolveAffiliations(type)
    .map(item => `"${item}"`).join(',');

  const roles = resolveRoles(type)
    .map(item => `"${item}"`).join(',');

  return KintoneRecord.getAllRecords({
    app: APPIDS.employees,
    fields: ['$id', 'mainStore', '文字列＿氏名', 'affiliation', 'territory'] as KeyOfEmployee[],
    condition: [
      ...(isActiveOnly ? [`${'状態' as KeyOfEmployee} in ("有効")`] : []),

      ...(storeId ? [`(${'mainStoreId' as KeyOfEmployee} = "${storeId}" or ${'storeId' as KeyOfEmployee} in ("${storeId}"))`] : []),

      ...(territory ? [`${'territory' as KeyOfEmployee} = "${territory}"`] : []),

      `${'affiliation' as KeyOfEmployee} in (${affiliations})`,

      `${'役職' as KeyOfEmployee} in (${roles})`,

    ].join(' and '),
  });
};
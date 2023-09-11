import { getAllRecords } from 'api-kintone';
import { appId } from '../../src/constants';
import { getFirstAndLastDay } from './getFirstAndLastDay';

export interface GetContractRecordsParams {
  year: number,
  month: number,
  store?: string,
}


/**
 * 契約情報を取得する
 * 
 * @param params 
 * @returns 
 */
export const getContractRecords = async (
  params: GetContractRecordsParams,
) => {
  const {
    year,
    month,
    store,
  } = params;

  const {
    firstDay,
    lastDay,
  } = getFirstAndLastDay(year, month);

  const queryArr = [
    `contractDate >= "${firstDay}"`,
    `contractDate <= "${lastDay}"`,
  ];

  if (store) {
    queryArr.push(`storeId = "${store}"`);
  }
  
  const query = queryArr.join(' and ');
      
  return getAllRecords<DB.SavedRecord>({
    app: appId,
    condition: query,
    orderBy: 'contractDate asc',
  });
  
};


/**
 * 契約情報を取得して、店舗でグループ化する
 * 
 * @param params
 * @returns
 */
export const getContractsGroupedByStore = async (
  params: GetContractRecordsParams,
) => {
  const records = await getContractRecords(params);
  
  const grouped = records.reduce((acc, record) => {
    const storeId = record.storeId.value;

    if (!acc[storeId]) {
      acc[storeId] = [];
    }

    acc[storeId].push(record);

    return acc;
  }, {} as Record<string, DB.SavedRecord[]>);

  return grouped;
  
};
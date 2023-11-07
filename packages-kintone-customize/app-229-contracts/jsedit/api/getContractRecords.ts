import { getAllRecords } from 'api-kintone';
import { appId } from '../../src/constants';
import { getFirstAndLastDay } from './getFirstAndLastDay';

export interface GetContractRecordsParams {
  year: number | string,
  month: number | string,
  store?: string,
}


/**
 * 契約情報を取得する
 * 
 * @param params ：year（年）、month（月）、store（店舗）
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

  //月の開始日と終了日
  const {
    firstDay,
    lastDay,
  } = getFirstAndLastDay(+year, +month);

  //契約レコードの契約日を月の範囲内のみにする
  const queryArr = [
    `contractDate >= "${firstDay}"`,
    `contractDate <= "${lastDay}"`,
  ];

  if (store) {
    queryArr.push(`storeId = "${store}"`);
  }
  
  const query = queryArr.join(' and ');
      
  //条件に合致したレコードを返す
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
    //reduceメソッド：コールバック関数を累積する。今回はグループ化するために使用
    //acc：accumulator：累積値。初回の呼び出し時には初期値（または前のコールバックの戻り値）
    const storeId = record.storeId.value;

    if (!acc[storeId]) {
      acc[storeId] = [];
    }

    acc[storeId].push(record);

    return acc;
  }, {} as Record<string, DB.SavedRecord[]>);

  return grouped;
  
};
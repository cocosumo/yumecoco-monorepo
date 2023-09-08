import { RecordKey } from './config';
import { getAllContracts } from './getAllContracts';


export type TimePeriod = 'DAYS' | 'WEEKS' | 'MONTHS' | 'YEARS';
const updateDateKey : RecordKey = '更新日時';

/**
 * 今日を基点に、引数で指定した期間分前までの契約一覧を抽出する
 * @param number 数字を指定する
 * @param period 単位を指定する
 * @returns 
 */
export const getContractsByUpdateDate = async (number: number, period: TimePeriod) => {
  return getAllContracts({
    condition: `${updateDateKey} >= FROM_TODAY(-${number}, ${period})`,
  });
};

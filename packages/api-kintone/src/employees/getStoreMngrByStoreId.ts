import { EmpAffiliations, KEmployees, KEmployeeStores } from 'types';
import { getRecords } from '../common';
import { appId, RecordType } from './config';

/**
 * 店舗番号で店長の社員レコードを取得する
 */
export const getStoreMngrByStoreId = async (storeId: string) => {

  const keyStoreId : KEmployeeStores = 'affStoreId';
  const affiliation: KEmployees = 'affiliation';
  const role : KEmployees = '役職';
  const cocosumo: EmpAffiliations = 'ここすも';

  const { records } = await getRecords<RecordType>({

    app: appId,
    query: [
      `${keyStoreId} in ("${storeId}")`,
      `${affiliation} in ("${cocosumo}")`,
      `${role} in ("店長")`,
    ].join(' and '),
  });

  if (!records.length) throw new Error(`店長の情報は取得できませんでした。店舗番号：${storeId}`);

  return records[0];

};

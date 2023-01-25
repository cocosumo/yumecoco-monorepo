import { EmpAffiliations, KEmployees, KEmployeeStores } from 'types';
import { getRecords } from '../common';
import { getStoreById } from '../stores';
import { appId, RecordType } from './config';

/**
 * 店舗番号で店長の社員レコードを取得する
 */
export const getContractCheckers = async (storeId: string) => {

  const hqStoreId = '17212652-df2a-4616-ba51-8907947f9782';

  const {
    territory, // エリア
  } =  await getStoreById(storeId);


  const keyStoreId : KEmployeeStores = 'affStoreId';
  const affiliation: KEmployees = 'affiliation';
  const role : KEmployees = '役職';
  const empTerritory: KEmployees = 'territory_v2';
  const empStoreId: KEmployees = 'mainStoreId_v2';
  const cocosumo: EmpAffiliations = 'ここすも';

  const storeMgrQuery =  [
    `${keyStoreId} in ("${storeId}")`,
    `${affiliation} in ("${cocosumo}")`,
    `${role} in ("店長")`,
  ].join(' and ');

  const accountingQuery = [
    `${role} in ("経理")`,
    `${affiliation} in ("${cocosumo}")`,
    `${empTerritory} = "${territory.value}"`,
  ].join(' and ');

  const accountingHQQuery = [
    `${role} in ("経理")`,
    `${affiliation} in ("${cocosumo}")`,
    `${empStoreId} = "${hqStoreId}"`,
  ].join(' and ');

  const finalQuery = [
    storeMgrQuery,
    accountingQuery,
    accountingHQQuery,
  ]
    .map(q => `(${q})`)
    .join(' or ');

  const { records } = await getRecords<RecordType>({
    app: appId,
    query: `${finalQuery} order by ${role} asc`,
  });


  const storeMgr = records.find(({ 役職 }) => 役職.value === '店長' );
  const accounting = records.find(({ mainStoreId_v2: mainStoreId, 役職 }) => 役職.value === '経理' && mainStoreId.value !== hqStoreId );
  const mainAccounting = records.find(({ mainStoreId_v2: mainStoreId, 役職 }) => 役職.value === '経理' && mainStoreId.value === hqStoreId );

  if (!records.length) throw new Error(`確認者の情報取得ができませんでした。店舗番号：${storeId}`);
  if (records.length !== 3) throw new Error(`確認者3名が、${records.length}名取得しました。店舗番号：${storeId}`);
  if (!storeMgr) throw new Error(`店長の情報取得ができませんでした。${storeMgr}`);
  if (!accounting) throw new Error(`経理の情報取得ができませんでした。${accounting}`);
  if (!mainAccounting) throw new Error(`本社経理の情報取得ができませんでした。${mainAccounting}`);


  return {
    storeMgr,
    accounting,
    mainAccounting,
  };

};

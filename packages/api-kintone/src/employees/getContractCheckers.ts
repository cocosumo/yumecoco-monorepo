import { EmpAffiliations, KEmployees, KEmployeeStores } from 'types';
import { getRecords } from '../common';
import { appId, RecordType } from './config';

/**
 * 店舗番号で店長の社員レコードを取得する
 * 
 * @returns {Checkers}
 * @returns {Checkers.storeMgr} 店長
 * @returns {Checkers.accounting} 担当エリアの経理
 * @returns {Checkers.mainAccounting} 本社経理
 * @returns {Checkers.subAccounting} 経理(最終確認者)
 */
export const getContractCheckers = async ({
  territory, // エリア
  storeId, // 店舗番号
}: {
  storeId: string,
  territory: string,
}) => {

  const hqStoreId = '17212652-df2a-4616-ba51-8907947f9782';
  const subAccountingId = 'c606e9ef-22c9-4dac-a064-556708811d99';

  /*   const {
    territory, // エリア
  } =  await getStoreById(storeId); */


  const keyStoreId: KEmployeeStores = 'affStoreId';
  const affiliation: KEmployees = 'affiliation';
  const role: KEmployees = '役職';
  const empTerritory: KEmployees = 'territory_v2';
  const empStoreId: KEmployees = 'mainStoreId_v2';
  const cocosumo: EmpAffiliations = 'ここすも';

  const storeMgrQuery = [
    `${keyStoreId} in ("${storeId}")`,
    `${affiliation} in ("${cocosumo}")`,
    `${role} in ("店長")`,
  ].join(' and ');

  const accountingQuery = [
    `${role} in ("経理")`,
    `${affiliation} in ("${cocosumo}")`,
    `${empTerritory} = "${territory}"`,
  ].join(' and ');

  const accountingHQQuery = [
    `${role} in ("経理")`,
    `${affiliation} in ("山豊")`,
    `${empStoreId} = "${hqStoreId}"`,
  ].join(' and ');

  // https://rdmuhwtt6gx7.cybozu.com/k/34/show#record=152
  const subAccountingQuery = [
    `${role} in ("経理")`,
    `${affiliation} in ("${cocosumo}")`,
    `uuid = "${subAccountingId}"`,
  ].join(' and ');

  const finalQuery = [
    storeMgrQuery,
    accountingQuery,
    accountingHQQuery,
    subAccountingQuery,
  ]
    .map(q => `(${q})`)
    .join(' or ');

  const { records } = await getRecords<RecordType>({
    app: appId,
    query: `${finalQuery} order by ${role} asc`,
  });


  const storeMgr = records.find(({ 役職 }) => 役職.value === '店長');
  const accounting = records.find(({ mainStoreId_v2: mainStoreId, 役職, territory_v2: territoryV2 }) =>
    役職.value === '経理' && mainStoreId.value !== hqStoreId && territoryV2.value === territory);
  const mainAccounting = records.find(({ mainStoreId_v2: mainStoreId, 役職 }) => 役職.value === '経理' && mainStoreId.value === hqStoreId);
  const subAccounting = records.find(({ uuid }) => uuid.value === subAccountingId);

  if (!records.length) throw new Error(`確認者の情報取得ができませんでした。店舗番号：${storeId}`);
  if (!storeMgr) throw new Error(`店長の情報取得ができませんでした。${storeMgr}`);
  if (!accounting) throw new Error(`担当エリアの経理の情報取得ができませんでした。${accounting}`);
  if (!mainAccounting) throw new Error(`本社経理の情報取得ができませんでした。${mainAccounting}`);
  if (!subAccounting) throw new Error(`経理(最終確認者)の情報取得ができませんでした。${subAccounting}`);


  return {
    storeMgr,
    accounting,
    mainAccounting,
    subAccounting,
  };

};

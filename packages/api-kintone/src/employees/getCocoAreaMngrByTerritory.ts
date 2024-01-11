import { EmpAffiliations, KEmployees, Territory } from 'types';
import { getRecords } from '../common';
import { appId, RecordType } from './config';

/**
 * 店舗番号で店長の社員レコードを取得する
 */
export const getCocoAreaMngrByTerritory = async (territory: Territory) => {

  const keyTerritory: KEmployees = 'territory_v2';
  const affiliation: KEmployees = 'affiliation';
  const role: KEmployees = '役職';
  const cocosumo: EmpAffiliations = 'ここすも';

  const { records } = await getRecords<RecordType>({

    app: appId,
    query: [
      `${keyTerritory} in ("${territory}")`,
      `${affiliation} in ("${cocosumo}")`,
      `${role} in ("店長")`,
      '状態 in ("有効")',
    ].join(' and '),
  });

  if (!records.length) throw new Error(`ここすも店長の情報は取得できませんでした。エリア：${territory}`);

  return records[0];

};

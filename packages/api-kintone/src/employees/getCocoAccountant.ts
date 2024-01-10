import { EmpAffiliations, KEmployees } from 'types';
import { RecordType, appId } from './config';
import { getRecords } from '../common';

export const getCocoAccountant = async () => {

  const affiliation: KEmployees = 'affiliation';
  const role : KEmployees = '役職';
  const cocosumo: EmpAffiliations = 'ここすも';

  const { records } = await getRecords<RecordType>({

    app: appId,
    query: [
      `${affiliation} in ("${cocosumo}")`,
      `${role} in ("経理")`,
      '状態 in ("有効")',
    ].join(' and '),
  });

  if (!records.length) throw new Error('ここすも経理担当者の取得に失敗しました。');

  return records;

};

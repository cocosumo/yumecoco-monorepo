import { getContractsByUpdateDate } from 'api-kintone';
import { tgtProjType } from '../../config';


/** 1日以内に更新された契約情報の内、
 * リマインダー対象の工事種別(tgtProjType)の契約のみを取得します */
export const extractUpdatedRecords = async () => {
  return (await getContractsByUpdateDate(1, 'DAYS'))
    .filter((res) => tgtProjType.includes(res.projType.value));
};

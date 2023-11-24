import { updateRecords } from 'api-kintone';
import { appId } from './config';



export type UpdateAndpadPayments = Parameters<typeof updateRecords>[0]['records'];

/**
 * ANDPAD入金一覧レコードを一括更新する
 */
export const updateAndpadPayments = (params: UpdateAndpadPayments) => {

  return updateRecords({
    records: params,
    app: appId,
  });

};

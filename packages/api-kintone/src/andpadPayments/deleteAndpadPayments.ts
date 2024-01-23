import { appId } from './config';
import { deleteRecords } from '../common/deleteRecords';



export type DeleteAndpadPayments = Parameters<typeof deleteRecords>[0]['ids'];

/**
 * ANDPAD入金一覧レコードを一括更新する
 */
export const deleteAndpadPayments = (params: DeleteAndpadPayments) => {

  return deleteRecords({
    ids: params,
    app: appId,
  });

};

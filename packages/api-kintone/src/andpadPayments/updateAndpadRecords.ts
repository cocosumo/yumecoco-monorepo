import { RecordID, Revision, UpdateKey } from '@kintone/rest-api-client/lib/src/client/types';
import { updateRecords } from 'api-kintone';
import { RecordType, appId } from './config';


export type UpdateAndpadPayments = {
  id: RecordID
  record?: Partial<RecordType> | undefined
  revision?: Revision | undefined
} | {
  updateKey: UpdateKey
  record?: Partial<RecordType> | undefined
  revision?: Revision | undefined
};


/**
 * ANDPAD入金一覧レコードを一括更新する
 */
export const updateAndpadRecords = (params: UpdateAndpadPayments[]) => {

  return updateRecords({
    records: params,
    app: appId,
  });

};

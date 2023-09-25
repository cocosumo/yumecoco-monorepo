import { RecordID, Revision, UpdateKey } from '@kintone/rest-api-client/lib/src/client/types';
import { RecordType, appId } from './config';
import { updateAllRecords } from 'api-kintone';


export type UpdatePaymentReminder = {
  id: RecordID
  record?: Partial<RecordType> | undefined
  revision?: Revision | undefined
} | {
  updateKey: UpdateKey
  record?: Partial<RecordType> | undefined
  revision?: Revision | undefined
};


/**
 * 入金アラートレコードを一括更新する
 */
export const updatePaymentReminder = (params: UpdatePaymentReminder[]) => {

  return updateAllRecords({
    records: params,
    app: appId,
  });

};

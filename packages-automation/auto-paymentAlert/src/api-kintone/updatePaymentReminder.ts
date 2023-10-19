import { RecordID, Revision, UpdateKey } from '@kintone/rest-api-client/lib/src/client/types';
import { updateRecords } from 'api-kintone';
import { IPaymentReminder, reminderAppId } from '../../config';


export type UpdatePaymentReminder = {
  id: RecordID
  record?: Partial<IPaymentReminder> | undefined
  revision?: Revision | undefined
} | {
  updateKey: UpdateKey
  record?: Partial<IPaymentReminder> | undefined
  revision?: Revision | undefined
};


/**
 * 入金アラートレコードを一括更新する
 */
export const updatePaymentReminder = (params: UpdatePaymentReminder[]) => {

  return updateRecords({
    records: params,
    app: reminderAppId,
  });

};

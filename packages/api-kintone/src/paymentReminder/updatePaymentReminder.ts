import { RecordID, Revision, UpdateKey } from '@kintone/rest-api-client/lib/client/types';
import { updateAllRecords } from '../common/updateAllRecords';
import { RecordType, appId } from './config';


type UpdatePaymentReminder = {
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

import { RecordID, Revision, UpdateKey } from '@kintone/rest-api-client/lib/src/client/types';
import { updateAllRecords } from 'api-kintone';
import { IInvoiceReminder, reminderAppId } from '../../config';


export type UpdateInvoiceReminder = {
  id: RecordID
  record?: Partial<IInvoiceReminder> | undefined
  revision?: Revision | undefined
} | {
  updateKey: UpdateKey
  record?: Partial<IInvoiceReminder> | undefined
  revision?: Revision | undefined
};


/**
 * 請求書発行アラートレコードを一括更新する
 */
export const updateInvoiceReminder = (params: UpdateInvoiceReminder[]) => {

  return updateAllRecords({
    records: params,
    app: reminderAppId,
  });

};

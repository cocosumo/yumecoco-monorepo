import { addRecords } from 'api-kintone';
import { IInvoiceReminder, reminderAppId } from '../../config';


/**
 * 請求書発行アラートレコードを一括登録する
 */
export const addInvoiceReminder = (params: Partial<IInvoiceReminder>[]) => {

  return addRecords({
    app: reminderAppId,
    records: params,
  });

};

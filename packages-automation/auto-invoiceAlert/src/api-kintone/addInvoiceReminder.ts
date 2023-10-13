import { addRecords } from 'api-kintone';
import { IInvoiceReminder, reminderAppId } from '../../config';


/**
 * 入金アラートレコードを一括登録する
 */
export const addInvoiceReminder = (params: Partial<IInvoiceReminder>[]) => {

  return addRecords({
    app: reminderAppId,
    records: params,
  });

};

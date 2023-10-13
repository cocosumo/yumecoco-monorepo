import { addRecords } from 'api-kintone';
import { IPaymentReminder, reminderAppId } from '../../config';


/**
 * 入金アラートレコードを一括登録する
 */
export const addPaymentReminder = (params: Partial<IPaymentReminder>[]) => {

  return addRecords({
    app: reminderAppId,
    records: params,
  });

};

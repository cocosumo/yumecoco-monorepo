import { updateRecords } from 'api-kintone';
import { reminderAppId } from '../../config';


export type UpdatePaymentReminders = Parameters<typeof updateRecords>[0]['records'];

/**
 * 入金アラートレコードを一括更新する
 */
export const updatePaymentReminder = (params: UpdatePaymentReminders) => {

  return updateRecords({
    records: params,
    app: reminderAppId,
  });

};

import { PaymentReminder } from '../../types/paymentReminder';
import { addPaymentReminder } from '../api-kintone/addPaymentReminder';
import { convertReminderToKintone } from './convertReminderToKintone';


/**
 * リマインダーアプリへ未登録の契約を登録する
 * @param reminderJson 登録する入金リマインダーのデータ配列
 */
export const registerReminders = async ({
  reminderJson,
}: {
  reminderJson: PaymentReminder[]
}) => {

  const kintoneRecords = convertReminderToKintone({ paymentReminderJson: reminderJson });


  try {
    await addPaymentReminder(kintoneRecords);
  } catch (error) {
    console.error('kintoneへのリマインダーアプリ登録処理でエラーが発生しました。', error);
  }

};

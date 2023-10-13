import { InvoiceReminder } from '../../types/InvoiceReminder';
import { addInvoiceReminder } from '../api-kintone/addInvoiceReminder';
import { convertReminderToKintone } from './convertReminderToKintone';


/**
 * リマインダーアプリへ未登録の契約を登録する
 * @param reminderJson 登録する入金リマインダーのデータ配列
 */
export const registerReminders = async ({
  reminderJson,
}: {
  reminderJson: InvoiceReminder[]
}) => {

  const kintoneRecords = convertReminderToKintone({ invoiceReminderJson: reminderJson });


  try {
    await addInvoiceReminder(kintoneRecords);
  } catch (error) {
    console.error('kintoneへのリマインダーアプリ登録処理でエラーが発生しました。', error);
  }

};

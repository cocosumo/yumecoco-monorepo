import { getEmployees } from 'api-kintone';
import { getUnissuedInvReminderRecByAlertDate } from './helper/getUnissuedInvReminderRecByAlertDate';



export const unissuedInvoiceReminders = async () => {
  console.log('start unissued invoice reminder');


  // ※必要あれば：工事IDから、工事情報、契約情報を再取得し、変更があれば情報を更新する。現状対応見送り
  // 通知先情報のみ取得しなおす
  const [
    recEmployees,
  ] = await Promise.all([
    getEmployees(),
  ]);
  
  // 今日通知予定のリマインダーレコードを取得する
  const reminderRec = await getUnissuedInvReminderRecByAlertDate();

  console.log('reminderRec', reminderRec);
  
  // 通知メッセージの準備


  // chatworkへの通知処理

  // リマインダーレコードの更新処理

  console.log('finish unissued invoice reminder');

};

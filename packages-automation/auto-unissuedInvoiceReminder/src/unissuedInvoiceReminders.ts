import { getUnissuedInvReminderRecByAlertDate } from './helper/getUnissuedInvReminderRecByAlertDate';



export const unissuedInvoiceReminders = () => {
  console.log('start unissued invoice reminder');


  // 関連するレコード情報を取得する

  // 今日通知予定のリマインダーレコードを取得する
  const reminderRec = getUnissuedInvReminderRecByAlertDate(new Date());

  console.log('reminderRec', reminderRec);


  // chatworkへの通知処理

  // リマインダーレコードの更新処理

  console.log('finish unissued invoice reminder');

};

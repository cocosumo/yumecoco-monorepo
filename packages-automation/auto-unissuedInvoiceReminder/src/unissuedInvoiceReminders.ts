import { getEmployees } from 'api-kintone';
import { getRemindersScheduledForToday } from './sections/getRemindersScheduledForToday';
import { notifyReminderToChatwork } from './sections/notifyReminderToChatwork/notifyReminderToChatwork';



export const unissuedInvoiceReminders = async () => {
  console.log('start unissued invoice reminder');


  // ※必要あれば：工事IDから、工事情報、契約情報を再取得し、変更があれば情報を更新する。現状対応見送り
  // 通知先情報のみ取得しなおす
  const [
    recEmployees,
  ] = await Promise.all([
    getEmployees(),
  ]);

  const recReminders = await getRemindersScheduledForToday();

  notifyReminderToChatwork({
    recReminders,
    recEmployees,
  });


  // リマインダーレコードの更新処理


  console.log('finish unissued invoice reminder');

};

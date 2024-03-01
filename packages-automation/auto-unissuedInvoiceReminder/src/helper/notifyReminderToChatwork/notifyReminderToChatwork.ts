import { IEmployees, IUnissuedinvoicealert } from 'types';


export const notifyReminderToChatwork = ({
  recReminders,
  recEmployees,
}: {
  recReminders: IUnissuedinvoicealert[]
  recEmployees: IEmployees[]
}) => {

  // 通知メッセージの準備
  console.log('リマインダーレコードと社員情報から通知メッセージを準備します', recReminders, recEmployees);


  // chatworkへの通知処理

};

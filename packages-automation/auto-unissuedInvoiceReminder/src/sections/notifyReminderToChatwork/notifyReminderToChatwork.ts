import { IEmployees, IUnissuedinvoicealert } from 'types';
import { createReminderMessage } from './createReminderMessage';


export const notifyReminderToChatwork = ({
  recReminders,
  recEmployees,
}: {
  recReminders: IUnissuedinvoicealert[]
  recEmployees: IEmployees[]
}) => {

  // 通知メッセージの準備
  createReminderMessage({
    recReminders,
    recEmployees,
  });


  // chatworkへの通知処理

};

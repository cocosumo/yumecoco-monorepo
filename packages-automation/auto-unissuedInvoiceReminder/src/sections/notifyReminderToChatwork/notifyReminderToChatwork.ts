import { IEmployees, IUnissuedinvoicealert } from 'types';
import { createReminderMessage } from './createReminderMessage';
import { getAlertTarget } from './helper/getAlertTarget';


/** chatworkへリマインダーを通知する */
export const notifyReminderToChatwork = ({
  recReminders,
  recEmployees,
}: {
  recReminders: IUnissuedinvoicealert[]
  recEmployees: IEmployees[]
}) => {

  for (const recReminder of recReminders) {
    // 通知対象者情報の取得
    const alertTarget = getAlertTarget({
      recReminder,
      recEmployees,
    });

    // 通知メッセージの準備
    const message = createReminderMessage({
      recReminder,
    });

    // chatworkへの通知処理
    console.log(message, 'を使用して通知する');

  }
};

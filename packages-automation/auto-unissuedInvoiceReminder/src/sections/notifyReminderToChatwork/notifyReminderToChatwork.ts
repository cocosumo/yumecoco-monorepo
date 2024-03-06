import { IEmployees, IUnissuedinvoicealert } from 'types';
import { notifyReminderToCocoAgCw } from './notifyReminderToCocoAgCw';
import { notifyReminderToAccountantCw } from './notifyReminderToAccountantCw';


/** chatworkへリマインダーを通知する */
export const notifyReminderToChatwork = async ({
  recReminders,
  recEmployees,
}: {
  recReminders: IUnissuedinvoicealert[]
  recEmployees: IEmployees[]
}) => {

  await notifyReminderToCocoAgCw({
    recReminders,
    recEmployees,
  });

  await notifyReminderToAccountantCw({
    recReminders,
  });
};

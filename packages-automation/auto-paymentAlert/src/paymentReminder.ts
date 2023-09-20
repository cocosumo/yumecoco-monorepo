import { createPaymentAlert } from './createPaymentAlert';
import { notifyChatwork } from './notifyChatwork';


/**
 * 入金アラートを通知します
 */
export const paymentReminder = async () => {
  console.log('start payment reminder');

  const reminderJson = await createPaymentAlert();

  notifyChatwork({
    reminderJson: reminderJson,
  });

};

import { PaymentReminder } from '../types/paymentReminder';


/**
 * chatworkへ通知する
 * @param param0 
 */
export const notifyChatwork = ({
  reminderJson,
}: {
  reminderJson: PaymentReminder[]
}) => {

  console.log(reminderJson);

  // TODO 通知処理を実装する

};
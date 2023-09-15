import { territories } from 'types';
import { PaymentReminder } from '../types/paymentReminder';
import { sendMessage } from 'api-chatwork';


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


  // TODO 店長への通知処理を実装する

  for (let i = 0; i < territories.length; i++) {
    const reminderDat = reminderJson.filter(({ territory }) => territory === territories[i]);

    console.log(reminderDat);
    // 各エリアの店長へ、件数とメッセージを通知する
    sendMessage({
      body:,
      roomId:,
    })
  }



};
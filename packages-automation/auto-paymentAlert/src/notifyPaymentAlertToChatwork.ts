import { territories } from 'types';
import { PaymentReminder } from '../types/paymentReminder';
import { sendMessage } from 'api-chatwork';
import { chatworkRooms } from 'config';
import { generateMessage } from './helpers/generateMessage';
import { generateMessageForManager } from './helpers/generateMessageForManager';


/**
 * chatworkへ通知する
 * @param param0 
 */
export const notifyPaymentAlertToChatwork = ({
  reminderJson,
}: {
  reminderJson: PaymentReminder[]
}) => {

  console.log(reminderJson);

  // TODO 通知処理を実装する
  reminderJson.forEach((reminderInfo) => {
    const message = generateMessage(reminderInfo);

    sendMessage({
      body: message,
      roomId: chatworkRooms.rpa02,
    });
  });



  // TODO 店長への通知処理を実装する
  for (let i = 0; i < territories.length; i++) {
    const reminderDat = reminderJson.filter(({ territory }) => territory === territories[i]);

    console.log(reminderDat);
    // 各エリアの店長へ、件数とメッセージを通知する

    const message = generateMessageForManager(reminderDat);
    
    sendMessage({
      body: message,
      roomId: chatworkRooms.rpa02,
    });
  }

};
import { territories } from 'types';
import { PaymentReminder } from '../types/paymentReminder';
import { sendMessage } from 'api-chatwork';
import { generateMessage } from './notificationFunc/generateMessage';
import { generateMessageForManager } from './notificationFunc/generateMessageForManager';
import { chatworkRoomsforCocoSystem } from '../config';


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
      roomId: chatworkRoomsforCocoSystem.rpa02,
      cwToken: process.env.CW_TOKEN_COCOSYSTEM,
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
      roomId: chatworkRoomsforCocoSystem.rpa02,
      cwToken: process.env.CW_TOKEN_COCOSYSTEM,
    });
  }

};
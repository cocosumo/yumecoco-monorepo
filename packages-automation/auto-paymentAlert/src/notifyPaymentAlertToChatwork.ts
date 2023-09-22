import { territories } from 'types';
import { PaymentReminder } from '../types/paymentReminder';
import { sendMessage } from 'api-chatwork';
import { generateMessage } from './notificationFunc/generateMessage';
import { generateMessageForManager } from './notificationFunc/generateMessageForManager';
import { isProd } from 'config';
import { chatworkRooms } from '../config';
import { getCocoAreaMngrByTerritory } from 'api-kintone/src/employees/getCocoAreaMngrByTerritory';


/**
 * chatworkへ通知する
 * @param param0 
 */
export const notifyPaymentAlertToChatwork = async ({
  reminderJson,
}: {
  reminderJson: PaymentReminder[]
}) => {

  console.log(reminderJson);

  reminderJson.forEach((reminderInfo) => {
    const message = generateMessage(reminderInfo);

    for (const cwRoomId of reminderInfo.cwRoomIds) {
      sendMessage({
        body: message,
        roomId: (isProd) ? cwRoomId.cwRoomId : chatworkRooms.test,
        cwToken: process.env.CW_TOKEN_COCOSYSTEM,
      });
    }
  });



  for (let i = 0; i < territories.length; i++) {
    const reminderDat = reminderJson.filter(({ territory }) => territory === territories[i]);

    if (reminderDat.length === 0) continue;

    // 各エリアの店長へ、件数とメッセージを通知する
    const managerDat = await getCocoAreaMngrByTerritory(territories[i]);
    const message = generateMessageForManager(reminderDat);

    sendMessage({
      body: message,
      roomId: (isProd) ? managerDat.chatworkRoomId.value : chatworkRooms.test,
      cwToken: process.env.CW_TOKEN_COCOSYSTEM,
    });
  }

};
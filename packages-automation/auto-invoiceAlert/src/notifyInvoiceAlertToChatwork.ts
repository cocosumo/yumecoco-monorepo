import { territories } from 'types';
import { InvoiceReminder } from '../types/InvoiceReminder';
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
export const notifyInvoiceAlertToChatwork = async ({
  reminderJson,
}: {
  reminderJson: InvoiceReminder[]
}) => {

  const alertReminder = reminderJson.filter(({ alertState }) => alertState);

  for (const reminderInfo of alertReminder) {
    const message = generateMessage(reminderInfo);

    for (const cwRoomId of reminderInfo.cwRoomIds) {

      try {

        await sendMessage({
          body: message,
          roomId: cwRoomId.cwRoomId,
          cwToken: process.env.CW_TOKEN_COCOSYSTEM,
        });

      } catch (error) {

        await sendMessage({
          body: message,
          roomId: (isProd) ? chatworkRooms.cocoasGroup : chatworkRooms.rpaChatGroup,
          cwToken: process.env.CW_TOKEN_COCOSYSTEM,
        });

        await sendMessage({
          body: `${[`【送信エラー】${cwRoomId.agentName}宛メッセージ`, message, JSON.stringify(error.message)].join('\n')}`,
          roomId: chatworkRooms.testRoom,
          cwToken: process.env.CW_TOKEN_COCOSYSTEM,
        });

      }
    }
  }



  for (let i = 0; i < territories.length; i++) {
    const reminderDat = reminderJson.filter(({
      territory,
      alertState,
    }) => (territory === territories[i]) && alertState);


    if (reminderDat.length === 0) continue;

    // 各エリアの店長へ、件数とメッセージを通知する
    const managerDat = await getCocoAreaMngrByTerritory(territories[i]);
    const message = generateMessageForManager(reminderDat);

    try {

      await sendMessage({
        body: message,
        roomId: (isProd) ? managerDat.chatworkRoomId.value : chatworkRooms.test,
        cwToken: process.env.CW_TOKEN_COCOSYSTEM,
      });

    } catch (error) {

      await sendMessage({
        body: message,
        roomId: (isProd) ? chatworkRooms.cocoasGroup : chatworkRooms.rpaChatGroup,
        cwToken: process.env.CW_TOKEN_COCOSYSTEM,
      });

      await sendMessage({
        body: `${[`【送信エラー】${territories[i]}店長宛メッセージ`, message, JSON.stringify(error.message)].join('\n')}`,
        roomId: chatworkRooms.testRoom,
        cwToken: process.env.CW_TOKEN_COCOSYSTEM,
      });

    }
  }

};
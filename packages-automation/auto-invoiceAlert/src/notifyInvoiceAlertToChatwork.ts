import { territories } from 'types';
import { InvoiceReminder } from '../types/InvoiceReminder';
import { sendMessage } from 'api-chatwork';
import { generateMessage } from './notificationFunc/generateMessage';
import { generateMessageForManager } from './notificationFunc/generateMessageForManager';
import { chatworkRooms, isProd } from '../config';
import { getCocoAccountant, getCocoAreaMngrByTerritory } from 'api-kintone';
import { generateMessageForAccountant } from './notificationFunc/generateMessageForAccountant';


/**
 * chatworkへ通知する
 * @param param0 
 */
export const notifyInvoiceAlertToChatwork = async ({
  reminderJson,
}: {
  reminderJson: InvoiceReminder[]
}) => {

  const alertReminder = reminderJson.filter(({ 
    alertState,
    expectedPaymentDate,
  }) => alertState && (expectedPaymentDate && new Date() >= new Date(expectedPaymentDate)));

  // 各担当者への通知
  for (const reminderInfo of alertReminder) {
    const message = generateMessage(reminderInfo);

    for (const cwRoomId of reminderInfo.cwRoomIds) {

      try {

        await sendMessage({
          body: message,
          roomId: (isProd) ? cwRoomId.cwRoomId : chatworkRooms.test,
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


  // 店長へのサマリーの通知
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


  // 経理担当者へのサマリーの通知
  const accountants = await getCocoAccountant();

  for (const accountant of accountants) {

    let reminderDat = [] as InvoiceReminder[];
    if (accountant.territory_v2.value === '東') {
      reminderDat = reminderJson.filter(({
        territory,
        alertState,
      }) => (territory === '東') && alertState);
    } else {
      reminderDat = reminderJson.filter(({ alertState }) => alertState);
    }

    if (reminderDat.length === 0) continue;

    const message = generateMessageForAccountant(reminderDat);

    try {

      await sendMessage({
        body: message,
        roomId: (isProd) ? accountant.chatworkRoomId.value : chatworkRooms.test,
        cwToken: process.env.CW_TOKEN_COCOSYSTEM,
      });

    } catch (error) {

      await sendMessage({
        body: message,
        roomId: (isProd) ? chatworkRooms.cocoasGroup : chatworkRooms.rpaChatGroup,
        cwToken: process.env.CW_TOKEN_COCOSYSTEM,
      });

      await sendMessage({
        body: `${[`【送信エラー】${accountant.territory_v2.value}店長宛メッセージ`, message, JSON.stringify(error.message)].join('\n')}`,
        roomId: chatworkRooms.testRoom,
        cwToken: process.env.CW_TOKEN_COCOSYSTEM,
      });

    }
  }

};

import { territories } from 'types';
import { PaymentReminder } from '../types/paymentReminder';
import { sendMessage } from 'api-chatwork';
import { generateMessage } from './notificationFunc/generateMessage';
import { generateMessageForManager } from './notificationFunc/generateMessageForManager';
import { chatworkRooms, isProd } from '../config';
import { getCocoAreaMngrByTerritory } from 'api-kintone/src/employees/getCocoAreaMngrByTerritory';
import { getCocoAccountant } from 'api-kintone';
import isPast from 'date-fns/isPast';
import addDays from 'date-fns/addDays';
import { numOfDaysUntilAlert } from './helpers/calcAlertStartDate';
import { generateMessageForAccountant } from './notificationFunc/generateMessageForAccountant';



/**
 * chatworkへ通知する
 * @param param0 
 */
export const notifyPaymentAlertToChatwork = async ({
  reminderJson,
}: {
  reminderJson: PaymentReminder[]
}) => {

  // 通知必要かつ、支払予定日から一定期間が過ぎている請求を通知対象とする(通知予定日が更新された際の対策)
  const alertReminder = reminderJson.filter(({
    alertState,
    expectedPaymentDate,
  }) => alertState && (expectedPaymentDate ?
    isPast(addDays(new Date(expectedPaymentDate), numOfDaysUntilAlert.expectedPaymentDate))
    : true));


  // 営業担当者へアラートメッセージを送信する
  for (const reminderInfo of alertReminder) {
    const message = generateMessage(reminderInfo);

    for (const cwRoomId of reminderInfo.cwRoomIds) {

      try {

        await sendMessage({
          body: (isProd) ? message : `【テスト送信】${cwRoomId.agentName}宛のメッセージです \n${message}`,
          roomId: (isProd) ? cwRoomId.cwRoomId : chatworkRooms.test,
          cwToken: process.env.CW_TOKEN_COCOSYSTEM,
        });

      } catch (error) {

        await sendMessage({
          body: (isProd) ? message : `【テスト送信】${cwRoomId.agentName}宛のメッセージです \n${message}`,
          roomId: (isProd) ? chatworkRooms.cocoasGroup : chatworkRooms.rpaChatGroup,
          cwToken: process.env.CW_TOKEN_COCOSYSTEM,
        });

        await sendMessage({
          body: `${[`【送信エラー】${cwRoomId.agentName}宛メッセージ`, message, JSON.stringify(error.message)].join('\n')}`,
          roomId: chatworkRooms.testRoom,
          cwToken: process.env.CW_TOKEN_COCOSYSTEM,
        });

      }

      // TODO API利用制限対策

    }
  }


  // 各エリアの店長へ、件数とメッセージを送信する
  for (let i = 0; i < territories.length; i++) {
    const reminderDat = alertReminder.filter(({
      territory,
    }) => (territory === territories[i]));


    if (reminderDat.length === 0) continue;

    const managerDat = await getCocoAreaMngrByTerritory(territories[i]);
    const messages = generateMessageForManager(reminderDat);

    for (const message of messages) {

      try {

        await sendMessage({
          body: (isProd) ? message : `【テスト送信】${managerDat.文字列＿氏名.value}宛のメッセージです \n${message}`,
          roomId: (isProd) ? managerDat.chatworkRoomId.value : chatworkRooms.test,
          cwToken: process.env.CW_TOKEN_COCOSYSTEM,
        });

      } catch (error) {

        await sendMessage({
          body: (isProd) ? message
            : `【テスト送信】${managerDat.文字列＿氏名.value}宛のメッセージです \n${message}`,
          roomId: (isProd) ? chatworkRooms.cocoasGroup : chatworkRooms.rpaChatGroup,
          cwToken: process.env.CW_TOKEN_COCOSYSTEM,
        });

        await sendMessage({
          body: `${[
            `【送信エラー】${territories[i]}店長 ${managerDat.文字列＿氏名.value}宛メッセージ`,
            message,
            JSON.stringify(error.message)].join('\n')}`,
          roomId: chatworkRooms.testRoom,
          cwToken: process.env.CW_TOKEN_COCOSYSTEM,
        });

      }

      // TODO API利用制限対策

    }
  }



  // 経理担当者へ、件数とメッセージを送信する
  const accountants = await getCocoAccountant();
  for (const accountant of accountants) {
    let reminderDat = [] as PaymentReminder[];

    if (accountant.territory_v2.value === '東') {
      reminderDat = alertReminder.filter(({
        territory,
      }) => (territory === '東'));
    } else {
      reminderDat = alertReminder;
    }


    if (reminderDat.length === 0) continue;

    const messages = generateMessageForAccountant(reminderDat);


    for (const message of messages) {
      try {

        await sendMessage({
          body: (isProd) ? message
            : `【テスト送信】${accountant.文字列＿氏名.value}宛のメッセージです \n${message}`,
          roomId: (isProd) ? accountant.chatworkRoomId.value : chatworkRooms.test,
          cwToken: process.env.CW_TOKEN_COCOSYSTEM,
        });

      } catch (error) {

        await sendMessage({
          body: (isProd) ? message
            : `【テスト送信】${accountant.文字列＿氏名.value}宛のメッセージです \n${message}`,
          roomId: (isProd) ? chatworkRooms.cocoasGroup : chatworkRooms.rpaChatGroup,
          cwToken: process.env.CW_TOKEN_COCOSYSTEM,
        });

        await sendMessage({
          body: `${[
            `【送信エラー】経理${accountant.文字列＿氏名.value}宛メッセージ`,
            message,
            JSON.stringify(error.message)].join('\n')}`,
          roomId: chatworkRooms.testRoom,
          cwToken: process.env.CW_TOKEN_COCOSYSTEM,
        });

      }

      // TODO API利用制限対策

    }
  }
};

import { IEmployees, IUnissuedinvoicealert } from 'types';
import { getAlertTarget } from './helper/getAlertTarget';
import { sendMessage } from 'api-chatwork';
import { chatworkRooms, isProd } from '../../../config';
import { createReminderMsgForCocoAg } from './helper/createReminderMsgForCocoAg';



/** 担当者のchatworkへの通知処理 */
export const notifyReminderToCocoAgCw = async ({
  recReminders,
  recEmployees,
}: {
  recReminders: IUnissuedinvoicealert[]
  recEmployees: IEmployees[]
}) => {

  for (const recReminder of recReminders) {
    // 通知対象者情報の取得
    const alertTargets = getAlertTarget({
      recReminder,
      recEmployees,
    });

    // 通知メッセージの準備
    const message = createReminderMsgForCocoAg({
      recReminder,
    });

    for (const alertTarget of alertTargets) {
      try {

        await sendMessage({
          body: (isProd) ? message : `【テスト送信】${alertTarget.agName}宛のメッセージです \n${message}`,
          roomId: (isProd) ? alertTarget.cwRoomId : chatworkRooms.testRoom,
          cwToken: process.env.CW_TOKEN_COCOSYSTEM,
        });

      } catch (error) {

        // 送信エラー時、グループチャットへ通知する
        await sendMessage({
          body: message,
          roomId: (isProd) ? chatworkRooms.cocoasGroup : chatworkRooms.testRoom,
          cwToken: process.env.CW_TOKEN_COCOSYSTEM,
        });

        // エラー内容をテストルームへ送信する
        await sendMessage({
          body: `${[`【送信エラー】${alertTarget.agName}宛メッセージ
        `, message, JSON.stringify(error.message)].join('\n')}`,
          roomId: chatworkRooms.testRoom,
          cwToken: process.env.CW_TOKEN_COCOSYSTEM,
        });

      }
    }
  }
};

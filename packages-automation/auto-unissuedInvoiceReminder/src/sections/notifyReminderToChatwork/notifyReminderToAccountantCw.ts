import { getCocoAccountant } from 'api-kintone';
import { IUnissuedinvoicealert } from 'types';
import { createReminderMsgForAccountant } from './helper/createReminderMsgForAccountant';
import { sendMessage } from 'api-chatwork';
import { chatworkRooms, isProd } from '../../../config';


/** 経理担当者のchatworkへの通知処理 */
export const notifyReminderToAccountantCw = async ({
  recReminders,
}: {
  recReminders: IUnissuedinvoicealert[]
}) => {

  // 経理担当者へのサマリーの通知
  const accountants = await getCocoAccountant();

  for (const accountant of accountants) {

    let reminderDat = [] as IUnissuedinvoicealert[];
    if (accountant.territory_v2.value === '東') {
      reminderDat = recReminders.filter(({
        area,
        alertState,
      }) => area.value === '東' && alertState.value !== '0');
    } else {
      reminderDat = recReminders.filter(({ alertState }) => alertState.value !== '0');
    }

    if (reminderDat.length === 0) continue;

    const message = createReminderMsgForAccountant({ recReminder: reminderDat });

    try {

      await sendMessage({
        body: (isProd) ? message : `${accountant.文字列＿氏名.value}宛の送信メッセージです\n${message} `,
        roomId: (isProd) ? accountant.chatworkRoomId.value : chatworkRooms.testRoom,
        cwToken: process.env.CW_TOKEN_COCOSYSTEM,
      });

    } catch (error) {

      await sendMessage({
        body: message,
        roomId: (isProd) ? chatworkRooms.cocoasGroup : chatworkRooms.rpaChatGroup,
        cwToken: process.env.CW_TOKEN_COCOSYSTEM,
      });

      await sendMessage({
        body: `${[`【送信エラー】${accountant.territory_v2.value}経理担当者宛メッセージの送信に失敗しました
        `, message, JSON.stringify(error.message)].join('\n')}`,
        roomId: chatworkRooms.testRoom,
        cwToken: process.env.CW_TOKEN_COCOSYSTEM,
      });

    }
  }

};

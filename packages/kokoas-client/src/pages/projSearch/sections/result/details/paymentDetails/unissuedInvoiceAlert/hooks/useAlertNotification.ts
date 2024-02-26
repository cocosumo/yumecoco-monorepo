import { sendMessage } from 'api-chatwork';
import { isProd } from 'config';
import { generateMessage } from '../notifyAlertToCharwork/generateMessage';
import { KAlertPurpose, chatworkRooms } from '../alertConfig';
import { IContracts, IEmployees, IProjects } from 'types';
import { getCwRoomIds } from '../notifyAlertToCharwork/getCwRoomIds';



export const useAlertNotification = async ({
  recProj,
  recContracts,
  recEmployees,
  purpose,
}: {
  recProj: IProjects
  recContracts: IContracts[]
  recEmployees: IEmployees[]
  purpose: KAlertPurpose
}) => {

  // 担当者の情報から通知先のルームIDを取得する
  const cwRoomIds = getCwRoomIds({
    recProj,
    recEmployees,
  });

  const message = generateMessage({
    recProj,
    recContracts,
    purpose,
  });


  for (const cwRoomId of cwRoomIds) {
    try {

      await sendMessage({
        body: message,
        roomId: (isProd) ? cwRoomId : chatworkRooms.test,
        cwToken: process.env.CW_TOKEN_COCOSYSTEM,
      });

    } catch (error) {

      await sendMessage({
        body: message,
        roomId: (isProd) ? chatworkRooms.cocoasGroup : chatworkRooms.rpaChatGroup,
        cwToken: process.env.CW_TOKEN_COCOSYSTEM,
      });

      await sendMessage({
        body: `${[`【送信エラー】ルームID:${cwRoomId} 宛メッセージ`, message, JSON.stringify(error.message)].join('\n')}`,
        roomId: chatworkRooms.testRoom,
        cwToken: process.env.CW_TOKEN_COCOSYSTEM,
      });

    }
  }
};

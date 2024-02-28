import { sendMessage } from 'api-chatwork';
import { isProd } from 'config';
import { KAlertPurpose, chatworkRooms } from '../alertConfig';
import { IContracts, IEmployees, IProjects } from 'types';
import { getCwRoomIds } from '../notifyAlertToCharwork/getCwRoomIds';
import { useContractsByProjIdV2, useEmployees, useProjById } from 'kokoas-client/src/hooksQuery';
import { createMessage } from '../notifyAlertToCharwork/createMessage';



export const useAlertNotification = ({
  projId,
  purpose,
}: {
  projId: string
  purpose: KAlertPurpose
}) => {

  const { data: recProj } = useProjById(projId);
  const { data: recContracts } = useContractsByProjIdV2(projId);
  const { data: recEmployees } = useEmployees();


  // 担当者の情報から通知先のルームIDを取得する
  const cwRoomIds = getCwRoomIds({
    recProj: recProj || {} as IProjects,
    recEmployees: recEmployees || [] as IEmployees[],
  });

  const sendAlertMessage = createMessage({
    recProj: recProj || {} as IProjects,
    recContracts: recContracts || [] as IContracts[],
    purpose,
    projId,
  });


  console.log('send room ids :', cwRoomIds);
  // throw new Error('ルームID設定までを確認');

  const alertNotify = async () => {
    const message = await sendAlertMessage();
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

  return alertNotify;
};

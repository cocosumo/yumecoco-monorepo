import { sendMessage } from 'api-chatwork';
import { isProd } from 'config';
import { KAlertPurpose, chatworkRooms } from '../alertConfig';
import { IContracts, IEmployees, IProjects } from 'types';
import { getCwRoomIds } from '../notifyAlertToCharwork/getCwRoomIds';
import { useContractsByProjIdV2, useEmployees, useProjById } from 'kokoas-client/src/hooksQuery';
import { createMessage } from '../notifyAlertToCharwork/createMessage';
import { useSnackBar } from 'kokoas-client/src/hooks';



export const useAlertNotification = ({
  projId,
  purpose,
}: {
  projId: string
  purpose: KAlertPurpose
}) => {

  const { setSnackState } = useSnackBar();

  const { data: recProj } = useProjById(projId);
  const { data: recContracts } = useContractsByProjIdV2(projId);
  const { data: recEmployees } = useEmployees();


  // 担当者の情報から通知先のルームIDを取得する
  const cwRoomIds = getCwRoomIds({
    recProj: recProj || {} as IProjects,
    recEmployees: recEmployees || [] as IEmployees[],
  });


  const alertNotify = async () => {
    let sendCondition = false;
    const message = await createMessage({
      recProj: recProj || {} as IProjects,
      recContracts: recContracts || [] as IContracts[],
      purpose,
      projId,
    });

    for (const cwRoomId of cwRoomIds) {
      try {

        await sendMessage({
          body: message,
          roomId: (isProd) ? cwRoomId : chatworkRooms.test,
          cwToken: process.env.CW_TOKEN_COCOSYSTEM,
        });
        sendCondition = true;
      } catch (error) {

        await sendMessage({
          body: `${[`【送信エラー】ルームID:${cwRoomId} 宛メッセージ`, message, JSON.stringify(error.message)].join('\n')}`,
          roomId: (isProd) ? chatworkRooms.cocoasGroup : chatworkRooms.testRoom,
          cwToken: process.env.CW_TOKEN_COCOSYSTEM,
        });
        sendCondition = false;
      }
    }

    if (sendCondition) {
      setSnackState({
        open: true,
        severity: 'success',
        message: '担当者のchatworkへ通知が完了しました。',
      });
    } else {
      setSnackState({
        open: true,
        severity: 'warning',
        message: '担当者のchatworkルームIDの取得に失敗したため、グループチャットへ通知しました。',
      });
    }

  };

  return alertNotify;
};

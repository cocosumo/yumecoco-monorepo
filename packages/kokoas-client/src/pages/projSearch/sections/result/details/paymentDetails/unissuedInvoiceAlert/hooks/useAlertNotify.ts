import { sendMessage } from 'api-chatwork';
import { isProd } from 'config';
import { KAlertPurpose, chatworkRooms } from '../alertConfig';
import { getCwRoomIds } from '../notifyAlertToCharwork/getCwRoomIds';
import { useContractsByProjIdV2, useEmployees, useProjById } from 'kokoas-client/src/hooksQuery';
import { createMessage } from '../notifyAlertToCharwork/createMessage';
import { useSnackBar } from 'kokoas-client/src/hooks';



export const useAlertNotify = ({
  projId,
  purpose,
}: {
  projId: string
  purpose: KAlertPurpose
}) => {

  const { setSnackState } = useSnackBar();

  const {
    data: recProj,
    isLoading: isLoadingProj,
  } = useProjById(projId);
  const {
    data: recContracts,
    isLoading: isLoadingContracts,
  } = useContractsByProjIdV2(projId);
  const {
    data: recEmployees,
    isLoading: isLoadingEmployees,
  } = useEmployees();

  const isLoading = isLoadingProj || isLoadingContracts || isLoadingEmployees;


  const alertNotify = async (reminderRecId: string) => {
    let sendCondition = false;

    if (!recProj || !recContracts || !recEmployees) return;

    const message = await createMessage({
      recProj: recProj,
      recContracts: recContracts,
      purpose,
      reminderRecId,
    });

    // 担当者の情報から通知先のルームIDを取得する
    const cwRoomIds = getCwRoomIds({
      recProj: recProj,
      recEmployees: recEmployees,
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

    // 経理担当者への通知処理を追加する

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

  return { 
    alertNotify,
    isLoadingAlertNotify :isLoading,
  };
};

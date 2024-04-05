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


  const alertNotify = async (
    reminderRecId: string,
    paymentDate: string | null,
    paymentAmount: string,
  ) => {
    let hasError = false;

    if (!recProj || !recContracts || !recEmployees) return;

    const message = await createMessage({
      recProj: recProj,
      recContracts: recContracts,
      purpose,
      reminderRecId,
      paymentDate,
      paymentAmount,
    });

    // 担当者の情報から通知先のルームIDを取得する
    const cwRoomIds = getCwRoomIds({
      recProj: recProj,
      recEmployees: recEmployees,
    });

    for (const cwRoomId of cwRoomIds) {
      const tgtempInfo = recEmployees.find(({ chatworkRoomId }) => chatworkRoomId.value === cwRoomId);
      const empName = tgtempInfo ? tgtempInfo.文字列＿氏名.value : cwRoomId;

      try {

        await sendMessage({
          body: (isProd) ? message : `【テスト送信】${empName}宛のメッセージです \n${message}`,
          roomId: (isProd) ? cwRoomId : chatworkRooms.testRoom,
          cwToken: process.env.CW_TOKEN_COCOSYSTEM,
        });
        //hasError = false;
      } catch (error) {

        await sendMessage({
          body: `${[`【送信エラー】${empName}(ルームID:${cwRoomId})宛メッセージ`, message, JSON.stringify(error.message)].join('\n')}`,
          roomId: (isProd) ? chatworkRooms.cocoasGroup : chatworkRooms.testRoom,
          cwToken: process.env.CW_TOKEN_COCOSYSTEM,
        });
        hasError = true;
      }
    }

    if (!hasError) {
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
    isLoadingAlertNotify: isLoading,
  };
};

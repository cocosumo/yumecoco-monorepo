import { IEmployees, IUnissuedinvoicealert } from 'types';
import { chatworkRooms } from '../../../../config';


export type AlertTarget = {
  cwRoomId: string,
  agName: string,
};

export const getAlertTarget = ({
  recReminder,
  recEmployees,
}: {
  recReminder: IUnissuedinvoicealert
  recEmployees: IEmployees[]
}) => {
  const alertTargets = recReminder.notificationSettings.value;

  if (alertTargets.length === 1 && alertTargets[0].value.chatworkRoomId.value === '') {
    const cocoAGs = recReminder.cocoAGs.value;

    if (cocoAGs === '') {
      return [{
        cwRoomId: chatworkRooms.cocoasGroup,
        agName: cocoAGs,
      }];
    } else {
      const cocoAgsInfo = cocoAGs.split(', ')
        .reduce((acc, cocoAgName) => {
          const cocoAgInfo = recEmployees.find(({ 文字列＿氏名 }) => 文字列＿氏名.value === cocoAgName);

          if (cocoAgInfo) {
            acc.push({
              cwRoomId: cocoAgInfo.chatworkRoomId.value,
              agName: cocoAgName,
            });
          }

          return acc;
        }, [] as AlertTarget[]);
      
      if (!cocoAgsInfo.length) {
        return cocoAgsInfo;
      }

      return {
        cwRoomId: chatworkRooms.cocoasGroup,
        agName: cocoAGs,
      };
    }
  } else {
    // アラート用情報から取得する
    return alertTargets.map(({ value: {
      alertTargetName,
      chatworkRoomId,
    } }) => {
      return {
        cwRoomId: chatworkRoomId.value,
        agName: alertTargetName.value,
      };

    });
  }
};

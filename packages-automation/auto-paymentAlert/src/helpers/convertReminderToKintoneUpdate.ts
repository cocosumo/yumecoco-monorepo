import { PaymentReminder } from '../../types/paymentReminder';
import { UpdatePaymentReminder } from '../api-kintone';



/**
 * アラート通知後の、入金確認リマインダーアプリ更新用データを作成します
 * @param param0 
 * @returns 
 */
export const convertReminderToKintoneUpdate = ({
  paymentReminderJson,
  lastAlertDate,
  alertDate,
}: {
  paymentReminderJson: PaymentReminder[]
  lastAlertDate: string
  alertDate: string
}) => {

  const kintoneData: UpdatePaymentReminder[] = paymentReminderJson.map(({
    andpadPaymentUrl,
    contractDate,
    contractId,
    //cwRoomIds,
    projId,
    projName,
    projType,
    territory,
    totalContractAmount,
    alertState,
    expectedPaymentDate,
    yumeAG,
  }) => {


    return ({
      updateKey: {
        field: 'projId',
        value: projId,
      },
      record: {
        projId: { value: projId },
        contractDate: { value: contractDate },
        yumeAG: { value: yumeAG },
        expectedPaymentDate: { value: expectedPaymentDate ?? '' },
        projType: { value: projType },
        totalContractAmount: { value: totalContractAmount },
        scheduledAlertDate: { value: alertDate },
        alertState: { value: alertState ? '1' : '0' },
        // reminderDate: { value: '' }, ユーザーがプルダウンから選択するため、対象外とする
        andpadDepositAmount: { value: '0' }, // TODO 　入金金額の総額を取得する処理を実装する
        area: { value: territory },
        projName: { value: projName },
        lastAlertDate: { value: lastAlertDate },
        andpadUrl: { value: andpadPaymentUrl },
        contractId: { value: contractId },
        // notificationSettings: {}, // 通知対象の更新処理は不要？実装要検討
      },
    });
  });

  return kintoneData;

};

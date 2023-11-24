import { IPaymentReminder } from '../../config';
import { PaymentReminder } from '../../types/paymentReminder';
import { UpdatePaymentReminder } from '../api-kintone';
import { compileNotificationSettings } from './compileNotificationSettings';



/**
 * アラート通知後の、入金確認リマインダーアプリ更新用データを作成します
 * @param param0 
 * @returns 
 */
export const convertReminderToKintoneUpdate = ({
  paymentReminderJson,
  lastAlertDate,
  alertDate,
  existedReminders,
}: {
  paymentReminderJson: PaymentReminder[]
  lastAlertDate: string
  alertDate: string
  existedReminders: IPaymentReminder[]
}) => {

  const kintoneData: UpdatePaymentReminder[] = paymentReminderJson.map(({
    andpadPaymentUrl,
    contractDate,
    contractId,
    cwRoomIds,
    expectedPaymentAmt,
    paymentId: tgtPaymentId,
    paymentType,
    projId,
    projName,
    projType,
    reminderUrl,
    storeName,
    systemId,
    territory,
    totalContractAmount,
    alertState,
    expectedPaymentDate,
    yumeAG,
  }) => {

    // 通知先情報の更新
    const existedReminder = existedReminders
      .find(({ paymentId }) => paymentId.value === tgtPaymentId) || {} as IPaymentReminder;

    const exsistingSettings = compileNotificationSettings({
      existingSettings: existedReminder.notificationSettings,
      updateSettings: cwRoomIds,
    });

    return ({
      updateKey: {
        field: 'paymentId',
        value: tgtPaymentId,
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
        area: { value: territory },
        projName: { value: projName },
        lastAlertDate: { value: lastAlertDate },
        andpadUrl: { value: andpadPaymentUrl },
        contractId: { value: contractId },
        notificationSettings: exsistingSettings,
      },
    });
  });

  return kintoneData;

};

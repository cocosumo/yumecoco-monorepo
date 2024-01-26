import isPast from 'date-fns/isPast';
import { IPaymentReminder } from '../../config';
import { PaymentReminder } from '../../types/paymentReminder';
import { UpdatePaymentReminders } from '../api-kintone';
import { compileNotificationSettings } from './compileNotificationSettings';
import { convAlertDate } from './convAlertDate';



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

  const kintoneData: UpdatePaymentReminders = paymentReminderJson.map(({
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
    //reminderUrl,
    storeName,
    systemId,
    territory,
    totalContractAmount,
    alertState,
    expectedPaymentDate,
    yumeAG,
    lastAlertDate: lastAlertDatePrev,
  }) => {

    // 通知先情報の更新
    const existedReminder = existedReminders
      .find(({ paymentId }) => paymentId.value === tgtPaymentId) || {} as IPaymentReminder;

    const existingSettings = compileNotificationSettings({
      existingSettings: existedReminder.notificationSettings,
      updateSettings: cwRoomIds,
    });

    // 再通知日の更新
    const newAlertDate = convAlertDate({
      scheduledAlertDate: alertDate,
      expectedPaymentDate: expectedPaymentDate,
    });

    const isAlerted = alertState && (!!expectedPaymentDate && isPast(new Date(expectedPaymentDate)));

    //console.log('通知先設定', JSON.stringify(existingSettings, null, 2));

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
        scheduledAlertDate: { value: newAlertDate },
        alertState: { value: alertState ? '1' : '0' },
        // reminderDate: { value: '' }, ユーザーがプルダウンから選択するため、対象外とする
        area: { value: territory },
        projName: { value: projName },
        lastAlertDate: { value: isAlerted ? lastAlertDate : lastAlertDatePrev },
        andpadUrl: { value: andpadPaymentUrl },
        contractId: { value: contractId },
        //paymentId : {value: tgtPaymentId}, // updatekey
        paymentType: { value: paymentType },
        expectedPaymentAmt: { value: expectedPaymentAmt },
        systemId: { value: systemId },
        store: { value: storeName },
        notificationSettings: existingSettings,
      },
    });
  });

  return kintoneData;

};

import { kintoneBaseUrl } from 'api-kintone';
import { IPaymentReminder, reminderAppId } from '../../config';
import { CwRoomIds, PaymentReminder } from '../../types/paymentReminder';
import { IAndpadpayments } from 'types';



export const convertReminderToJson = ({
  reminder,
  andpadPayments,
}: {
  reminder: IPaymentReminder[]
  andpadPayments: IAndpadpayments[],
}) => {

  return reminder.map(({
    $id,
    andpadUrl,
    area,
    contractId,
    projId: projIdReminder,
    projType,
    projName,
    contractDate,
    totalContractAmount,
    notificationSettings,
    expectedPaymentDate,
  }) => {

    // 通知先情報(chatwork)を設定する
    const cwRoomIds = notificationSettings.value.map(({ value }) => {
      const {
        alertTargetId,
        alertTargetName,
        chatworkRoomId,
      } = value;

      return {
        agentName: alertTargetName.value,
        agentId: alertTargetId.value,
        cwRoomId: chatworkRoomId.value,
      } as CwRoomIds;
    });

    // kintoneのリマインダーURLを設定する
    const reminderUrl = `${kintoneBaseUrl}/k/${reminderAppId}/show#record=${$id.value}`;

    // 顧客からの入金情報を確認する
    const paymentHistory = andpadPayments.some(({
      projId,
      paymentDate,
      //paymentAmount,
    }) => ((projIdReminder.value === projId.value) && (paymentDate.value !== '')));

    return ({
      alertState: !paymentHistory,
      expectedPaymentDate: expectedPaymentDate.value,
      andpadPaymentUrl: andpadUrl.value,
      reminderUrl: reminderUrl,
      contractId: contractId.value,
      projId: projIdReminder.value,
      projName: projName.value,
      projType: projType.value,
      contractDate: contractDate.value,
      totalContractAmount: totalContractAmount.value,
      territory: area.value,
      cwRoomIds: cwRoomIds,
    }) as PaymentReminder;
  });

};
import { kintoneBaseUrl } from 'api-kintone';
import { IPaymentReminder, reminderAppId } from '../../config';
import { CwRoomIds, PaymentReminder } from '../../types/paymentReminder';
import { IAndpadpayments, Territory } from 'types';



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
  }): PaymentReminder => {

    // 通知先情報(chatwork)を設定する
    const cwRoomIds: CwRoomIds[] = notificationSettings.value.map(({ value }) => {
      const {
        alertTargetId,
        alertTargetName,
        chatworkRoomId,
      } = value;

      return {
        agentName: alertTargetName.value,
        agentId: alertTargetId.value,
        cwRoomId: chatworkRoomId.value,
      };
    });

    // kintoneのリマインダーURLを設定する
    const reminderUrl = `${kintoneBaseUrl}/k/${reminderAppId}/show#record=${$id.value}&mode=edit`;

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
      territory: area.value as Territory,
      yumeAG: '', // 要設定
      cwRoomIds: cwRoomIds,
    });
  });

};
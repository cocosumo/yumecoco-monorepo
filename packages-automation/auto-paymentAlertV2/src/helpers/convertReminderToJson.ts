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
    projId,
    projType,
    projName,
    contractDate,
    totalContractAmount,
    notificationSettings,
    expectedPaymentDate,
    expectedPaymentAmt,
    yumeAG,
    paymentId,
    paymentType,
    systemId,
    store,
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
      ID,
      paymentDate,
    }) => ((paymentId.value === ID.value) && (paymentDate.value !== '')));

    return ({
      alertState: !paymentHistory,
      systemId: systemId.value,
      paymentId: paymentId.value,
      andpadPaymentUrl: andpadUrl.value,
      reminderUrl: reminderUrl,
      contractId: contractId.value,
      projId: projId.value,
      projName: projName.value,
      projType: projType.value,
      storeName: store.value,
      contractDate: contractDate.value,
      territory: area.value as Territory,
      expectedPaymentDate: expectedPaymentDate.value,
      expectedPaymentAmt: expectedPaymentAmt.value,
      paymentType: paymentType.value,
      yumeAG: yumeAG.value,
      cwRoomIds: cwRoomIds,
      totalContractAmount: totalContractAmount.value,
    });
  });

};
import { kintoneBaseUrl } from 'api-kintone';
import { IInvoiceReminder, reminderAppId } from '../../config';
import { CwRoomIds, InvoiceReminder } from '../../types/InvoiceReminder';
import { IAndpadpayments, Territory } from 'types';



export const convertReminderToJson = ({
  reminder,
  andpadPayments,
}: {
  reminder: IInvoiceReminder[]
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
    expectedCreateInvoiceDate,
    yumeAG,
  }): InvoiceReminder => {

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
    const hasInvoice = andpadPayments.some(({
      projId,
    }) => ((projIdReminder.value === projId.value)));

    return ({
      alertState: !hasInvoice,
      reminderUrl: reminderUrl,
      contractId: contractId.value,
      projId: projIdReminder.value,
      projName: projName.value,
      projType: projType.value,
      contractDate: contractDate.value,
      totalContractAmount: totalContractAmount.value,
      territory: area.value as Territory,
      yumeAG: yumeAG.value,
      cwRoomIds: cwRoomIds,
      andpadInvoiceUrl: andpadUrl.value,
      expectedCreateInvoiceDate: expectedCreateInvoiceDate.value,
    });
  });

};
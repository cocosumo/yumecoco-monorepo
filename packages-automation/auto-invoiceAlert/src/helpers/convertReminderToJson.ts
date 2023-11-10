import { kintoneBaseUrl } from 'api-kintone';
import { IInvoiceReminder, reminderAppId } from '../../config';
import { CwRoomIds, InvoiceReminder } from '../../types/InvoiceReminder';
import { IAndpadpayments, Territory } from 'types';
import { GetMyOrdersResponse } from 'api-andpad';



/**
 * リマインダーアプリのレコードを通知用のJSON型へ変換する
 * @param params.reminder 請求リマインダーアプリのレコード配列
 * @param params.andpadPayments andpad入金情報アプリのレコード配列
 * @param params.orders andpad案件の配列
 * @returns InvoiceReminder[]
 */
export const convertReminderToJson = ({
  reminder,
  andpadPayments,
  allOrders,
}: {
  reminder: IInvoiceReminder[]
  andpadPayments: IAndpadpayments[],
  allOrders: GetMyOrdersResponse
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
    store,
    systemId: systemIdReminder,
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

    // 請求書が発行されているかどうかを確認する
    const hasInvoice = andpadPayments.some(({
      //projId,
      systemId,
    }) => ((systemIdReminder.value === systemId.value)));

    // andpadと接続されているかを再確認する
    const connectedToAndpad = allOrders.data.objects
      .some(({ 案件管理ID }) => 案件管理ID === projIdReminder.value);


    return ({
      alertState: connectedToAndpad && !hasInvoice, // ANDPADに接続かつ、請求書未発行の場合に通知する
      reminderUrl: reminderUrl,
      systemId: systemIdReminder.value,
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
      storeName: store.value,
    });
  });

};
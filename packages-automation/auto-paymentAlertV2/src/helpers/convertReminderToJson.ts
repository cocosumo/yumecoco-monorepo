import { kintoneBaseUrl } from 'api-kintone';
import { IPaymentReminder, reminderAppId } from '../../config';
import { CwRoomIds, PaymentReminder } from '../../types/paymentReminder';
import { IAndpadpayments, IProjects, Territory } from 'types';
import { getAllAndpadOrders } from 'api-andpad';



export const convertReminderToJson = ({
  reminders,
  andpadPayments,
  allAndpadOrders,
  allProjects,
}: {
  reminders: IPaymentReminder[]
  andpadPayments: IAndpadpayments[],
  allAndpadOrders: Awaited<ReturnType<typeof getAllAndpadOrders>>
  allProjects: IProjects[]
}) => {

  return reminders.map(({
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

    // リマインダーレコードから工事情報を取得する
    const tgtProject = allProjects.find(({
      forceLinkedAndpadSystemId,
      uuid,
    }) => (forceLinkedAndpadSystemId.value === systemId.value) || (projId.value === uuid.value));


    // 通知先情報(chatwork)を設定する TODO 情報更新
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
    const hasPaymentHistory = andpadPayments.some(({
      ID,
      paymentDate,
    }) => ((paymentId.value === ID.value) && (paymentDate.value !== '')));

    // ANDPADとの接続確認
    const connectedToAndpad = allAndpadOrders.data.objects
      .some(({
        システムID,
        案件管理ID,
      }) =>
        (システムID?.toString() === tgtProject?.forceLinkedAndpadSystemId.value)
        || (案件管理ID === tgtProject?.uuid.value));


    return ({
      alertState: connectedToAndpad && !hasPaymentHistory,
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
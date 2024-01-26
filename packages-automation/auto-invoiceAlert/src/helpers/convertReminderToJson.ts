import { kintoneBaseUrl } from 'api-kintone';
import { IInvoiceReminder, reminderAppId } from '../../config';
import { InvoiceReminder } from '../../types/InvoiceReminder';
import { IAndpadpayments, IContracts, IEmployees, IProjects, IStores, Territory } from 'types';
import { GetMyOrdersResponse } from 'api-andpad';
import { compileInfoFromProjId } from './compileInfoFromProjId';
import { updateExpectedPaymentDate } from './updateExpectedPaymentDate';



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
  employees,
  stores,
  allProjects,
  contracts,
}: {
  reminder: IInvoiceReminder[]
  andpadPayments: IAndpadpayments[]
  allOrders: GetMyOrdersResponse
  employees: IEmployees[]
  stores: IStores[]
  allProjects: IProjects[]
  contracts: IContracts[]
}) => {

  const alertReminderJson = reminder.map(({
    $id,
    contractId,
    projId: projIdReminder,
    projType,
    projName,
    contractDate,
    totalContractAmount,
    expectedCreateInvoiceDate,
    expectedPaymentDate,
    store,
    lastAlertDate,
  }): InvoiceReminder => {

    const {
      andpadInvoiceUrl,
      chatworkRoomIds,
      connectedToAndpad,
      storeName,
      systemId,
      yumeAGs,
      territory,
    } = compileInfoFromProjId({
      projId: projIdReminder.value,
      allOrders: allOrders,
      employees: employees,
      projects: allProjects,
      stores: stores,
    });


    // kintoneのリマインダーURLを設定する
    const reminderUrl = `${kintoneBaseUrl}k/${reminderAppId}/show#record=${$id.value}&mode=edit`;

    // 請求書が発行されているかどうかを確認する
    let hasInvoice = false;
    if (connectedToAndpad) {
      hasInvoice = andpadPayments.some(({
        systemId: paymentSystemId,
      }) => ((systemId === paymentSystemId.value)));
    }

    // 支払予定日に更新がないかを確認する
    const updateExPaymentDate = updateExpectedPaymentDate({
      projId: projIdReminder.value,
      projType: projType.value,
      expectedPaymentDate: expectedPaymentDate.value,
      contracts,
    });


    return ({
      alertState: connectedToAndpad && !hasInvoice, // ANDPADに接続かつ、請求書未発行の場合に通知する
      reminderUrl: reminderUrl,
      systemId: systemId ?? '',
      contractId: contractId.value,
      projId: projIdReminder.value,
      projName: projName.value,
      projType: projType.value,
      contractDate: contractDate.value,
      totalContractAmount: totalContractAmount.value,
      territory: territory as Territory,
      yumeAG: yumeAGs,
      cwRoomIds: chatworkRoomIds,
      andpadInvoiceUrl: andpadInvoiceUrl ?? '',
      expectedCreateInvoiceDate: expectedCreateInvoiceDate.value,
      expectedPaymentDate: updateExPaymentDate || '',
      storeName: storeName || store.value,
      lastAlertDate: lastAlertDate.value,
    });
  });



  // デバッグ用
  const consoleReminders = alertReminderJson.map(({ projName, alertState }) => {
    const state = alertState ? '【対象】' : '【対象外】';
    return `${state} : ${projName}`;
  });
  console.log(`通知対象の契約:リマインダー含む: ${alertReminderJson.length}件 ${JSON.stringify(consoleReminders, null, 2)}`);

  return alertReminderJson;

};
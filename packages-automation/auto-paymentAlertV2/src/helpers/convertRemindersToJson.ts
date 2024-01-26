import { IPaymentReminder, reminderAppId } from '../../config';
import { PaymentReminder } from '../../types/paymentReminder';
import { IAndpadpayments, IContracts, IEmployees, IProjects, IStores, Territory } from 'types';
import { compileInfoFromSystemId } from './compileInfoFromSystemId';
import { kintoneBaseUrl } from 'api-kintone';



export const convertRemindersToJson = ({
  reminders,
  andpadPayments,
  allProjects,
  contracts,
  employees,
  stores,
}: {
  reminders: IPaymentReminder[]
  andpadPayments: IAndpadpayments[],
  allProjects: IProjects[]
  contracts: IContracts[]
  employees: IEmployees[]
  stores: IStores[]
}) => {

  return reminders.map((reminder): PaymentReminder => {
    const {
      $id,
      andpadUrl,
      area,
      projId: tgtProjId,
      expectedPaymentAmt,
      paymentId,
      paymentType,
      systemId,
      store,
      lastAlertDate,
    } = reminder;

    const alertPayment = andpadPayments.find(({ ID }) => ID.value === paymentId.value);

    // ANDPADの入金一覧から削除されていたら、アラート対象外として更新する
    if (!alertPayment) {
      return ({
        alertState: false,
        systemId: systemId.value,
        paymentId: paymentId.value,
        andpadPaymentUrl: andpadUrl.value,
        reminderUrl: '',
        contractId: reminder.contractId.value,
        projId: tgtProjId.value,
        projName: reminder.projName.value,
        projType: reminder.projType.value,
        storeName: store.value,
        contractDate: reminder.contractDate.value,
        territory: area.value as Territory,
        expectedPaymentDate: reminder.expectedPaymentDate.value,
        expectedPaymentAmt: expectedPaymentAmt.value,
        paymentType: paymentType.value,
        yumeAG: reminder.yumeAG.value,
        cwRoomIds: [],
        totalContractAmount: reminder.totalContractAmount.value,
        lastAlertDate: lastAlertDate.value,
      });
    }

    // リマインダー情報の更新処理
    const {
      andpadPaymentUrl,
      connectedToAndpad,
      contractDate,
      contractId,
      cwRoomIds,
      expectedPaymentDate,
      hasPaymentHistory,
      projId,
      projName,
      projType,
      storeName,
      territory,
      totalContractAmount,
      yumeAG,
    } = compileInfoFromSystemId({
      alertPayment: alertPayment,
      contracts: contracts,
      employees: employees,
      projects: allProjects,
      stores: stores,
      tgtProjId: tgtProjId.value,
      tgtSystemId: systemId.value,
    });

    const reminderUrl = `${kintoneBaseUrl}k/${reminderAppId}/show#record=${$id.value}&mode=edit`;

    return ({
      alertState: connectedToAndpad && !hasPaymentHistory,
      systemId: systemId.value,
      paymentId: paymentId.value,
      andpadPaymentUrl: andpadPaymentUrl,
      reminderUrl: reminderUrl,
      contractId: contractId,
      projId: projId,
      projName: projName,
      projType: projType,
      storeName: storeName,
      contractDate: contractDate,
      territory: territory,
      expectedPaymentDate: expectedPaymentDate,
      expectedPaymentAmt: expectedPaymentAmt.value,
      paymentType: paymentType.value,
      yumeAG: yumeAG,
      cwRoomIds: cwRoomIds,
      totalContractAmount: totalContractAmount,
      lastAlertDate: lastAlertDate.value,
    });
  });

};
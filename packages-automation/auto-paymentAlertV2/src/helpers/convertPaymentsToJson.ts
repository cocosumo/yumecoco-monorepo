import { IAndpadpayments, IContracts, IEmployees, IProjects, IStores } from 'types';
import { PaymentReminder } from '../../types/paymentReminder';
import { compileInfoFromSystemId } from './compileInfoFromSystemId';



/**
 * 入金一覧のレコードをリマインダーレコードへ変換する
 * @param param0 
 * @returns 
 */
export const convertPaymentsToJson = ({
  alertPayments,
  contracts,
  projects,
  employees,
  stores,
}: {
  alertPayments: IAndpadpayments[]
  contracts: IContracts[]
  projects: IProjects[]
  employees: IEmployees[]
  stores: IStores[]
}) => {


  const alertPaymentReminders: PaymentReminder[] = alertPayments.map((alertPayment) => {
    const {
      expectedPaymentAmount,
      paymentType,
      systemId,
      ID,
      projId: tgtProjId,
    } = alertPayment;
    // 対象の工事情報を取得する

    const {
      andpadPaymentUrl,
      connectedToAndpad,
      contractDate,
      contractId,
      cwRoomIds,
      expectedPaymentDate,
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
      projects: projects,
      stores: stores,
      tgtProjId: tgtProjId.value,
      tgtSystemId: systemId.value,
    });


    return ({
      alertState: connectedToAndpad,
      systemId: systemId.value,
      paymentId: ID.value,
      andpadPaymentUrl: andpadPaymentUrl,
      reminderUrl: '', // 通知後に設定するため、ここでは省略する
      contractId: contractId,
      projId: projId,
      projName: projName,
      projType: projType,
      storeName: storeName,
      contractDate: contractDate,
      totalContractAmount: totalContractAmount,
      territory: territory,
      expectedPaymentDate: expectedPaymentDate,
      expectedPaymentAmt: expectedPaymentAmount.value,
      paymentType: paymentType.value,
      yumeAG: yumeAG,
      cwRoomIds: cwRoomIds,
      lastAlertDate: '',
    });
  });


  // 削除データが残っている可能性があるため、ANDPADとの接続で一部を対策する
  return alertPaymentReminders.filter(({ alertState }) => alertState);

};

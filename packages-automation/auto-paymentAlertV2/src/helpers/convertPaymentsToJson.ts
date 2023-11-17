import { IAndpadpayments, IContracts, IEmployees, IProjects, IStores, Territory } from 'types';
import { PaymentReminder } from '../../types/paymentReminder';
import { chatworkRoomIdSetting } from '../notificationFunc/chatworkRoomIdSetting';
import { getYumeAgNames } from './getYumeAgNames';
import { calcPaymentDate } from './calcPaymentDate';
import { getContractsSummary } from 'api-kintone/src/contracts/getContractsSummary';



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


  const alertPaymentReminders: PaymentReminder[] = alertPayments.map(({
    projId: projIdFromPayment,
    expectedPaymentDate,
    expectedPaymentAmount,
    paymentType,
    systemId,
    作成日時,
    ID,
  }) => {

    // 対象の工事情報を取得する
    const {
      agents,
      storeCode: storeCodeByProject,
      store: storeByProject,
      projName,
      projTypeName,
      uuid: projId,
    } = projects.find(({ 
      uuid, //projId
      forceLinkedAndpadSystemId: systemIdForChk,
    }) => {
      return (systemIdForChk.value === systemId.value) || (uuid.value === projIdFromPayment.value);
    }) || {};

    // 対象の契約書情報を取得する
    const tgtContracts = contracts
      .filter(({ projId: contractProjId }) => contractProjId.value === projId?.value) || [];

    // 契約書情報を取得する
    const {
      合計受注金額税込,
    } = getContractsSummary((tgtContracts));

    const mainContract = tgtContracts.find(({ contractType }) => contractType.value === '契約');

    const store = stores.find(({ storeCode }) => storeCode.value === storeCodeByProject?.value);

    // 通知先情報を設定する
    const chatworkRoomIds = chatworkRoomIdSetting({
      agents: agents,
      employees: employees,
    });

    const paymentDate = calcPaymentDate({
      expectedPaymentDate: expectedPaymentDate.value,
      createDate: 作成日時.value,
    });

    const yumeAGs = getYumeAgNames({
      agents: agents,
    });


    return ({
      alertState: true,
      systemId: systemId.value,
      paymentId: ID.value,
      andpadPaymentUrl: `https://andpad.jp/manager/my/orders/${systemId.value}/customer_agreement`,
      reminderUrl: '', // 通知後に設定するため、ここでは省略する
      contractId: tgtContracts.map(({ uuid }) => uuid.value).join(', ') || '取得に失敗しました',
      projId: projId?.value || '取得に失敗しました',
      projName: projName?.value || '取得に失敗しました',
      projType: projTypeName?.value || '取得に失敗しました',
      storeName: store?.officialStoreName.value || storeByProject?.value || '取得に失敗しました',
      contractDate: mainContract?.contractDate.value || '',
      totalContractAmount: 合計受注金額税込.toString() || '取得に失敗しました',
      territory: store?.territory.value as Territory,
      expectedPaymentDate: paymentDate,
      expectedPaymentAmt: expectedPaymentAmount.value,
      paymentType: paymentType.value,
      yumeAG: yumeAGs || '取得に失敗しました',
      cwRoomIds: chatworkRoomIds,
    });
  });

  return alertPaymentReminders;

};

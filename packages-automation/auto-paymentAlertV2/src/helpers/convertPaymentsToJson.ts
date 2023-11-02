import { IAndpadpayments, IContracts, IEmployees, IProjects, IStores, Territory } from 'types';
import { PaymentReminder } from '../../types/paymentReminder';
import { getMyOrders } from 'api-andpad';
import { chatworkRoomIdSetting } from '../notificationFunc/chatworkRoomIdSetting';
import { getYumeAgNames } from './getYumeAgNames';
import { calcPaymentDate } from './calcPaymentDate';



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
  allOrders,
}: {
  alertPayments: IAndpadpayments[]
  contracts: IContracts[]
  projects: IProjects[]
  employees: IEmployees[]
  stores: IStores[]
  allOrders: Awaited<ReturnType<typeof getMyOrders>>
}) => {


  const alertPaymentReminders: PaymentReminder[] = alertPayments.map(({
    projId,
    expectedPaymentDate,
    作成日時,
  }) => {

    // 通知対象者を抽出する
    const {
      agents,
      storeCode: storeCodeByProjct,
      forceLinkedAndpadSystemId,
      projName,
      projTypeName,
    } = projects.find(({ uuid }) => uuid.value === projId.value) || {};

    const tgtContracts = contracts.filter(({ projId: contractProjId }) => contractProjId.value === projId.value) || [];
    const contractData = tgtContracts.reduce((acc, {
      uuid: contractId,
      contractType,
      contractDate,
      totalContractAmt,
    }) => {

      acc.contractId = `${acc.contractId}, ${contractId.value}`;
      if (contractType.value === '契約') {
        acc.contractDate = contractDate.value;
      }
      acc.totalContractAmt += +totalContractAmt.value;

      return acc;

    }, {
      contractId: '',
      contractDate: '',
      totalContractAmt: 0,
    });

    // システムIDを取得する
    const andpadSystemId = String(forceLinkedAndpadSystemId?.value)
      || allOrders.data.objects.find(({ 案件管理ID }) => 案件管理ID === projId.value)?.システムID?.toString()
      || '';

    const andpadPaymentUrl = andpadSystemId !== '' ?
      `https://andpad.jp/manager/my/orders/${andpadSystemId}/customer_agreement`
      : '';

    const store = stores.find(({ storeCode }) => storeCode.value === storeCodeByProjct?.value);

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
      andpadPaymentUrl: andpadPaymentUrl,
      reminderUrl: '', // 通知後に設定するため、ここでは省略する
      contractId: contractData.contractId ?? '取得に失敗しました',
      projId: projId.value,
      projName: projName?.value ?? '取得に失敗しました',
      projType: projTypeName?.value ?? '取得に失敗しました',
      contractDate: contractData.contractDate ?? '取得に失敗しました',
      totalContractAmount: contractData.totalContractAmt.toString() ?? '取得に失敗しました',
      territory: store?.territory.value as Territory,
      expectedPaymentDate: paymentDate,
      yumeAG: yumeAGs,
      cwRoomIds: chatworkRoomIds,
    });
  });

  return alertPaymentReminders;

};

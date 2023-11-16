import { IAndpadpayments, IContracts, IEmployees, IProjects, IStores, Territory } from 'types';
import { PaymentReminder } from '../../types/paymentReminder';
import { getMyOrders } from 'api-andpad';
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
    expectedPaymentAmount,
    paymentType,
    作成日時,
  }) => {

    // 通知対象者を抽出する
    const {
      agents,
      storeCode: storeCodeByProject,
      store: storeByProject,
      forceLinkedAndpadSystemId,
      projName,
      projTypeName,
    } = projects.find(({ uuid }) => uuid.value === projId.value) || {};

    const tgtContracts = contracts.filter(({ projId: contractProjId }) => contractProjId.value === projId.value) || [];

    const {
      合計受注金額税込,
    } = getContractsSummary((tgtContracts));

    const mainContract = tgtContracts.find(({ contractType }) => contractType.value === '契約');

    // システムIDを取得する
    const andpadSystemId = String(forceLinkedAndpadSystemId?.value)
      || allOrders.data.objects.find(({ 案件管理ID }) => 案件管理ID === projId.value)?.システムID?.toString()
      || '';

    const andpadPaymentUrl = andpadSystemId !== '' ?
      `https://andpad.jp/manager/my/orders/${andpadSystemId}/customer_agreement`
      : '';

    const store = stores.find(({ storeCode }) => storeCode.value === storeCodeByProject?.value);

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
      systemId: andpadSystemId,
      andpadPaymentUrl: andpadPaymentUrl,
      reminderUrl: '', // 通知後に設定するため、ここでは省略する
      contractId: tgtContracts.map(({ uuid }) => uuid.value).join(', ') ?? '取得に失敗しました',
      projId: projId.value,
      projName: projName?.value ?? '取得に失敗しました',
      projType: projTypeName?.value ?? '取得に失敗しました',
      storeName: store?.officialStoreName.value || storeByProject?.value || '取得に失敗しました',
      contractDate: mainContract?.contractDate.value ?? '',
      totalContractAmount: 合計受注金額税込.toString() ?? '取得に失敗しました',
      territory: store?.territory.value as Territory,
      expectedPaymentDate: paymentDate,
      expectedPaymentAmt: expectedPaymentAmount.value,
      paymentType: paymentType.value,
      yumeAG: yumeAGs,
      cwRoomIds: chatworkRoomIds,
    });
  });

  return alertPaymentReminders;

};

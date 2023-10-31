import { IAndpadpayments, IContracts, IEmployees, IProjects, IStores, Territory } from 'types';
import { PaymentReminder } from '../../types/paymentReminder';
import { getMyOrders } from 'api-andpad';
import { chatworkRoomIdSetting } from '../notificationFunc/chatworkRoomIdSetting';
import { getEarliestDateOfContract } from './getEarliestDateOfContract';
import { getYumeAgNames } from './getYumeAgNames';



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
  }) => {

    // 通知対象者を抽出する
    const {
      agents,
      storeCode: storeCodeByProjct,
      forceLinkedAndpadSystemId,
      projName,
      projTypeName,
    } = projects.find(({ uuid }) => uuid.value === projId.value) || {};

    const {
      uuid: contractId,
      contractDate,
      totalContractAmt,
      contractAmtDate,
      initialAmtDate,
      interimAmtDate,
      finalAmtDate,
      othersAmtDate,
      contractAmt,
      initialAmt,
      interimAmt,
      finalAmt,
      othersAmt,
    } = contracts.find(({ projId: contractProjId }) => contractProjId.value === projId.value) || {};

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

    // 契約書から一番過去の支払日を取得する
    const contractAmtPaymentDate = getEarliestDateOfContract({
      dates: [
        contractAmtDate?.value ?? '',
        initialAmtDate?.value ?? '',
        interimAmtDate?.value ?? '',
        finalAmtDate?.value ?? '',
        othersAmtDate?.value ?? '',
      ],
      contractAmts: [
        contractAmt?.value ?? '',
        initialAmt?.value ?? '',
        interimAmt?.value ?? '',
        finalAmt?.value ?? '',
        othersAmt?.value ?? '',
      ],
    });

    const yumeAGs = getYumeAgNames({
      agents: agents,
    });


    return ({
      alertState: true,
      andpadPaymentUrl: andpadPaymentUrl,
      reminderUrl: '', // 通知後に設定するため、ここでは省略する
      contractId: contractId?.value ?? '取得に失敗しました',
      projId: projId.value,
      projName: projName?.value ?? '取得に失敗しました',
      projType: projTypeName?.value ?? '取得に失敗しました',
      contractDate: contractDate?.value ?? '取得に失敗しました',
      totalContractAmount: totalContractAmt?.value ??  '取得に失敗しました',
      territory: store?.territory.value as Territory,
      expectedPaymentDate: contractAmtPaymentDate,
      yumeAG: yumeAGs,
      cwRoomIds: chatworkRoomIds,
    });
  });

  return alertPaymentReminders;

};

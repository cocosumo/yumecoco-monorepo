import { IEmployees, IProjects, IStores } from 'types';
import { ContractRecordType } from '../../config';
import { PaymentReminder } from '../../types/paymentReminder';
import { getMyOrders } from 'api-andpad';
import { chatworkRoomIdSetting } from '../notificationFunc/chatworkRoomIdSetting';



export const convertContractsToJson = ({
  contracts,
  projects,
  employees,
  stores,
  allOrders,
}: {
  contracts: ContractRecordType[]
  projects: IProjects[]
  employees: IEmployees[]
  stores: IStores[]
  allOrders: Awaited<ReturnType<typeof getMyOrders>>
}) => {


  const alertContracts = contracts.map(({
    uuid: contractId,
    projId,
    projType,
    projName,
    totalContractAmt,
    contractDate,
  }) => {

    // 通知対象者を抽出する
    const {
      agents,
      storeCode: storeCodeByProjct,
      forceLinkedAndpadSystemId,
    } = projects.find(({ uuid }) => uuid.value === projId.value) || {};

    // システムIDを取得する
    const andpadSystemId = String(forceLinkedAndpadSystemId?.value)
      || allOrders.data.objects.find(({ 案件管理ID }) => 案件管理ID === projId.value);

    const andpadPaymentUrl = andpadSystemId ?
      `https://andpad.jp/manager/my/orders/${andpadSystemId}/customer_agreement`
      : '';

    const store = stores.find(({ storeCode }) => storeCode.value === storeCodeByProjct?.value);

    const chatworkRoomIds = chatworkRoomIdSetting({
      agents: agents,
      employees: employees,
    });

    return ({
      andpadPaymentUrl: andpadPaymentUrl,
      reminderUrl: '', //TODO
      contractId: contractId.value,
      projId: projId.value,
      projName: projName.value,
      projType: projType.value,
      contractDate: contractDate.value,
      totalContractAmount: totalContractAmt.value,
      territory: store?.area.value,
      cwRoomIds:chatworkRoomIds,
    }) as PaymentReminder;
  });

  return alertContracts;

};
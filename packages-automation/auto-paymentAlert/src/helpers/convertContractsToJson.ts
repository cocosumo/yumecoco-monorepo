import { IProjects, IStores, IUser } from 'types';
import { ContractRecordType } from '../../config';
import { PaymentReminder } from '../../types/paymentReminder';
import { notificationRecipientsSet } from './notificationRecipientsSet';
import { getMyOrders } from 'api-andpad';



export const convertContractsToJson = ({
  contracts,
  projects,
  users,
  stores,
  allOrders,
}: {
  contracts: ContractRecordType[]
  projects: IProjects[]
  users: IUser[]
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

    const store = stores.find(({ storeCode }) => storeCode.value === storeCodeByProjct?.value);

    const alertTarget = notificationRecipientsSet({
      agents: agents,
      users: users,
    });

    return ({
      andpadPaymentUrl: `https://andpad.jp/manager/my/orders/${andpadSystemId}/customer_agreement`,
      contractId: contractId.value,
      projId: projId.value,
      projType: projType.value,
      projName: projName.value,
      contractDate: contractDate.value,
      totalContractAmount: totalContractAmt.value,
      alertTarget: alertTarget,
      territory: store?.area.value,
    }) as PaymentReminder;
  });

  return alertContracts;

};
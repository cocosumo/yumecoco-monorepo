import { IEmployees, IProjects, IStores, Territory } from 'types';
import { ContractRecordType } from '../../config';
import { InvoiceReminder } from '../../types/InvoiceReminder';
import { getMyOrders } from 'api-andpad';
import { chatworkRoomIdSetting } from '../notificationFunc/chatworkRoomIdSetting';
import { getYumeAgNames } from './getYumeAgNames';
import { calcContractInformation } from './calcContractInformation';



/**
 * 契約書レコードをリマインダーレコードへ変換する
 * @param param0 
 * @returns 
 */
export const convertContractsToJson = ({
  contracts,
  allContracts,
  projects,
  employees,
  stores,
  allOrders,
}: {
  contracts: ContractRecordType[]
  allContracts: ContractRecordType[]
  projects: IProjects[]
  employees: IEmployees[]
  stores: IStores[]
  allOrders: Awaited<ReturnType<typeof getMyOrders>>
}) => {


  const alertContracts: InvoiceReminder[] = contracts.reduce((acc, {
    projId,
    projType,
    projName,
    storeName,
  }) => {

    // 通知対象者を抽出する
    const {
      agents,
      storeCode: storeCodeByProjct,
      forceLinkedAndpadSystemId,
    } = projects.find(({ uuid }) => uuid.value === projId.value) || {};

    const tgtContracts = allContracts.filter(({ projId: contractProjId }) => contractProjId.value === projId.value) || [];
    const contractData = calcContractInformation({ tgtContracts: tgtContracts });

    // システムIDを取得する
    const andpadSystemId = String(forceLinkedAndpadSystemId?.value)
      || allOrders.data.objects.find(({ 案件管理ID }) => 案件管理ID === projId.value);

    const andpadInvoiceUrl = andpadSystemId ?
      `https://andpad.jp/manager/my/orders/${andpadSystemId}/customer_agreement`
      : undefined;

    if (!andpadInvoiceUrl) return acc; // andpadと接続されていない案件は除外する

    const store = stores.find(({ storeCode }) => storeCode.value === storeCodeByProjct?.value);

    const chatworkRoomIds = chatworkRoomIdSetting({
      agents: agents,
      employees: employees,
    });

    const yumeAGs = getYumeAgNames({
      agents: agents,
    });


    acc?.push({
      alertState: true,
      reminderUrl: '', // 通知後に設定するため、ここでは省略する
      contractId: contractData.contractId,
      projId: projId.value,
      projName: projName.value,
      projType: projType.value,
      contractDate: contractData.contractDate,
      totalContractAmount: contractData.totalContractAmt.toString(),
      territory: store?.territory.value as Territory,
      yumeAG: yumeAGs,
      cwRoomIds: chatworkRoomIds,
      andpadInvoiceUrl: andpadInvoiceUrl,
      expectedCreateInvoiceDate: '',
      storeName: storeName.value,
    });

    return acc;

  }, [] as InvoiceReminder[]);

  return alertContracts;

};
import { IEmployees, IProjects, IStores, Territory } from 'types';
import { ContractRecordType } from '../../config';
import { InvoiceReminder } from '../../types/InvoiceReminder';
import { getMyOrders } from 'api-andpad';
import { chatworkRoomIdSetting } from '../notificationFunc/chatworkRoomIdSetting';
//import { getEarliestDateOfContract } from './getEarliestDateOfContract';
import { getYumeAgNames } from './getYumeAgNames';



/**
 * 契約書レコードをリマインダーレコードへ変換する
 * @param param0 
 * @returns 
 */
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


  const alertContracts: InvoiceReminder[] = contracts.map(({
    uuid: contractId,
    projId,
    projType,
    projName,
    totalContractAmt,
    contractDate,
    storeName,
    //contractAmtDate,
    //contractAmt,
    //initialAmtDate,
    //initialAmt,
    //interimAmtDate,
    //interimAmt,
    //finalAmtDate,
    //finalAmt,
    //othersAmtDate,
    //othersAmt,
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

    const andpadInvoiceUrl = andpadSystemId ?
      `https://andpad.jp/manager/my/orders/${andpadSystemId}/customer_agreement`
      : '';

    const store = stores.find(({ storeCode }) => storeCode.value === storeCodeByProjct?.value);

    const chatworkRoomIds = chatworkRoomIdSetting({
      agents: agents,
      employees: employees,
    });

    // 契約書から一番過去の支払日を取得する
    /* const contractAmtPaymentDate = getEarliestDateOfContract({
      dates: [
        contractAmtDate.value,
        initialAmtDate.value,
        interimAmtDate.value,
        finalAmtDate.value,
        othersAmtDate.value,
      ],
      contractAmts: [
        contractAmt.value,
        initialAmt.value,
        interimAmt.value,
        finalAmt.value,
        othersAmt.value,
      ],
    }); */

    const yumeAGs = getYumeAgNames({
      agents: agents,
    });


    return ({
      alertState: true,
      reminderUrl: '', // 通知後に設定するため、ここでは省略する
      contractId: contractId.value,
      projId: projId.value,
      projName: projName.value,
      projType: projType.value,
      contractDate: contractDate.value,
      totalContractAmount: totalContractAmt.value,
      territory: store?.territory.value as Territory,
      yumeAG: yumeAGs,
      cwRoomIds: chatworkRoomIds,
      andpadInvoiceUrl: andpadInvoiceUrl,
      expectedCreateInvoiceDate: '',
      storeName: storeName.value,
    });
  });

  return alertContracts;

};
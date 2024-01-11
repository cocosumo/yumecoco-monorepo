import { IEmployees, IProjects, IStores, Territory } from 'types';
import { ContractRecordType } from '../../config';
import { InvoiceReminder } from '../../types/InvoiceReminder';
import { calcContractInformation } from './calcContractInformation';
import { GetMyOrdersResponse } from 'api-andpad';
import { compileInfoFromProjId } from './compileInfoFromProjId';
import { ContractRecordTypeAndExPayDay } from './filterContractsToAlertTarget';



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
  contracts: ContractRecordTypeAndExPayDay[]
  allContracts: ContractRecordType[]
  projects: IProjects[]
  employees: IEmployees[]
  stores: IStores[]
  allOrders: GetMyOrdersResponse
}) => {



  const alertContracts: InvoiceReminder[] = contracts.reduce((acc, { contract, expectPaymentDate }) => {
    const {
      projId,
      projType,
      projName,
      storeName,
    } = contract;

    const tgtContracts = allContracts
      .filter(({ projId: contractProjId }) => contractProjId.value === projId.value) || [];
    const contractData = calcContractInformation({ tgtContracts: tgtContracts });

    const {
      andpadInvoiceUrl,
      chatworkRoomIds,
      connectedToAndpad,
      territory,
      systemId,
      yumeAGs,
    } = compileInfoFromProjId({
      projId: projId.value,
      allOrders: allOrders,
      employees: employees,
      projects: projects,
      stores: stores,
    });

    if (!connectedToAndpad) return acc;


    acc?.push({
      alertState: true,
      reminderUrl: '', // 通知後に設定するため、ここでは省略する
      systemId: systemId ?? '',
      contractId: contractData.contractId,
      projId: projId.value,
      projName: projName.value,
      projType: projType.value,
      contractDate: contractData.contractDate,
      totalContractAmount: contractData.totalContractAmt.toString(),
      territory: territory as Territory,
      yumeAG: yumeAGs,
      cwRoomIds: chatworkRoomIds,
      andpadInvoiceUrl: andpadInvoiceUrl ?? '',
      expectedCreateInvoiceDate: '',
      expectedPaymentDate: expectPaymentDate,
      storeName: storeName.value,
    });

    return acc;

  }, [] as InvoiceReminder[]);

  return alertContracts;

};
import { IAndpadpayments, IProjects } from 'types';
import { ContractRecordType, IInvoiceReminder, TgtProjType } from '../../config';
import { calcAlertDate } from './calcAlertDate';
import { getEarliestDateOfContract } from './getEarliestDateOfContract';



/**
 * 通知対象の契約のみに絞り込む
 */
export const filterContractsToAlertTarget = ({
  contracts,
  andpadPayments,
  reminders,
  projects,
}: {
  contracts: ContractRecordType[]
  andpadPayments: IAndpadpayments[]
  reminders: IInvoiceReminder[]
  projects: IProjects[]
}) => {

  return contracts.reduce((acc, contract) => {
    const {
      projId: contractProjId,
      totalContractAmt,
      contractDate,
      projType,
      contractAmt,
      contractAmtDate,
      initialAmt,
      initialAmtDate,
      interimAmt,
      interimAmtDate,
      finalAmt,
      finalAmtDate,
      othersAmt,
      othersAmtDate,
    } = contract;

    const hasInvoice = andpadPayments.some(({ projId }) => (projId.value === contractProjId.value)); // 強制接続の場合は取得できない
    const hasReminder = reminders.some(({ projId }) => projId.value === contractProjId.value);

    // 既に請求書もしくは、同工事のリマインダーが存在する場合は処理を行わない
    if (hasInvoice || hasReminder) return acc;

    // ANDPADに強制接続しているプロジェクトではないか確認する    
    const project = projects.filter((proj) => proj.uuid.value === contractProjId.value);
    const systemId = project.find(({ forceLinkedAndpadSystemId }) => forceLinkedAndpadSystemId.value !== '');


    if (systemId) {
      // 強制接続かつ、請求書が存在する場合は処理を行わない
      const hasInvoiceForce = andpadPayments.some(({ systemId: systemIdAP }) => {
        return systemIdAP.value === systemId.forceLinkedAndpadSystemId.value;
      });

      if (hasInvoiceForce) return acc;
    }


    // 契約書から一番過去の支払日を取得する
    const contractAmtPaymentDate = getEarliestDateOfContract({
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
    });

    // 契約書より、支払日を設定する
    const alertDate = calcAlertDate({
      contractDateStr: contractDate.value,
      projType: projType.value as TgtProjType,
      contractAmt: +totalContractAmt.value,
      contractAmtPaymentDateStr: contractAmtPaymentDate,
    });


    // 通知対象日を過ぎている場合
    if ((alertDate.getTime() <= new Date().getTime())) {
      acc?.push(contract);
    }

    return acc;

  }, [] as ContractRecordType[]);

};
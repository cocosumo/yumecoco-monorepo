import { IAndpadpayments } from 'types';
import { ContractRecordType, TgtProjType } from '../../config';
import { calcAlertDate } from './calcAlertDate';
import format from 'date-fns/format';
import { getEarliestDateOfContract } from './getEarliestDateOfContract';



/**
 * 通知対象の契約のみに絞り込む
 */
export const filterContractsToAlertTarget = ({
  contracts,
  andpadPayments,
}: {
  contracts: ContractRecordType[]
  andpadPayments: IAndpadpayments[]
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


    // 契約書から一番過去の支払日を取得する
    const contractAmtPaymentDate = getEarliestDateOfContract({
      dates: [
        contractAmtDate.value,
        initialAmtDate.value,
        interimAmtDate.value,
        finalAmtDate.value,
        othersAmtDate.value,
      ],
      contractAmts:[
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

    // 既に支払い履歴が存在するかを確認する(支払情報があれば通知不要)
    const paymentInfo = andpadPayments.some(({
      projId,
      paymentDate,
    }) => (projId.value === contractProjId.value) && (paymentDate.value !== ''));

    // 支払情報が存在しないかつ、今日が通知日の場合
    if (!paymentInfo && (alertDate === format(new Date(), 'yyyy-MM-dd'))) {
      acc?.push(contract);
    }

    return acc;

  }, [] as ContractRecordType[]);

};
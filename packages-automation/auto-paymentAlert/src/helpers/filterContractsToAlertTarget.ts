import { IAndpadpayments } from 'types';
import { ContractRecordType, TgtProjType } from '../../config';
import { calcAlertDate } from './calcAlertDate';
import format from 'date-fns/format';



/**配列内から一番過去の日付を取得します */
function getOldestDate(...dates: string[]) {
  let oldestDate = null;

  for (const dateStr of dates) {
    if (dateStr !== null) {
      const currentDate = new Date(dateStr);
      if (!oldestDate || currentDate < oldestDate) {
        oldestDate = currentDate;
      }
    }
  }
  return oldestDate ? format(oldestDate, 'yyyy-MM-dd') : null;
}


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
      contractAmtDate,
      initialAmtDate,
      interimAmtDate,
      finalAmtDate,
      othersAmtDate,
    } = contract;


    // 契約書から一番過去の支払日を取得する
    const contractAmtPaymentDate = getOldestDate(
      contractAmtDate.value,
      initialAmtDate.value,
      interimAmtDate.value,
      finalAmtDate.value,
      othersAmtDate.value,
    );

    // 契約書より、支払日を設定する
    const alertDate = calcAlertDate({
      contractDateStr: contractDate.value,
      projType: projType.value as TgtProjType,
      contractAmt: +totalContractAmt.value,
      contractAmtPaymentDateStr: contractAmtPaymentDate,
    });

    // 既に支払い履歴が存在するかを確認する(支払情報があれば通知不要)
    const paymentInfo = andpadPayments.find(({
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
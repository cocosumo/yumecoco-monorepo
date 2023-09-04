import { ContractRecordType, PaymentRemainderRecordType, TgtProjType } from '../../config';
import { calcAlertDate } from './calcAlertDate';


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

  return oldestDate;
}

/**
 * 契約一覧のデータを入金リマインダーアプリ形式へ変換します
 */
export const convertContractsToRemainder = ({
  projTypeContracts,
}: {
  projTypeContracts: ContractRecordType[]
}) => {

  const remainderRecords: Partial<PaymentRemainderRecordType> = projTypeContracts.map(({
    uuid,
    contractDate,
    envCompleteDate,
    projType,
    contractAmt,
    contractAmtDate,
    initialAmtDate,
    interimAmtDate,
    finalAmtDate,
    othersAmtDate,
  }) => {
    const systemId = '11487098'; // TODO 対象顧客のsystemIdを取得する

    const alertState = 0; //TODO データ更新の場合は保存されている値を取得する

    // 一番過去の支払日を取得する
    const contractAmtPaymentDate = getOldestDate(
      contractAmtDate.value,
      initialAmtDate.value,
      interimAmtDate.value,
      finalAmtDate.value,
      othersAmtDate.value,
    );

    const alertDate = calcAlertDate({
      projType: projType.value as TgtProjType,
      contractAmt: +contractAmt.value,
      contractAmtPaymentDate: contractAmtPaymentDate,
      contractDateStr: contractDate.value,
    });

    return {
      andpadUrl: { value: `https://andpad.jp/manager/my/orders/${systemId}/contract_orders` },
      alertState: alertState,
      alertDate: alertDate,
      contract: uuid.value, // updateKey
      projId,
      projType,
      totalContractAmount,
      expectedPaymentDate,
      andpadStatus,
      paymentTable,
      alertTarget,
    };
  });

  return remainderRecords;
};
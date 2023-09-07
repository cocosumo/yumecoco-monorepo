import { ContractRecordType, PaymentRemainderRecordType, TgtProjType } from '../../config';
import { calcAlertDate } from './calcAlertDate';
import { IAndpadpayments, IPaymentconfremainder, IProjects } from 'types';


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
export const convertContractsToRemainder = async ({
  projTypeContracts,
  projects,
  remainders,
  andpadPayments,
}: {
  projTypeContracts: ContractRecordType[]
  projects: IProjects[]
  remainders: IPaymentconfremainder[]
  andpadPayments: IAndpadpayments[]
}) => {

  const convertRemainderRecords = projTypeContracts.map(({
    uuid: contractId,
    projId: projIdByContract,
    contractDate,
    projType,
    totalContractAmt,
    contractAmt,
    contractAmtDate,
    initialAmtDate,
    interimAmtDate,
    finalAmtDate,
    othersAmtDate,
  }) => {

    const {
      cocoAGNames,
    } = projects.find(({ uuid }) => uuid.value === projIdByContract.value) || {};

    const {
      alertState,
    } = remainders.find(({ projId }) => projId.value === projIdByContract.value) || {};

    const andpadPaymentsByProjId = andpadPayments.filter(({ projId }) => projId.value === projIdByContract.value) || {};

    const paymentTable = andpadPaymentsByProjId.map(({ ID }) => {
      return { andpadId: { value: ID.value } };
    });

    // 一番過去の支払日を取得する
    const contractAmtPaymentDate = getOldestDate(
      contractAmtDate.value,
      initialAmtDate.value,
      interimAmtDate.value,
      finalAmtDate.value,
      othersAmtDate.value,
    );

    // 通知日の設定
    const alertDate = calcAlertDate({
      projType: projType.value as TgtProjType,
      contractAmt: +contractAmt.value,
      contractAmtPaymentDate: contractAmtPaymentDate,
      contractDateStr: contractDate.value,
    });

    return {
      alertState: { value: alertState },
      alertDate: { value: alertDate },
      contract: { value: contractId.value },
      projId: { value: projIdByContract.value },
      projType: { value: projType.value },
      totalContractAmount: { value: totalContractAmt.value },
      expectedPaymentDate: { value: contractAmtPaymentDate },
      paymentTable: [paymentTable],
      alertTarget: { value: cocoAGNames?.value },
    } as unknown as Partial<PaymentRemainderRecordType>;
  });

  return convertRemainderRecords;
};

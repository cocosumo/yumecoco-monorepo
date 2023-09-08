import { ContractRecordType, PaymentRemainderRecordType, TgtProjType } from '../../config';
import { calcAlertDate } from './calcAlertDate';
import { IAndpadpayments, IPaymentconfremainder, IProjects, IUser } from 'types';
import { toKintoneDateStr } from 'kokoas-client/src/lib';


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
  users,
}: {
  projTypeContracts: ContractRecordType[]
  projects: IProjects[]
  remainders: IPaymentconfremainder[]
  andpadPayments: IAndpadpayments[]
  users: IUser[]
}) => {

  const convertRemainderRecords = projTypeContracts.reduce((
    acc,
    {
      uuid: contractId,
      projId: projIdByContract,
      contractDate,
      totalContractAmt,
      contractAmt,
      contractAmtDate,
      initialAmtDate,
      interimAmtDate,
      finalAmtDate,
      othersAmtDate,
    },
  ) => {

    const {
      projTypeName,
      agents,
    } = projects.find(({ uuid }) => uuid.value === projIdByContract.value) || {};

    const remainderDat = remainders.find(({ projId }) => projId.value === projIdByContract.value);

    const andpadPaymentsByProjId = andpadPayments.filter(({ projId }) => projId.value === projIdByContract.value) || {};

    // 支払情報毎にサブテーブルの準備をする
    const paymentTable = andpadPaymentsByProjId.map(({
      ID,
      andpadProjName,
      paymentType,
      expectedPaymentDate,
      paymentDate,
    }) => {
      return {
        id: '', // 自動採番のため、省略
        value: {
          andpadId: { value: ID.value },
          andpadProjName: { value: andpadProjName.value },
          paymentType: { value: paymentType.value },
          andpadExpectedPaymentDate: { value: expectedPaymentDate.value },
          andpadPaymentDate: { value: paymentDate.value },
        },
      };
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
      projType: projTypeName?.value as TgtProjType,
      contractAmt: +contractAmt.value,
      contractAmtPaymentDate: contractAmtPaymentDate,
      contractDateStr: contractDate.value,
    });

    // 通知対象者の設定
    const alertTarget = agents?.value.filter(({ value }) => {
      return value.agentType.value === 'cocoAG';
    }).map(({
      value: {
        agentName,
      },
    }) => {
      const userDat = users.find(({
        surName,
        givenName,
      }) => {
        return (agentName.value.indexOf(surName) !== -1) && (agentName.value.indexOf(givenName) !== -1);
      });

      return ({
        code: userDat?.code || '',
        name: userDat?.name || '',
      });
    }) || [{
      code: '',
      name: '',
    }];

    if (remainderDat) {
      acc.updateRecords.push({
        alertState: { value: remainderDat.alertState.value },
        alertDate: { value: alertDate },
        contract: { value: contractId.value },
        projId: { value: projIdByContract.value },
        projType: { value: projTypeName?.value ?? '' },
        totalContractAmount: { value: totalContractAmt.value },
        expectedPaymentDate: { value: toKintoneDateStr(contractAmtPaymentDate) },
        paymentTable: {
          type: 'SUBTABLE',
          value: paymentTable,
        },
        alertTarget: { value: alertTarget },
      });
    } else {
      acc.addRecords.push({
        alertState: { value: '1' },
        alertDate: { value: alertDate },
        contract: { value: contractId.value },
        projId: { value: projIdByContract.value },
        projType: { value: projTypeName?.value ?? '' },
        totalContractAmount: { value: totalContractAmt.value },
        expectedPaymentDate: { value: toKintoneDateStr(contractAmtPaymentDate) },
        paymentTable: {
          type: 'SUBTABLE',
          value: paymentTable,
        },
        alertTarget: { value: alertTarget },
      });
    }

    return acc;
  }, {
    addRecords: [] as unknown as Partial<PaymentRemainderRecordType>[],
    updateRecords: [] as unknown as Partial<PaymentRemainderRecordType>[],
  });

  return convertRemainderRecords;
};

import { IContracts } from 'types';
import { getEarliestDateOfContract } from './getEarliestDateOfContract';
import { calcAlertDate } from './calcAlertDate';
import { TgtProjType } from '../../config';
import format from 'date-fns/format';



/** 支払予定日を契約書の情報から更新します */
export const updateExpectedPaymentDate = ({
  projId,
  projType,
  expectedPaymentDate,
  contracts,
}: {
  projId: string
  projType: string
  expectedPaymentDate: string
  contracts: IContracts[]
}) => {

  const tgtContract = contracts.find(({
    projId: projIdContract,
    contractType,
  }) => {
    return contractType.value === '契約' && projIdContract.value === projId;
  });

  if (!tgtContract) return expectedPaymentDate; // 契約書の紐づけに失敗した場合は、前回値のままとする

  const updateExpPayDate = getEarliestDateOfContract({
    dates: [
      tgtContract.contractAmtDate.value,
      tgtContract.initialAmtDate.value,
      tgtContract.interimAmtDate.value,
      tgtContract.finalAmtDate.value,
      tgtContract.othersAmtDate.value,
    ],
    contractAmts: [
      tgtContract.contractAmt.value,
      tgtContract.initialAmt.value,
      tgtContract.interimAmt.value,
      tgtContract.finalAmt.value,
      tgtContract.othersAmt.value,
    ],
  });

  
  const alertDate = calcAlertDate({
    contractDateStr: tgtContract.contractDate.value,
    projType: projType as TgtProjType,
    contractAmt: +tgtContract.totalContractAmt.value,
    contractAmtPaymentDateStr: updateExpPayDate,
  });

  return format(alertDate, 'yyyy-MM-dd');

};

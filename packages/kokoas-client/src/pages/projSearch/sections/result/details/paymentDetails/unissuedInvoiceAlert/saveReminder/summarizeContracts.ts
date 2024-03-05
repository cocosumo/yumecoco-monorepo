import { IContracts } from 'types';
import { getEarliestDate } from './getEarliestDate';



export const summarizeContracts = ({
  contracts,
}: {
  contracts: IContracts[]
}) => {

  // メインの契約書を設定する
  const hasKeiyakuCategory = contracts?.some(({ contractType }) => contractType.value === '契約');
  const mainCategoryName = hasKeiyakuCategory ? '契約' : '設計契約';

  const contractData = contracts.reduce((acc, {
    uuid: curContractId,
    contractType,
    contractDate: curContractDate,
    totalContractAmt: curTotalContractAmt,
    hasRefund,
    refundAmt,
    hasReduction,
    reductionAmt,

    /** 支払予定日 */
    contractAmtDate,
    initialAmtDate,
    interimAmtDate,
    finalAmtDate,
    othersAmtDate,
  }) => {
    if (contractType.value === mainCategoryName) {
      acc.mainContractDate = curContractDate.value;
    }

    acc.contractIds = acc.contractIds.length === 0 ?
      curContractId.value
      : `${acc.contractIds}, ${curContractId.value}`;

    acc.totalContractAmt += +curTotalContractAmt.value;

    if (hasRefund) {
      acc.totalContractAmt -= +refundAmt.value;
    }

    if (hasReduction) {
      acc.totalContractAmt -= +reductionAmt.value;
    }

    /** 初回支払予定日の取得 */
    acc.earliestDate = getEarliestDate([
      acc.earliestDate,
      contractAmtDate.value,
      initialAmtDate.value,
      interimAmtDate.value,
      finalAmtDate.value,
      othersAmtDate.value,
    ]);

    return acc;

  }, {
    contractIds: '',
    mainContractDate: '',
    totalContractAmt: 0,
    earliestDate: '',
  });

  return contractData;
};

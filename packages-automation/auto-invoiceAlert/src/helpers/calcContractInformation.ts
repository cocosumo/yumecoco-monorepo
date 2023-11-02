import { ContractRecordType } from '../../config';


/**
 * 工事に対する合計の契約金額を算出します。
 * なお、返金、減額は契約金額から差し引くが、
 * 補助金は契約書に含まれるため、差し引かれないものとします。
 * @param param0 
 * @returns 
 */
export const  calcContractInformation = ({
  tgtContracts,

}:{
  tgtContracts: ContractRecordType[]
}) => {

  const contractData = tgtContracts.reduce((acc, {
    uuid: curContractId,
    contractType,
    contractDate: curContractDate,
    totalContractAmt: curTotalContractAmt,

    /** 返金有無 */
    hasRefund,

    /** 返金額 */
    refundAmt,

    /** 返金方法 */
    // refundMethod, // 返金方法は契約金額の計算に影響しない

    /** 減額有無 */
    hasReduction,

    /** 減額金額 */
    reductionAmt,
  }) => {

    acc.contractId = `${acc.contractId}, ${curContractId.value}`;
    if (contractType.value === '契約') {
      acc.contractDate = curContractDate.value;
    }
    acc.totalContractAmt += +curTotalContractAmt.value;

    if (hasRefund) {
      acc.totalContractAmt += +refundAmt.value;
    }

    if (hasReduction) {
      acc.totalContractAmt += +reductionAmt.value;
    }

    return acc;

  }, {
    contractId: '',
    contractDate: '',
    totalContractAmt: 0,
  });

  return contractData;
};

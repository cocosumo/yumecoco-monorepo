import { RecordType } from './config';

export const getContractsSummary = (contractRecs: RecordType[]) => {

  return contractRecs.reduce(
    (
      acc,
      {
        contractType,
        totalContractAmt,
        tax,

        hasRefund,
        refundAmt,

        hasReduction,
        reductionAmt,

        hasSubsidy,
        subsidyAmt,
      },
    ) => {
      const newAcc = { ...acc };

      if (
        contractType.value === '契約' ||
        contractType.value === '' // 古いデータには契約タイプがないので、空文字の場合も契約とみなす
      ) {
        newAcc.契約金額 += +totalContractAmt.value;
      } else if (contractType.value === '追加') {
        newAcc.追加金額 += +totalContractAmt.value;
      }

      // 返金がある場合は、返金フラグをtrueにする
      newAcc.返金 = newAcc.返金 || hasRefund.value === 'はい' ? true : false;

      newAcc.税率 = +tax.value;
      newAcc.補助金Amt += hasSubsidy.value === 'はい' ? +subsidyAmt.value : 0;

      // K165で追加金額に返金と減額を含めるようになったが、「返金」「減額」も表示する依頼がくるかもしれないので、
      // 別々のプロパティにする
      newAcc.減額Amt += hasReduction.value === 'はい' ? +reductionAmt.value : 0;
      newAcc.返金Amt += hasRefund.value === 'はい' ? +refundAmt.value : 0;

      return newAcc;
    },
    {
      契約金額: 0,
      追加金額: 0,
      税率: 0.1,
      返金: false,
      減額Amt: 0,
      返金Amt: 0,
      補助金Amt: 0,
    },
  );
};
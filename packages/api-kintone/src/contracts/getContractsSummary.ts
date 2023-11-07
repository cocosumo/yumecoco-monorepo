import { RecordType } from './config';


/**
 * K165依頼により、契約金額の合計を計算する
 * 
 * 関数化にして、フロントエンドとバックエンドを共有して、
 * 変更があった場合に両方修正する必要がなくなる
 * 
 * @param contractRecs 
 * @returns 
 */
export const getContractsSummary = (contractRecs: RecordType[]) => {

  const result = contractRecs.reduce(
    (
      acc,
      {
        contractType,
        includePlanContractAmt,
        totalContractAmt, // 契約金額税込
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
        contractType.value === '' // 古いデータには契約タイプがないので、空文字の場合も契約とみな
      ) {
        newAcc.設計契約金込み = newAcc.設計契約金込み || includePlanContractAmt.value === '1';
        newAcc.契約金額税込 += +totalContractAmt.value;
        newAcc.本契約件数 += 1;
        newAcc.合計受注金額税込 += +totalContractAmt.value;

      } else if (contractType.value === '追加') {
        newAcc.追加金額税込 += +totalContractAmt.value;
        newAcc.追加契約件数 += 1;
        newAcc.合計受注金額税込 += +totalContractAmt.value;

      } else if (contractType.value === '設計契約') {
        newAcc.設計契約金額税込 += +totalContractAmt.value;
        newAcc.設計契約件数 += 1;
      } else {
        // その他カテゴリーは無視する
        return newAcc;
      }
      

      // 設計契約を含むかどうか

      // 返金・減額・補助金がある場合は、各フラグをtrueにする
      newAcc.返金 = newAcc.返金 || hasRefund.value === 'はい';
      newAcc.減額 = newAcc.減額 || hasReduction.value === 'はい';
      newAcc.補助金 = newAcc.補助金 || hasSubsidy.value === 'はい';


      newAcc.税率 = +tax.value;
      newAcc.補助金Amt += hasSubsidy.value === 'はい' ? +subsidyAmt.value : 0;

      // K165で追加金額に返金と減額を含めるようになったが、「返金」「減額」も表示する依頼がくるかもしれないので、
      // 別々のプロパティにする
      if (hasReduction.value === 'はい') {
        newAcc.減額Amt += +reductionAmt.value;
        newAcc.追加金額税込 -= +reductionAmt.value;
        newAcc.合計受注金額税込 -= +reductionAmt.value;
      }

      if (hasRefund.value === 'はい') {
        newAcc.返金Amt += +refundAmt.value;
        newAcc.追加金額税込 -= +refundAmt.value;
        newAcc.合計受注金額税込 -= +refundAmt.value;
      }

      return newAcc;
    },
    {
      契約金額税込: 0,
      追加金額税込: 0,
      設計契約金額税込: 0,
      設計契約金込み: false,
      合計受注金額税込: 0,
      税率: 0.1,
      返金: false,
      返金Amt: 0,
      減額: false,
      減額Amt: 0,
      補助金: false,
      補助金Amt: 0,
      本契約件数: 0,
      追加契約件数: 0,
      設計契約件数: 0,
    },
  );


  if (!result.設計契約金込み) {
    result.合計受注金額税込 += result.設計契約金額税込;
  } 

  return result;
};

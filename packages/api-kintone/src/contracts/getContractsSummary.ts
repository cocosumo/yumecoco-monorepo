import { RecordType } from './config';


/**
 * K165依頼により、契約金額の合計を計算する
 * k343依頼により、2024.06以降の新築物件のみ紹介料率を変更
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
        contractAddType,
        contractDate,
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
        contractType.value === '' // 古いデータには契約タイプがないので、空文字の場合も契約とみなす
      ) {
        newAcc.設計契約金含み = newAcc.設計契約金含み || includePlanContractAmt.value === '1';
        newAcc.契約金額税込 += +totalContractAmt.value;
        newAcc.本契約件数++;

        newAcc.contractDate = contractDate.value;
        newAcc.新築紹介料対象金額 += +totalContractAmt.value;
        if (hasRefund.value === 'はい') {
          newAcc.新築紹介料対象金額 -= +refundAmt.value;
        }

      } else if (contractType.value === '追加') {
        if (contractAddType.value !== '減額工事' && contractAddType.value !== '返金') {
          newAcc.追加金額税込 += +totalContractAmt.value;
        }
        if (contractAddType.value === '減額工事') {
          newAcc.減額Amt -= +totalContractAmt.value;
          newAcc.追加金額税込 += +totalContractAmt.value;
        }
        if (contractAddType.value === '返金') {
          newAcc.返金Amt -= +totalContractAmt.value;
          newAcc.追加金額税込 += +totalContractAmt.value;
        }

        newAcc.追加契約件数++;

      } else if (contractType.value === '設計契約') {

        newAcc.設計契約金額税込 += +totalContractAmt.value;
        newAcc.設計契約件数++;

      } else {
        // その他カテゴリーは無視する
        return newAcc;
      }

      // 設計契約を含むかどうか

      // 返金・減額・補助金がある場合は、各フラグをtrueにする
      newAcc.返金 = newAcc.返金 || hasRefund.value === 'はい' || contractAddType.value === '返金';
      newAcc.減額 = newAcc.減額 || hasReduction.value === 'はい' || contractAddType.value === '減額工事';
      newAcc.補助金 = newAcc.補助金 || hasSubsidy.value === 'はい';


      newAcc.税率 = +tax.value;
      newAcc.補助金Amt += hasSubsidy.value === 'はい' ? +subsidyAmt.value : 0;

      // K165で追加金額に返金と減額を含めるようになったが、「返金」「減額」も表示する依頼がくるかもしれないので、
      // 別々のプロパティにする
      if (hasReduction.value === 'はい') {
        newAcc.減額Amt += +reductionAmt.value;
        newAcc.追加金額税込 -= +reductionAmt.value;
      }

      if (hasRefund.value === 'はい') {
        newAcc.返金Amt += +refundAmt.value;
        newAcc.追加金額税込 -= +refundAmt.value;
      }

      return newAcc;
    },
    {
      契約金額税込: 0,
      追加金額税込: 0,
      設計契約金額税込: 0,
      設計契約金含み: false,
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
      新築紹介料対象金額: 0, // k343
      contractDate: '',
    },
  );

  if (!result.設計契約金含み) {

    if (result.本契約件数 && result.設計契約件数) {
      // K244 原価管理表には、設計契約を追加契約金額として計算したい。
      result.追加金額税込 += result.設計契約金額税込;

    } else if (!result.本契約件数 && result.設計契約件数) {
      // K244 ただし、設計契約１つのみの工事は設計契約の金額を契約金額として計算してほしい
      result.契約金額税込 += result.設計契約金額税込;
    }
    
    result.新築紹介料対象金額 += result.設計契約金額税込; 
  }

  result.合計受注金額税込 = result.追加金額税込 + result.契約金額税込;

  // 本契約の登録に設計契約が含まれていると設定した場合、設計契約金は追加契約金額と契約金額には計算しない。



  return result;
};

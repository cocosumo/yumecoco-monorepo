import { Big } from 'big.js';

export interface CostManagement {
  orderAmountBeforeTax: number,
  additionalAmountBeforeTax: number,
  purchaseAmount: number,
  paymentAmount: number,
  yumeProfitSharing: number,
  cocoProfitSharing: number,
  予定利益率: number,
  予定利益額: number,
  実利益率: number,
  実利益額: number,
  実利益税抜_夢てつ: number,
  実利益税抜_ここすも: number,
  受注額計_税込: number,
  受注額計_税抜: number,
  入金額: number,
  未入金: number,
}


export const calcProfitability = ({
  orderAmountAfterTax,
  additionalAmountAfterTax,
  purchaseAmount,
  paymentAmount,
  depositAmount,
  yumeCommFeeRate,
  tax,
}: {
  orderAmountAfterTax: number // 受注金額(税込)
  additionalAmountAfterTax: number // 追加金額(税込)
  purchaseAmount: number // 実行予算金額
  paymentAmount: number // 支払金額
  depositAmount: number // 入金金額
  yumeCommFeeRate: number // ゆめてつ紹介料率
  tax: number // 税率
}): CostManagement => {

  const taxForCalc = Big(tax).add(1);

  /** 受注金額(税抜) */
  const orderAmountBeforeTax = Big(orderAmountAfterTax).div(taxForCalc)
    .round(0, 1)
    .toNumber();

  /** 追加金額(税抜) */
  const additionalAmountBeforeTax = Big(additionalAmountAfterTax).div(taxForCalc)
    .round(0, 1)
    .toNumber();

  /** 受注総額 */
  const orderTotalBeforeTax = Big(orderAmountBeforeTax).plus(additionalAmountBeforeTax)
    .toNumber();

  /** 予定利益額 */
  const plannedProfit = Big(orderTotalBeforeTax).minus(purchaseAmount)
    .toNumber();

  /** 実利益額 */
  const actualProfit = Big(orderTotalBeforeTax).minus(paymentAmount)
    .toNumber();

  /** 予定利益率 */
  const plannedProfitMargin = Big(plannedProfit).div(orderTotalBeforeTax)
    .mul(100)
    .round(2, 1)
    .toNumber();

  /** 実利益率 */
  const actualProfitMargin = Big(actualProfit).div(orderTotalBeforeTax)
    .mul(100)
    .round(2, 1)
    .toNumber();

  /** 実利益税抜_夢てつ */
  const yumeActualProfit = Big(actualProfit).mul(yumeCommFeeRate)
    .div(100)
    .round(0, 1)
    .toNumber();

  /** 実利益税抜_ここすも */
  const cocoActualProfit = Big(actualProfit).minus(yumeActualProfit)
    .round(0, 1)
    .toNumber();

  /** 受注額計_税込 */
  const orderTotalAfterAmount = Big(orderTotalBeforeTax).mul(taxForCalc)
    .toNumber();

  /** ここすも利益配分 */
  const cocoProfitSharing = Big(100).minus(yumeCommFeeRate)
    .toNumber();

  /** 未入金 */
  const unpaidAmount = Big(orderTotalAfterAmount).minus(depositAmount)
    .toNumber();

  return {
    orderAmountBeforeTax: orderAmountBeforeTax,
    additionalAmountBeforeTax: additionalAmountBeforeTax,
    purchaseAmount: purchaseAmount,
    paymentAmount: paymentAmount,
    予定利益率: plannedProfitMargin,
    予定利益額: plannedProfit,
    実利益率: actualProfitMargin,
    実利益額: actualProfit,
    yumeProfitSharing: yumeCommFeeRate,
    cocoProfitSharing: cocoProfitSharing,
    実利益税抜_夢てつ: yumeActualProfit,
    実利益税抜_ここすも: cocoActualProfit,
    受注額計_税込: orderTotalAfterAmount,
    受注額計_税抜: orderTotalBeforeTax,
    入金額: depositAmount,
    未入金: unpaidAmount,
  };
};
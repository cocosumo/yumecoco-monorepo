import { Big } from 'big.js';

interface CalculateAmountBeforeTaxParams {
  /** 契約金額 */
  contractAmount: number,

  /** 契約金額の非課税金額  */
  nonTaxableAmount: number,

  /** 請求金額 */
  billingAmount: number,

  /** 請求済み金額 */
  billedAmount: number,

  /** 消費税率  */
  taxRate?: number,

}

interface CalculateAmountBeforeTaxResultParams extends CalculateAmountBeforeTaxParams {
  /** 請求金額の内の税抜金額 */
  billingAmountBeforeTax: number,

  /** 請求金額の内の非課税金額 */
  billingAmountNonTaxable: number,

  /** 契約金超過 */
  isExceeded: boolean,
}

export const calculateAmountBeforeTax = (
  params: CalculateAmountBeforeTaxParams,
): CalculateAmountBeforeTaxResultParams => {

  const {
    contractAmount,
    nonTaxableAmount,
    billingAmount,
    billedAmount,
    taxRate = 0.1,
  } = params;

  // 請求残高の算出
  const billingBalance = contractAmount - billedAmount;
  const billingBalanceTaxable = contractAmount - nonTaxableAmount - billedAmount;

  // 請求金額が請求残高を超過している場合は、超過分を課税対象として算出する
  let isExceeded = false;
  let result = {} as CalculateAmountBeforeTaxResultParams;

  const bTaxableAmount = Big(contractAmount).minus(nonTaxableAmount).minus(billedAmount);
  const bTax = Big(1).plus(taxRate);

  if (contractAmount >= 0) { // 請求書(契約金額が0円以上)の場合

    if (billingBalance >= billingAmount) {
      if (billingBalanceTaxable <= 0) { // 既に課税対象分を請求しきっている場合

        result = {
          ...params,
          isExceeded,
          billingAmountBeforeTax: billingAmount,
          billingAmountNonTaxable: billingAmount,
        };
      } else if (billingBalanceTaxable >= billingAmount) { // 全額課税対象の請求の場合


        result = {
          ...params,
          isExceeded,
          billingAmountBeforeTax: Big(billingAmount).div(bTax).toNumber(),
          billingAmountNonTaxable: 0,
        };
      } else { // 課税・非課税が混在する場合
        const bNonTaxalbeBillingAmount = Big(billingAmount).minus(bTaxableAmount);

        result = {
          ...params,
          isExceeded,
          billingAmountBeforeTax: Big(bTaxableAmount).div(bTax).plus(bNonTaxalbeBillingAmount).toNumber(),
          billingAmountNonTaxable: bNonTaxalbeBillingAmount.toNumber(),
        };
      }
    } else {
      isExceeded = true;
      // 請求額を課税対象分と非課税分で分割
      // それぞれを合算してアウトプットを設定する

      result = {};
    }
  }



  return result;
};
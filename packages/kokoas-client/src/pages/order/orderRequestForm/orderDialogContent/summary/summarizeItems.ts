import { TOrderForm } from '../../schema';
import { Big } from 'big.js';


export interface ReturnType {
  
  /** 小計 ○○%　対象 */
  groupedByTaxArray: [string, number][];
  
  /** 消費税 */
  totalTaxAmount: number;
  
  /** 非課税 */
  nonTaxableAmount: number;
  
  /** 合計 */
  totalAmount: number; 
}


type GroupByTaxRate = Record<number, Big>;

export const summarizeItems = (selectedItems: TOrderForm['selectedItems']): ReturnType => {

  // 各税率ごとに合計金額を計算
  const groupedByTaxRate  = selectedItems.reduce<GroupByTaxRate>((acc, item) => {
    const {
      rowCostPriceBeforeTax,
      taxRate,
    } = item;

    const rowCostPriceBeforeTaxBig = new Big(rowCostPriceBeforeTax);

    if (!acc[taxRate]) {
      acc[taxRate] = rowCostPriceBeforeTaxBig;
    } else {
      acc[taxRate] = acc[taxRate].add(rowCostPriceBeforeTaxBig);
    }

    return acc;
  }, Object.create(null));

  // 配列に変換して税率の高い順にソート
  const groupedArray = Object.entries(groupedByTaxRate)
    .sort(([a], [b]) => Number(b) - Number(a)) as [string, Big][];
  
  let totalTaxAmount = Big(0);
  let nonTaxableAmount = Big(0);
  let totalAmount = Big(0);
  const groupedByTaxArray: ReturnType['groupedByTaxArray'] = []; 

  
  for (const [taxRate, amount] of groupedArray) {
    const taxRateNumber = Number(taxRate);

    // 税率区分の合計金額から消費税を計算
    const taxAmount = amount.mul(taxRateNumber);

    totalTaxAmount = totalTaxAmount.add(taxAmount);
    totalAmount = totalAmount.add(amount).add(taxAmount);

    if (taxRateNumber === 0) {
      nonTaxableAmount = nonTaxableAmount.add(amount);
    } else {
      groupedByTaxArray.push([`${Math.round(taxRateNumber * 100)}`, amount.toNumber()]);
    }
  }
  

  return {
    groupedByTaxArray,
    totalTaxAmount: totalTaxAmount.toNumber(),
    nonTaxableAmount: nonTaxableAmount.toNumber(),
    totalAmount: totalAmount.toNumber(),
  };
};
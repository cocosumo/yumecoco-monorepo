// import { summaryLabelList } from '../constantDefinition';
import { KeyOfForm } from '../form';

export default function summaryCalcProcess(field, values) {
  let output = '-';
  let sum = 0;
  const len = values.items.length;
  const summaryLabelList = (['totalCost', 'grossProfit', 'grossProfitMargin', 
    'taxAmount', 'taxExcludedAmount', 'amountIncludingTax'] as KeyOfForm[]);

  /* if (field.name === summaryLabelList[0]) { */
  /* 原価合計の算出処理 : 原価*数量の合計 */
  /* for (let i = 0; i < len; i++) {
      sum += Number(values.items[i].costPrice) * Number(values.items[i].quantity);
    }
    output = sum.toString();
  } else */ if (field.name === summaryLabelList[1]) {
    /* 粗利の算出処理 : 原価*数量*利益率の合計 */
    for (let i = 0; i < len; i++) {
      sum += Number(values.items[i].costPrice) * Number(values.items[i].quantity)
        * (Number(values.items[i].elemProfRate) / 100);
    }
    output = sum.toString();

  } else if (field.name === summaryLabelList[2]) {
    /* 利益率の算出処理 : 粗利/原価合計 */
    let costPriceTotal = 0; // 原価合計
    let grossProfitTotal = 0; // 粗利合計

    for (let i = 0; i < len; i++) {
      costPriceTotal += Number(values.items[i].costPrice) * Number(values.items[i].quantity);
      grossProfitTotal += Number(values.items[i].costPrice) * Number(values.items[i].quantity)
        * (Number(values.items[i].elemProfRate) / 100);
    }
    output = ((grossProfitTotal / costPriceTotal) * 100 + '%').toString();
  } else if (field.name === summaryLabelList[3]) {
    /* 税額の算出処理 : 税込金額 - 税抜金額 */
    let zeikomi = 0;
    let zeinuki = 0;
    
    for (let i = 0; i < len; i++) {
      zeinuki += Number(values.items[i].costPrice) * Number(values.items[i].quantity)
      * (1 + (Number(values.items[i].elemProfRate) / 100));
      zeikomi += Number(values.items[i].price);
    }
    output = (zeikomi - zeinuki).toString();

  } else if (field.name === summaryLabelList[4]) {
    /* 税抜金額の算出処理 :	原価*数量*(1+利益率)の合計 */
    for (let i = 0; i < len; i++) {
      sum += Number(values.items[i].costPrice) * Number(values.items[i].quantity)
        * (1 + (Number(values.items[i].elemProfRate) / 100));
    }
    output = sum.toString();

  } else if (field.name === summaryLabelList[5]) {
    /* 税込金額の算出処理 :	原価*数量*(1+利益率)*(1+税率)の合計 */
    for (let i = 0; i < len; i++) {
      sum += Number(values.items[i].price);
    }
    output = sum.toString();

  } else {
    output = '-';
  }

  return output;
}


/****
 * 計算の仕様
 * https://trello.com/c/9WvDqhV1
 *
 *  A = 原価
 *  B = 粗利（円）
 *  C = 単価
 *  D = 利益
 *
 * ---------------
 *
 *  C = A / (1 - D )
 *  B = C - A
 *
 * ※ 行ごと丸める。
 */


/**
 *
 * @param レコード
 * @returns {object}
 * @returns {number} object.totalCostPrice - 原価合計
 * @returns {number} object.totalCPWithProfit -  利益込み原価合計 | 税抜金額
 * @returns {number} object.totalAmountInclTax - 税込合計
 * @returns {number} object.taxAmount - 税合計
 * @returns {number} object.totalProfitRate - 粗利
 *
 */
export const calculateEstimate = (
  {
    tax,
    materials,
    recordId,
  } : {
    tax: number
    recordId: string
    materials: {

      /** 利益率 */
      materialProfit: number,

      /** 数量 */
      quantity: number,

      /** 課税かどうか */
      isTaxable: boolean,

      /** 原価 */
      costPrice: number,

    }[]
  },
) => {
  const taxRate  = +tax / 100;

  const result = materials
    .reduce((
      acc,
      {
        costPrice,
        quantity,
        isTaxable,
        materialProfit,
      },
    ) => {

      // [利益率 D]  (0 - 100)
      const matProfitRate = (+materialProfit) / 100;

      // [単価 C] = A / (1 - D)
      const matUnitPrice = costPrice /  (1 - matProfitRate);

      //  [粗利 B] = C - A
      const matGrossProfit = matUnitPrice - costPrice;

      // 行の単価合計 = 数量 * C, 大黒の金額
      const rowUnitPRice = quantity * matUnitPrice;

      // 行の粗利合計 = 数量 * B,
      const rowGrossProfit = quantity * matGrossProfit;

      // 行の原価合計 = 数量 * A, 大黒の原価金額
      const rowUnitPrice = quantity * costPrice;

      // 税込み行の粗利合計
      const rowGrossProfitWithTax = rowGrossProfit + (1 + (isTaxable ? taxRate : 0 ) );


      console.log(rowUnitPRice, rowUnitPrice, rowGrossProfitWithTax);
      /*
      // 部材の利益率
      const matProfitRate =  +materialProfit / 100;

      // 利益込み原価
      const unitPrice = +costPrice * (1 + matProfitRate);

      // 原価合計：原価 * 数量
      const rowTotalCostPrice = +costPrice *  +quantity;

      // 税抜金額 ：利益込み原価 * 数量
      const rowTotalCPWithProfit = unitPrice * +quantity;

      // 税込金額 : 税抜金額 * 税
      const totalAmntInclTax = rowTotalCPWithProfit * (1 + (isTaxable ? taxRate : 0 ) );

      acc.totalAmountInclTax += totalAmntInclTax;
      acc.totalCostPrice += rowTotalCostPrice;
      acc.totalCPWithProfit += rowTotalCPWithProfit;

      acc.materials.push({
        costPrice,
        materialProfit,
        quantity,
        rowUnitPrice: unitPrice,
        rowTotalAmountInclTax:  totalAmntInclTax,
      });
 */
      return acc;
    }, {
      totalCostPrice : 0,
      totalUnitPrice : 0,
      totalCPWithProfit: 0,
      totalAmountInclTax: 0,
      materials: [] as {
        costPrice: number,
        quantity: number,
        materialProfit: number,
        rowUnitPrice: number,
        rowGrossProfit: number,
        rowTotalAmountInclTax: number
      }[],
    });

  const {
    totalCostPrice,
    totalCPWithProfit,
    totalAmountInclTax,
  } = result;

  /** 粗利 */
  const totalProfit = totalCPWithProfit - totalCostPrice;

  return {
    ...result,
    recordId,
    taxRate,
    totalProfit,

    /** 粗利率 ：粗利 / 原価合計 */
    totalProfitRate: totalProfit / totalCostPrice * 100,

    /** 税 ：税込金額 - 税抜金額 */
    taxAmount: totalAmountInclTax - totalCPWithProfit,
  };

};
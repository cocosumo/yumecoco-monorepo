import { getAndpadOrdersByAndpadProjId } from 'api-kintone/src/andpadOrders/getAndpadOrdersByAndpadProjId';

interface PaymentHistory {
  paymentDate: string;
  paymentAmountBeforeTax: number;
}

interface OrderInfo {
  supplierName: string;
  orderAmountBeforeTax: number;
  paymentHistory: PaymentHistory[];
}

export interface CostManagement {
  受注金額_税抜: number,
  追加金額_税抜: number,
  発注金額_税抜: number,
  支払金額_税抜: number,
  OrderInfo: OrderInfo[]
}


/**
 * 発注会社ごとに発注情報の詳細をまとめる
 * @param andpadOrders andpadの発注情報
 * @returns 
 */
export const summarizeOrderingCompanyInfo = (
  andpadOrders: Awaited<ReturnType<typeof getAndpadOrdersByAndpadProjId>>,
) => {

  const costManagemenList = andpadOrders.reduce((acc, {
    supplierName,
    orderAmountBeforeTax,
    支払日,
  }) => {
    const tgtSupplierName = supplierName.value;

    if (typeof acc[tgtSupplierName] === 'undefined') {
      acc[tgtSupplierName] = {
        supplierName: supplierName.value,
        orderAmountBeforeTax: +orderAmountBeforeTax.value,
        paymentHistory: [{
          paymentDate: 支払日.value,
          paymentAmountBeforeTax: 支払日.value ? +orderAmountBeforeTax.value : 0,
        }],
      };
    } else {
      // 支払い履歴に支払日を追加する
      acc[tgtSupplierName].paymentHistory.push({
        paymentDate: 支払日.value,
        paymentAmountBeforeTax: 支払日.value ? +orderAmountBeforeTax.value : 0,
      });

      // 発注金額(税抜総額)を更新する
      acc[tgtSupplierName] = {
        ...acc[tgtSupplierName],
        orderAmountBeforeTax: +acc[tgtSupplierName].orderAmountBeforeTax + +orderAmountBeforeTax.value,
      };
    }

    return acc;

  }, { } as Record<string, OrderInfo>);

  return Object.values(costManagemenList);
};
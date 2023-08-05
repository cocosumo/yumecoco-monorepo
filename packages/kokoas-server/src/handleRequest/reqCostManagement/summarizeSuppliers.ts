import { IAndpadprocurements } from 'types';

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
  発注金額_税抜: number,
  支払金額_税抜: number,
  orderInfo: OrderInfo[]
}


/**
 * 発注会社ごとに発注情報の詳細をまとめる
 * @param andpadOrders andpadの発注情報
 * @returns 
 */
export const summarizeSuppliers = (
  andpadOrders: IAndpadprocurements[],
): CostManagement => {

  const costManagemenList = andpadOrders.reduce((acc, {
    supplierName,
    orderAmountBeforeTax,
    支払日,
  }) => {
    const tgtSupplierName = supplierName.value;

    // 支払い履歴に支払日を追加する
    const index = acc.orderInfo.findIndex((val) => val.supplierName === tgtSupplierName);

    if (index !== -1) {
      acc.orderInfo[index].paymentHistory.push({
        paymentDate: 支払日.value,
        paymentAmountBeforeTax: 支払日.value ? +orderAmountBeforeTax.value : 0,
      });

      // 発注金額(税抜総額)を更新する
      acc.orderInfo[index] = {
        ...acc.orderInfo[index],
        orderAmountBeforeTax: +acc.orderInfo[index].orderAmountBeforeTax + +orderAmountBeforeTax.value,
      };

    } else {
      acc.orderInfo.push({
        supplierName: supplierName.value,
        orderAmountBeforeTax: +orderAmountBeforeTax.value,
        paymentHistory: [{
          paymentDate: 支払日.value,
          paymentAmountBeforeTax: 支払日.value ? +orderAmountBeforeTax.value : 0,
        }],
      });
    }
    return {
      ...acc,
      発注金額_税抜: acc.発注金額_税抜 + +orderAmountBeforeTax.value,
      支払金額_税抜: acc.支払金額_税抜 + 支払日.value ? +orderAmountBeforeTax.value : 0,
    };

  }, {
    発注金額_税抜: 0,
    支払金額_税抜: 0,
    orderInfo: [],
  } as CostManagement);

  return costManagemenList;
};
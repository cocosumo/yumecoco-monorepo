import { parseISO } from 'date-fns';
import type { IAndpadprocurements, ProcurementInfo } from 'types';



export interface ProcurementData {
  発注金額_税抜: number,
  支払金額_税抜: number,
  maxPaymentDate: Date | null,
  minPaymentDate: Date | null,
  orderInfo: ProcurementInfo[]
}

/**
 * 発注会社ごとに発注情報の詳細をまとめる
 * @param andpadOrders andpadの発注情報
 * @returns 
 */
export const summarizeSuppliers = (
  andpadOrders: IAndpadprocurements[],
) => {

  const costManagemenList = andpadOrders.reduce((acc, {
    supplierName,
    orderAmountBeforeTax,
    支払日,
    
  }) => {
    const tgtSupplierName = supplierName.value;
    const parsedPaymentDate = 支払日.value ? parseISO(支払日.value) : null;

    if (parsedPaymentDate) {
      if (acc.maxPaymentDate === null || acc.maxPaymentDate < parsedPaymentDate) {
        acc.maxPaymentDate = parsedPaymentDate;
      }
  
      if (acc.minPaymentDate === null || acc.minPaymentDate > parsedPaymentDate) {
        acc.minPaymentDate = parsedPaymentDate;
      }
    }

    
    // 支払い履歴に支払日を追加する
    const index = acc.orderInfo.findIndex((val) => val.supplierName === tgtSupplierName);

    if (index !== -1) {
      acc.orderInfo[index].paymentHistory.push({
        paymentDate: parsedPaymentDate,
        paymentAmountBeforeTax: parsedPaymentDate ? +orderAmountBeforeTax.value : 0,
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
          paymentDate: parsedPaymentDate,
          paymentAmountBeforeTax: parsedPaymentDate ? +orderAmountBeforeTax.value : 0,
        }],
      });
    }
    return {
      ...acc,
      発注金額_税抜: acc.発注金額_税抜 + +orderAmountBeforeTax.value,
      支払金額_税抜: acc.支払金額_税抜 + (parsedPaymentDate ? +orderAmountBeforeTax.value : 0),
    };

  }, {
    発注金額_税抜: 0,
    支払金額_税抜: 0,
    maxPaymentDate: null,
    minPaymentDate: null,
    orderInfo: [],
  } as ProcurementData);

  return costManagemenList;
};
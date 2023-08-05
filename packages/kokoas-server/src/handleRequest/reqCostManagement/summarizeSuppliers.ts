import type { ProcurementData, IAndpadprocurements } from 'types';


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

    

    // 支払い履歴に支払日を追加する
    const index = acc.orderInfo.findIndex((val) => val.supplierName === tgtSupplierName);
    const paymentAmount = 支払日.value ? +orderAmountBeforeTax.value : 0;


    if (index !== -1) {
      acc.orderInfo[index].paymentHistory = [];
    } 

    acc.orderInfo.push({
      supplierName: supplierName.value,
      orderAmountBeforeTax: +orderAmountBeforeTax.value,
      paymentHistory: [{
        paymentDate: 支払日.value,
        paymentAmountBeforeTax: paymentAmount,
      }],
    });
    
    acc.発注金額_税抜 += +orderAmountBeforeTax.value;
    acc.支払金額_税抜 += paymentAmount;

    return acc;

  }, {
    発注金額_税抜: 0,
    支払金額_税抜: 0,
    orderInfo: [],
    minDate: new Date(),
    maxDate: new Date(),
  } as ProcurementData);

  return costManagemenList;
};
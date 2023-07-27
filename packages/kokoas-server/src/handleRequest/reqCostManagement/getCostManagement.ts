import { getAndpadOrdersByAndpadProjId } from 'api-kintone/src/andpadOrders/getAndpadOrdersByAndpadProjId';


export interface CostManagement {
  supplierName: string
  orderAmountBeforeTax: number
  paymentHistory: [{
    paymentDate: string
    paymentAmountBeforeTax: number
  }]
}

/**
 * 必要なファイルを取得する
 * プロジェクトIDを渡されたら、原価管理表を生成するためのデータを取得し、
 * データを成形する(簡単な形に)
 */
export const getCostManagement = (
  andpadOrders: Awaited<ReturnType<typeof getAndpadOrdersByAndpadProjId>>,
) => {

  // 取得したデータを整形する
  console.log('andpadOrders', andpadOrders);

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

  }, {} as Record<string, CostManagement>);

  return Object.values(costManagemenList);
};

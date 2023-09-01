import { Big } from 'big.js';
import { createMonths } from './createMonths';
import { ProcurementSupplierDetails, Status } from 'types';
import { AndpadBudgetResult, Datum } from 'types/src/common/andpad.order.budget';
import parseISO from 'date-fns/parseISO';

const exemptedStates = [
  '見積依頼作成中',
  '見積作成中',
  '発注作成中',
  '発注済',
  '請負承認待ち',
];

/**
 * 月ごとの発注履歴データの変換処理
 * 
 * @param andpadBudget andpad実行予算データ (実行予算と発注実績を取得する)
 * @param andpadProcurements kintoneよりandpad (支払い情報を取得する)
 * @returns 
 */
export const convertMonthlyProcurementV3 = (
  andpadBudget: AndpadBudgetResult,
  andpadProcurements: DBAndpadprocurements.SavedData[],
) => {

  const {
    data: andpadBudgetResult,
  } = andpadBudget;

  /** 実行予算金額  */
  let totalPlannedBudgetCost = 0;
  
  /** 発注金額 */
  let totalContractOrderCost = 0; 

  /** 支払金額 */
  let totalPaidAmount = 0;

  const result: ProcurementSupplierDetails[] = [];

  let maxPaymentDate = '';
  let minPaymentDate = '';


  const traverseData = (datas: Datum[]) => {
    datas?.forEach((data) => {
 
      for (const item of data.planned_budget_items) {
        const {
          contract_order_item: contractItem,
        } = item;

        let supplierName = item.contract_name || `(${item.name})`;

        /************
         * 実行予算情報
         ************/
        const plannedBudgetCost = Big(item.quantity)
          .mul(item.unit_cost)
          .toNumber();
        totalPlannedBudgetCost += plannedBudgetCost;

        /***************
         * 発注実績情報
         ***************/
        let contractOrderCost  = 0;
        if (contractItem) {
          // 発注実績がある場合
          supplierName = contractItem.contract_name;
          contractOrderCost = contractItem.cost_price;
          totalContractOrderCost += contractOrderCost;
        } 


        const existingSupplierIdx = result.findIndex((supplier) => supplier.supplierName === supplierName);
        

        if (existingSupplierIdx !== -1) {
          
          // 発注先ごとの発注金額・予算金額を更新する
          result[existingSupplierIdx].contractOrderCost += contractOrderCost;
          result[existingSupplierIdx].plannedBudgetCost += plannedBudgetCost;

          // 発注先ごとの未払い金額を更新する
          result[existingSupplierIdx].totalUnpaidAmount = Big(result[existingSupplierIdx].contractOrderCost)
            .minus(result[existingSupplierIdx].totalPaidAmount ?? 0)
            .toNumber();

        } else {

          // 発注先は配列に存在しない場合、初期化して、支払い情報を取得する
          result.push({
            supplierName: supplierName,
            contractOrderCost: contractOrderCost,
            plannedBudgetCost: plannedBudgetCost,
            totalPaidAmount: 0,
            totalUnpaidAmount: 0,
            paymentHistory: [],
          });
          const parsedIdx = existingSupplierIdx !== -1 ? existingSupplierIdx : result.length - 1;

          /**************
           * 支払い取得
           *************/
          
          // 発注先名が一致する発注実績を格納する

          for (const procurement of andpadProcurements) {

            // 発注先名が一致する発注実績を格納する
            if (procurement.supplierName.value !== supplierName) continue;

            // 発注状況が集計対象外の物は除外する
            if (exemptedStates.includes(procurement.orderStatus.value)) {
              continue;
            }

            const orderAmountBeforeTax = +procurement.orderAmountBeforeTax.value;

            // 発注先ごとの支払い済み金額・未払い金額を更新する
            const paidAmount = Big(result[parsedIdx].totalPaidAmount ?? 0)
              .plus(orderAmountBeforeTax)
              .toNumber();

            result[parsedIdx].totalPaidAmount = paidAmount;

            // 支払日の設定が無い場合は実績に反映しない
            if (!procurement.支払日.value) continue; 

            // 支払日の最大値・最小値を更新する
            const paymentDateISO = parseISO(procurement.支払日.value).toISOString();
            
            if (paymentDateISO > maxPaymentDate || maxPaymentDate === '') {
              maxPaymentDate = paymentDateISO;
            }
            if (paymentDateISO < minPaymentDate || minPaymentDate === '') {
              minPaymentDate = paymentDateISO;
            }

            // 支払い履歴の更新
            result[parsedIdx].paymentHistory.push({
              paymentAmtBeforeTax: orderAmountBeforeTax,
              state: procurement.orderStatus.value as Status,
              paymentDate: paymentDateISO,
            }); 
          }
          
          // 全体の支払い済み金額・未払い金額を更新する
          totalPaidAmount = Big(result[parsedIdx].totalPaidAmount ?? 0)
            .plus(totalPaidAmount)
            .toNumber();
        }


        
      }

      for (const childData of data.child_planned_budget_groups) {
        traverseData(childData.child_planned_budget_groups);
      }
    });
  };


  // execute group traversal
  traverseData(andpadBudgetResult);

  // monthsの作成
  const months = createMonths({
    minPaymentISODate: minPaymentDate,
    maxPaymentISODate: maxPaymentDate,
  });

  return {
    result,
    months,
    totalContractOrderCost,
    totalPlannedBudgetCost,
    totalPaidAmount,
    maxPaymentDate,
    minPaymentDate,
  };
};
import { AndpadProcurementMonthly, Group, ProcurementSupplierDetails, Status } from 'types';
import { createMonths } from './createMonths';
import { format, parseISO } from 'date-fns';


/**
 * 月ごとの発注履歴データの変換処理
 * @param andpadBudgetExecution andpad推移表データ
 * @param andpadProcurements kintoneよりandpad発注一覧
 * @returns 
 * 
 * @deprecated replaced with convertMonthlyProcurementV3
 */
export const convertMonthlyProcurementV2 = (
  andpadBudgetExecution: AndpadProcurementMonthly,
  andpadProcurements: DBAndpadprocurements.SavedData[],
) => {

  const {
    data: {
      groups,
      // months,
    },
  } = andpadBudgetExecution;

  const {
    total_contract_order_cost: totalPlannedBudgetCost, // 発注金額を発注原価として扱います
    // total_planned_budget_cost: totalPlannedBudgetCost,
  } = groups;

  let totalContractOrderCost = 0;

  const result: ProcurementSupplierDetails[] = [];
  let maxPaymentDate = '';
  let minPaymentDate = '';

  // Each Group has contracts and children props
  // supplierName and months (payment history) is inside contracts 
  // while children contains Groups
  // Refer to ./../__TEST__/monthly.json for the data structure ~ras 20230816
  const traverseGroup = (group: Group) => {

    for (const contract of group.contracts) {

      const existingSupplier = result.findIndex((supplier) => supplier.supplierName === contract.name);


      if (existingSupplier !== -1) {
        // 実績ベースの支払額を反映する
        // result[existingSupplier].contractOrderCost += contract.items_total_contract_order_cost;
        result[existingSupplier].plannedBudgetCost += contract.items_total_contract_order_cost;
      } else {
        result.push({
          supplierName: contract.name,
          contractOrderCost: 0,
          plannedBudgetCost: contract.items_total_contract_order_cost || 0,
          paymentHistory: [],
        });

        // paymentHistoryの更新
        const parsedIdx = existingSupplier !== -1 ? existingSupplier : result.length - 1;
        let supplierPlannedBudgetCost = 0;

        for (const procurement of andpadProcurements) {
          // 発注先名が一致する発注実績を格納する
          if (procurement.supplierName.value !== contract.name) continue;

          console.log('発注状況', procurement.orderStatus.value);
          // 発注状況が集計対象外の物は除外する
          if ((procurement.orderStatus.value === '見積依頼作成中') ||
            (procurement.orderStatus.value === '見積作成中') ||
            (procurement.orderStatus.value === '発注作成中') ||
            (procurement.orderStatus.value === '発注済') ||
            (procurement.orderStatus.value === '請負承認待ち')) continue;

          const paymentDate = procurement.支払日.value ? parseISO(procurement.支払日.value) : '';
          const parsedDate = paymentDate !== '' ? format(paymentDate, 'yyyyMM') : '';

          if (parsedDate === '') continue; // 支払日の設定が無い場合は実績に反映しない

          const orderAmountBeforeTax = +procurement.orderAmountBeforeTax.value;
          result[parsedIdx].paymentHistory.push({
            paymentAmtBeforeTax: orderAmountBeforeTax,
            state: procurement.orderStatus.value as Status,
            paymentDate: parsedDate,
          });
          totalContractOrderCost += orderAmountBeforeTax;
          supplierPlannedBudgetCost += orderAmountBeforeTax;

          if (parsedDate > maxPaymentDate || maxPaymentDate === '') {
            maxPaymentDate = parsedDate;
          }
          if (parsedDate < minPaymentDate || minPaymentDate === '') {
            minPaymentDate = parsedDate;
          }
        }

        // 発注先ごとの発注金額を反映する
        result[parsedIdx].contractOrderCost = supplierPlannedBudgetCost;
      }
    }

    // Traverse child groups
    for (const childGroup of group.children) {
      console.log('traversing child group');
      traverseGroup(childGroup);
    }
  };


  // execute group traversal
  traverseGroup(groups);

  console.log(JSON.stringify(result, null, 2));

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
    maxPaymentDate,
    minPaymentDate,
  };
};
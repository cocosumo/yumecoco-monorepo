import { AndpadProcurementMonthly, Group, ProcurementSupplierDetails } from 'types';
import { createMonths } from './createMonths';
import { format, parseISO } from 'date-fns';


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
    total_contract_order_cost: totalContractOrderCost,
    // total_planned_budget_cost: totalPlannedBudgetCost,
  } = groups;

  let totalPlannedBudgetCost = 0;

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

          const paymentDate = procurement.支払日.value ? parseISO(procurement.支払日.value) : '';
          const parsedDate = paymentDate !== '' ? format(paymentDate, 'yyyyMM') : '';

          if (parsedDate === '') continue; // 支払日の設定が無い場合は実績に反映しない

          const orderAmountBeforeTax = +procurement.orderAmountBeforeTax.value;
          result[parsedIdx].paymentHistory.push({
            paymentAmtBeforeTax: orderAmountBeforeTax,
            paymentDate: parsedDate,
          });
          totalPlannedBudgetCost += orderAmountBeforeTax;
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
  const months = createMonths(maxPaymentDate, minPaymentDate);

  return {
    result,
    months,
    totalContractOrderCost,
    totalPlannedBudgetCost,
    maxPaymentDate,
    minPaymentDate,
  };
};
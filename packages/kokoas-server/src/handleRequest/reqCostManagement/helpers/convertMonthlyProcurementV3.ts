import { Big } from 'big.js';
import { createMonths } from './createMonths';
import { ProcurementSupplierDetails } from 'types';
import { AndpadBudgetResult, Datum } from 'types/src/common/andpad.order.budget';
import parseISO from 'date-fns/parseISO';


/**
 * 月ごとの発注履歴データの変換処理
 * @param andpadBudget andpad実行予算データ
 * @param andpadProcurements kintoneよりandpad発注一覧
 * @returns 
 */
export const convertMonthlyProcurementV3 = (
  andpadBudget: AndpadBudgetResult,
  andpadProcurements: DBAndpadprocurements.SavedData[],
) => {

  const {
    data: andpadBudgetResult,
  } = andpadBudget;

  let totalPlannedBudgetCost = 0; // 発注金額
  let totalContractOrderCost = 0; // 支払金額

  const result: ProcurementSupplierDetails[] = [];

  let maxPaymentDate = '';
  let minPaymentDate = '';


  const traverseData = (datas: Datum[]) => {
    datas.forEach((data) => {
 
      for (const item of data.planned_budget_items) {
        console.log('item', item);
        // 予算情報
        let budgetItem = {
          supplierName: item.contract_name ? item.contract_name : `(${item.name})`, // 予算発注先が無い場合は部材名
          contractOrderCost: 0,
          plannedBudgetCost: Big(item.unit_cost).mul(+item.quantity)
            .toNumber(),
        };

        const contractItem = item.contract_order_item;
        const estimateItem = item.planned_budget_estimate_item;
        if (contractItem) {
          // 発注実績がある場合
          budgetItem = {
            supplierName: contractItem.contract_name,
            contractOrderCost: contractItem.cost_price,
            plannedBudgetCost: contractItem.cost_price,
          };
        } else if (estimateItem) {
          // 見積情報がある場合
          budgetItem = {
            ...budgetItem,
            contractOrderCost: 0,
            plannedBudgetCost: estimateItem.cost_price ?? 0,
          };
        }
        totalPlannedBudgetCost += budgetItem.plannedBudgetCost;

        const existingSupplier = result.findIndex((supplier) => supplier.supplierName === budgetItem.supplierName);

        console.log('Existing Supplier', existingSupplier);
        if (existingSupplier !== -1) {


          
          // 実績ベースの支払額を反映する
          result[existingSupplier].contractOrderCost += budgetItem.contractOrderCost;
          result[existingSupplier].plannedBudgetCost += budgetItem.plannedBudgetCost;

          // 発注先ごとの支払い済み金額・未払い金額を更新する
          result[existingSupplier].totalUnpaidAmount = Big(result[existingSupplier].contractOrderCost)
            .minus(result[existingSupplier].totalPaidAmount ?? 0)
            .toNumber();

          console.log('partialResult', result);
        } else {
          result.push({
            supplierName: budgetItem.supplierName,
            contractOrderCost: budgetItem.contractOrderCost,
            plannedBudgetCost: budgetItem.plannedBudgetCost,
            totalPaidAmount: 0,
            totalUnpaidAmount: 0,
            paymentHistory: [],
          });

          // paymentHistoryの更新
          const parsedIdx = existingSupplier !== -1 ? existingSupplier : result.length - 1;

          for (const procurement of andpadProcurements) {
            // 発注先名が一致する発注実績を格納する
            if (procurement.supplierName.value !== budgetItem.supplierName) continue;

            console.log('procurement', procurement);

            // 発注状態に関係なく、 最大・最小支払日の更新
            const paymentDateISO = parseISO(procurement.支払日.value).toISOString();
            if (paymentDateISO > maxPaymentDate || maxPaymentDate === '') {
              maxPaymentDate = paymentDateISO;
            }
            if (paymentDateISO < minPaymentDate || minPaymentDate === '') {
              minPaymentDate = paymentDateISO;
            }
           
            // 発注状況が集計対象外の物は除外する
            if ([
              '見積依頼作成中',
              '見積作成中',
              '発注作成中',
              '発注済',
              '請負承認待ち',
            ].includes(procurement.orderStatus.value)) {
              continue;
            }

            // const parsedDate = paymentDate !== '' ? format(paymentDate, 'yyyyMM') : '';

            if (!paymentDateISO) continue; // 支払日の設定が無い場合は実績に反映しない

            const orderAmountBeforeTax = +procurement.orderAmountBeforeTax.value;

            // 発注先ごとの支払い済み金額・未払い金額を更新する
            const totalpaidAmount = Big(result[parsedIdx].totalPaidAmount ?? 0).plus(orderAmountBeforeTax)
              .toNumber();
            result[parsedIdx].totalPaidAmount = totalpaidAmount;
            result[parsedIdx].totalUnpaidAmount = Big(result[parsedIdx].contractOrderCost).minus(totalpaidAmount)
              .toNumber();

            // 支払い履歴の更新
            result[parsedIdx].paymentHistory.push({
              paymentAmtBeforeTax: orderAmountBeforeTax,
              paymentDate: paymentDateISO,
            });
            totalContractOrderCost += orderAmountBeforeTax;

            if (paymentDateISO > maxPaymentDate || maxPaymentDate === '') {
              maxPaymentDate = paymentDateISO;
            }
            if (paymentDateISO < minPaymentDate || minPaymentDate === '') {
              minPaymentDate = paymentDateISO;
            }
          }
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
    maxPaymentDate,
    minPaymentDate,
  };
};
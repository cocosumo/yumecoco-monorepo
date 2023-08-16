import parse from 'date-fns/parse';
import { AndpadProcurementMonthly, Group, ProcurementDetails } from 'types';


export const convertMonthlyProcurement = (
  monthlyProcurement: AndpadProcurementMonthly, 
) => {

  const {
    data: {
      groups,
      months, 
    },
  } = monthlyProcurement;

  const {
    total_contract_order_cost: totalContractOrderCost,
    total_planned_budget_cost: totalPlannedBudgetCost,
  } = groups;

  const result : ProcurementDetails = {};

  // Each Group has contracts and children props
  // supplierName and months (payment history) is inside contracts 
  // while children contains Groups
  // Refer to ./../__TEST__/monthly.json for the data structure ~ras 20230816
  const traverseGroup = (group: Group) => {

    for (const contract of group.contracts) {

      if (!result[contract.name]) {
        result[contract.name] = {
          contractOrderCost: contract.items_total_contract_order_cost || 0,
          plannedBudgetCost: contract.items_total_planned_budget_cost || 0,
          paymentHistory: [],
        };

      } else {
        result[contract.name].contractOrderCost += contract.items_total_contract_order_cost;
        result[contract.name].plannedBudgetCost += contract.items_total_planned_budget_cost;

      }

      for (const gMonth of contract.months) {

        let parsedDate = gMonth.month;

        if (parsedDate === 'total') continue;

        if (/^[0-9]+$/.test(parsedDate)) {
          parsedDate = parse(gMonth.month, 'yyyyMM', new Date()).toISOString();
        }

        result[contract.name].paymentHistory.push({
          paymentAmtBeforeTax: gMonth.price,
          paymentDate: parsedDate,
        }); 
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

  // get max and min payment date from months where the format of the date is yyyyMM and unknown

  const { maxPaymentDate, minPaymentDate } = months.reduce((acc, month) => {
    if (/^[0-9]+$/.test(month)) {
      const parsedDate = parse(month, 'yyyyMM', new Date()).toISOString();
      if (parsedDate > acc.maxPaymentDate) {
        acc.maxPaymentDate = parsedDate;
      }
      if (parsedDate < acc.minPaymentDate) {
        acc.minPaymentDate = parsedDate;
      }
    }
    return acc;
  }, {
    maxPaymentDate: '',
    minPaymentDate: '',
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
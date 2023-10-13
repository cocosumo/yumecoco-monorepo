import { AndpadBudgetResult } from 'types/src/common/andpad.order.budget';
import { getDataByUrl } from './getDataByUrl';

export const getBudgetBySystemId = async (systemId: string | number) => {
  if (!systemId) {
    return null;
  }
  const endpoint = `https://api.andpad.jp/manager/v2/orders/${systemId}/planned_budget/planned_budget_groups`;
  
  return getDataByUrl<AndpadBudgetResult>(endpoint);

};
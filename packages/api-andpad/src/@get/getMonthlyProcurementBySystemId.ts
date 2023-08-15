import { AndpadProcurementMonthly } from 'types';
import { getDataByUrl } from './getDataByUrl';


export const getMonthlyProcurementBySystemId = async (systemId: string | number) => {
  
  const endpoint = `https://api.andpad.jp/manager/v2/orders/${systemId}/payments/contract_orders/monthly`;
  
  return getDataByUrl<AndpadProcurementMonthly>(endpoint);
};
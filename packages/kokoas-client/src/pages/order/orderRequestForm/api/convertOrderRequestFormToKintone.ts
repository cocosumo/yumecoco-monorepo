import { TOrderForm } from '../schema';
import { convertOrderInfoToKintone } from './convertOrderInfoToKintone';
import { convertOrderItemsToKintone } from './convertOrderItemsToKintone';

export const convertOrderRequestFormToKintone = async (data: TOrderForm) => {
  
  const convertedOrderInfo = convertOrderInfoToKintone(data);
  const convertedOrderItems = await convertOrderItemsToKintone(data);

  return {
    convertedOrderInfo,
    convertedOrderItems,
  };

};
import { IOrderbudget } from 'types';
import { TOrderItem } from '../schema';

export interface ConvertOrderBudgetItemToFormParams {
  orderBudgetData: IOrderbudget;
  orderId: string;
} 

export const convertOrderBudgetItemsToForm = ({
  orderBudgetData,
  orderId,
}: ConvertOrderBudgetItemToFormParams) => {

  const {
    items,
  } = orderBudgetData;

  return items.value.reduce<TOrderItem[]>(
    (acc, item) => {
      if (item.value.orderId.value === orderId) {
        acc.push({
          itemId: item.id,
          majorItem: item.value.majorItem.value,
          middleItem: item.value.middleItem.value,
          material: item.value.material.value,
          quantity: Number(item.value.quantity.value),
          unit: item.value.unit.value,
          costPrice: Number(item.value.costPrice.value),
          rowCostPriceBeforeTax: Number(item.value.orderAmountBeforeTax.value),
          taxRate: Number(item.value.taxRate.value),
          orderDataId: item.value.orderDataId.value,
          rowRemarks: item.value.rowRemarks.value,
          selected: false,
        });
      } 
      

      return acc;
    }, 
    [],
  );
  
};
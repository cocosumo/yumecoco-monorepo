import { TOrderForm } from '../schema';
import { getOrderBudgetById } from 'api-kintone/src/orderBudget/getOrderBudgetById';
import { produce } from 'immer';
import { IOrderbudget } from 'types';


/**
 * 発注品目DB形に変換する。
 */
export const convertOrderItemsToKintone = async (data: TOrderForm, orderId: string) => {
  const {
    selectedItems,
  } = data;

  // Get the latest items from the order budget to avoid losing existing data.
  const { items: latestItems } = await getOrderBudgetById(data.projId); 

  const newItems = produce(latestItems, draft => {
    draft.value.forEach((draftItem) => {
      // Clear the value of the draft item to avoid update of unrelated items
      draftItem.value = Object.create(null);
    });

    selectedItems.forEach(item => {
      const rowId = item.itemId;
      const matchedItem = draft.value.find(d => d.id === rowId);
      if (matchedItem) {
        // fill in the matching item with the new data from the form
        matchedItem.value = {
          ...matchedItem.value,
          orderId: { value: orderId },
          majorItem: { value: item.majorItem },
          middleItem: { value: String(item.middleItem) },
          material: { value: String(item.material) },
          quantity: { value: String(item.quantity) },
          unit: { value: item.unit },
          costPrice: { value: String(item.costPrice) },
          orderAmountBeforeTax: { value: String(item.rowCostPriceBeforeTax) },
          taxRate: { value: String(item.taxRate) },
          rowRemarks: { value: String(item.rowRemarks) },
          
        };
      }
    });
  });


  const kintoneRecord: Partial<IOrderbudget> = {
    items: newItems,
  };

  return kintoneRecord;
};
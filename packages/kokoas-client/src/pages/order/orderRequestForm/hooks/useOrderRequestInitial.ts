import { useEffect, useState } from 'react';
import { TOrderForm, initialOrderForm } from '../schema';
import { useAtomValue } from 'jotai';
import { orderRequestAtom } from '../OrderRequestDialog';
import { useOrderBudgetById, useOrderById } from 'kokoas-client/src/hooksQuery';
import { convertOrderToForm } from '../api/convertOrderToForm';
import { convertOrderBudgetItemsToForm } from '../api/convertOrderBudgetItemsToForm';

export const useOrderRequestInitial = () => {
  const {
    orderId,
    projId,
    projName,
    selectedItems,
    storeName,
  }  = useAtomValue(orderRequestAtom);
  
  const [initialValues, setInitialValues] = useState<TOrderForm>(initialOrderForm);

  const { 
    data: orderData, 
    isFetching: isFetchingOrder, 
  } = useOrderById({ orderId });
  const { 
    data: orderBudgetData, 
    isFetching: isFetchingOrderBudget,
  } = useOrderBudgetById(projId);

  useEffect(() => {
    if (orderId && orderData && orderBudgetData) {
      const convertedOrder = convertOrderToForm(orderData);
      const convertedItems = convertOrderBudgetItemsToForm({
        orderBudgetData,
        orderId,
      });
      setInitialValues(prev => ({
        ...prev,
        ...convertedOrder,
        projId,
        projName,
        storeName,
        selectedItems: convertedItems,
      }));
    } else if (!orderId) {
      const firstMajorItem = selectedItems[0]?.majorItem;
      const isCommonMajorItem = firstMajorItem && selectedItems.every(item => item.majorItem === firstMajorItem);
    
      setInitialValues({
        ...initialOrderForm,
        projId,
        projName,
        orderName: isCommonMajorItem ? firstMajorItem : '',
        selectedItems,
        storeName,
      });
    }

  }, [orderData, orderBudgetData, selectedItems, projId, projName, storeName, orderId]);

  return {
    initialValues,
    isFetching: isFetchingOrder || isFetchingOrderBudget,
  };
};
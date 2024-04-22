import { useEffect, useState } from 'react';
import { initialInvoiceForm } from '../schema';
import { useAtomValue } from 'jotai';
import { invoiceDialogAtom } from '../InvoiceFormDialog';
import { useOrderBudgetById, useOrderById } from 'kokoas-client/src/hooksQuery';
import { convertOrderToForm } from '../api/convertOrderToForm';
import { convertOrderBudgetItemsToForm } from '../api/convertOrderBudgetItemsToForm';

export const useResolveParams = () => {
  const [initialValues, setInitialValues] = useState(initialInvoiceForm);
  const {
    orderId,
    projId,
    projName,
    storeName,
  }  = useAtomValue(invoiceDialogAtom);

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
        items: convertedItems,
      }));
    } 

  }, [orderData, orderBudgetData, projId, projName, storeName, orderId]);


  return {
    initialValues,
    isFetching: isFetchingOrder || isFetchingOrderBudget,
  };
};
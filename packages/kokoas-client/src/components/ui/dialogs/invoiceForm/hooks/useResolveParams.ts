import { useEffect, useState } from 'react';
import { initialInvoiceForm } from '../schema';
import { useAtomValue } from 'jotai';
import { invoiceDialogAtom } from '../InvoiceFormDialog';
import { useInvoiceB2BByProjId, useOrderBudgetById, useOrderById } from 'kokoas-client/src/hooksQuery';
import { convertOrderToForm } from '../api/convertOrderToForm';
import { convertOrderBudgetItemsToForm } from '../api/convertOrderBudgetItemsToForm';
import { convertInvoiceToForm } from '../api/convertInvoiceToForm';
import { IInvoiceb2b } from 'types';

export const useResolveParams = () => {
  const [initialValues, setInitialValues] = useState(initialInvoiceForm);
  const {
    orderId,
    projId,
    projName,
    storeName,
    invoiceId,
  }  = useAtomValue(invoiceDialogAtom);

  const { 
    data: orderData, 
    isFetching: isFetchingOrder, 
  } = useOrderById({ orderId });

  const { 
    data: orderBudgetData, 
    isFetching: isFetchingOrderBudget,
  } = useOrderBudgetById(projId);

  const {
    data: invoiceData,
    isFetching: isFetchingInvoice,
  } = useInvoiceB2BByProjId<IInvoiceb2b[]>({ projId });

  useEffect(() => {
    if (orderId && orderData && orderBudgetData) {

      const convertedOrder = convertOrderToForm(orderData);
      const convertedItems = convertOrderBudgetItemsToForm({
        orderBudgetData,
        orderId,
      });

      if (invoiceId && invoiceData?.length) {
        const selectedInvoiceData = invoiceData.find((data) => data.uuid.value === invoiceId);

        if (selectedInvoiceData) {
          setInitialValues(prev => ({
            ...prev,
            ...convertInvoiceToForm(selectedInvoiceData),
            ...convertedOrder,
            items: convertedItems,
          }));
        } else {
          // Retain this console.warn for now for this edge case
          console.warn('請求書は見つかりませんでした。');
          setInitialValues(prev => ({
            ...prev,
            ...convertedOrder,
            items: convertedItems,
          }));
        }


      } else if (!invoiceId && invoiceData?.length) {

        if (typeof invoiceId === 'undefined') {

          const firstInvoiceInOrder = invoiceData.find((data) => data.orderId.value === orderId);
        
          if (firstInvoiceInOrder) {
          // 発注に請求がある場合、初回請求
            setInitialValues(prev => ({
              ...prev,
              ...convertedOrder,
              ...convertInvoiceToForm(firstInvoiceInOrder),
              items: convertedItems,
            }));
          } else {
          // 発注に請求がない場合、新規請求
            setInitialValues({
              ...initialInvoiceForm,
              ...convertedOrder,
              items: convertedItems,
            });
          }
  

        } else {
          //invoiceIdがundefinedではなく、falsyの場合、新規請求

          setInitialValues({
            ...initialInvoiceForm,
            ...convertedOrder,
            items: convertedItems,
          });
        }
        


      } else {
        setInitialValues(prev => ({
          ...prev,
          ...convertedOrder,
          projId,
          projName,
          items: convertedItems,
        }));
      }
    
    } 

  }, [
    orderData, 
    orderBudgetData, 
    projId, 
    projName, 
    storeName, 
    orderId, 
    invoiceId,
    invoiceData,
  ]);

  
  return {
    initialValues,
    isFetching: isFetchingOrder || isFetchingOrderBudget || isFetchingInvoice,
  };
};
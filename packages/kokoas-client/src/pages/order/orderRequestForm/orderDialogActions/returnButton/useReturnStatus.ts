import { useSaveOrder, useSaveOrderBudget } from 'kokoas-client/src/hooksQuery';
import { useOrderFormContext } from '../../hooks/useOrderRHF';
import { getOrderBudgetById } from 'api-kintone/src/orderBudget/getOrderBudgetById';

export const useReturnStatus = () => {

  const { getValues } = useOrderFormContext();
  
  const { 
    mutateAsync: saveOrder,
    isLoading,
  } = useSaveOrder();

  const { mutateAsync: saveOrderBudget } = useSaveOrderBudget();


  const handleReturnStatus = () => {
    const orderId = getValues('orderId');
    const orderBudgetId = getValues('projId');

    if (!orderId) return;
    
    saveOrder({
      recordId: orderId,
      record: {
        status: {
          value: '',
        },
      },
    })
      .then(() => getOrderBudgetById(orderBudgetId))
      .then(({ items }) => saveOrderBudget({
        recordId: orderBudgetId,
        record: {
          items,
        },
      }))
      .catch((e) => {
        // Error messages are already handled in the mutators,
        // but just in case, log the error for debugging.

        console.error(e);
      }); // do something with items
        
  };

  return {
    handleReturnStatus,
    isLoading,
  };
};
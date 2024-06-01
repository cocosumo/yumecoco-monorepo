import { useSaveOrder } from 'kokoas-client/src/hooksQuery';
import { useOrderFormContext } from '../../hooks/useOrderRHF';

export const useReturnStatus = () => {

  const { getValues } = useOrderFormContext();
  
  const { 
    mutate: saveOrder,
    isLoading,
  } = useSaveOrder();

  const handleReturnStatus = () => {
    const orderId = getValues('orderId');
    if (!orderId) return;
    saveOrder({
      recordId: orderId,
      record: {
        status: {
          value: '',
        },
      },
    });
  };

  return {
    handleReturnStatus,
    isLoading,
  };
};
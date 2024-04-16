import { useEffect, useState } from 'react';
import { TOrderForm, initialOrderForm } from '../schema';
import { useAtomValue } from 'jotai';
import { orderRequestAtom } from '../OrderRequestDialog';
import { useOrderById } from 'kokoas-client/src/hooksQuery';
import { convertOrderToForm } from '../api/convertOrderToForm';

export const useOrderRequestInitial = () => {
  const {
    orderId,
    projId,
    projName,
    selectedItems,
  }  = useAtomValue(orderRequestAtom);
  
  const [initialValues, setInitialValues] = useState<TOrderForm>(initialOrderForm);

  const { data } = useOrderById({ orderId });

  useEffect(() => {
    if (orderId && data) {
      const convertedOrder = convertOrderToForm(data);
      setInitialValues(prev => ({
        ...prev,
        ...convertedOrder,
        selectedItems,
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
      });
    }

  }, [data, selectedItems, projId, projName, orderId]);

  return {
    initialValues,
  };
};
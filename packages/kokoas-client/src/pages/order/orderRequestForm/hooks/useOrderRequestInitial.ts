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
    storeName,
  }  = useAtomValue(orderRequestAtom);
  
  const [initialValues, setInitialValues] = useState<TOrderForm>(initialOrderForm);

  const { data, isFetching } = useOrderById({ orderId });

  useEffect(() => {
    if (orderId && data) {
      const convertedOrder = convertOrderToForm(data);
      setInitialValues(prev => ({
        ...prev,
        ...convertedOrder,
        projId,
        projName,
        selectedItems,
        storeName,
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

  }, [data, selectedItems, projId, projName, storeName, orderId]);

  return {
    initialValues,
    isFetching,
  };
};
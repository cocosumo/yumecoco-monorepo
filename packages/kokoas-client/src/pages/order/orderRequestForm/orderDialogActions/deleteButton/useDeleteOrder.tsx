import { Alert } from '@mui/material';
import { useConfirmDialog, useSnackBar } from 'kokoas-client/src/hooks';
import { useOrderFormContext } from '../../hooks/useOrderRHF';
import { getOrderBudgetById } from 'api-kintone/src/orderBudget/getOrderBudgetById';
import { AppIds } from 'config';
import { produce } from 'immer';
import { useDeleteOrderBy$Id, useSaveOrderBudget } from 'kokoas-client/src/hooksQuery';
import { useSetAtom } from 'jotai';
import { orderRequestAtom } from '../../OrderRequestDialog';

export const useDeleteOrder = () => {

  const { getValues } = useOrderFormContext();
  const { setDialogState } = useConfirmDialog();
  const { setSnackState } = useSnackBar();
  const { mutateAsync: saveOrderBudget } = useSaveOrderBudget();
  const { mutateAsync: deleteOrder } = useDeleteOrderBy$Id();
  const setOrderDialogAtom = useSetAtom(orderRequestAtom);

  const unlinkData = async () => {
    const orderBudgetId = getValues('projId');
    const orderId = getValues('orderId');


    const { items } = await getOrderBudgetById(orderBudgetId);

    if (!items?.value.length) {
      // handle case when data been deleted in another instance, or a network error occurs during the process.
      throw new Error(`発注登録が見つかりませんでした。AppId: ${AppIds.orderBudget}, uuid: ${orderBudgetId}`);
    }

    const unlinkItems = produce(items, (draft) => {
      for (const item of draft.value) {
        if (item.value.orderId.value === orderId) {
          item.value.orderId.value = ''; // clearing the lookup field clears the link
        }
      }
    });

    return saveOrderBudget({
      recordId: orderBudgetId,
      record: {
        items: unlinkItems,
      },
    });
  };

  /**
  * 
  * 1. Unlink Order data from orderBudget items.
  * 2. Delete Order Data after unlinking.
  * 
  * There could be instances that the process are interrupted due to network error or other reasons.
  * In such cases, we may need to clean up the data.
  */
  const handleDeleteOrder = () => {
    const orderRecordId = getValues('orderRecordId');
    
    if (!orderRecordId) {
      return;
    }

    return unlinkData()
      .then(() => {
        return deleteOrder(orderRecordId);
      })
      .then(() => {
        setOrderDialogAtom((prev) => ({
          ...prev,
          open: false,
        }));
      })
      .catch((error) => {
        setSnackState({
          open: true,
          message: error.message,
          severity: 'error',
        });
        // Retain the console for debugging purposes
        console.error(error);
      });

  };

  const handleConfirmDeleteOrder = () => {
    setDialogState({
      open: true,
      title: '削除確認',
      content: (
        <Alert severity={'warning'}>
          削除するとデータは完全に消え、復元できません。削除しますか？
        </Alert>),
      handleYes: handleDeleteOrder,
    });
  };

  return {
    handleConfirmDeleteOrder,
  };
};
import { RenderCellProps } from 'react-data-grid';
import { RowItem } from '../useColumns';
import { Button } from '@mui/material';
import { useTypedFormContext } from '../../hooks/useTypedRHF';
import { useCallback } from 'react';
import { useSetAtom } from 'jotai';
import { orderRequestAtom } from '../../orderRequestForm/OrderRequestDialog';

const OrderDataId = (props: RenderCellProps<RowItem>) => {
  const { getValues } = useTypedFormContext();
  const setOrderRequestAtom = useSetAtom(orderRequestAtom); 

  const {
    row: {
      orderId,
      orderDataId,
    },
  } = props;
  

  const parsedOrderDataId = orderDataId?.replace(/-/g, '');

  const handleClick = useCallback(() => {
    const items = getValues('items');

    const selectedItems = items.filter((item) => item.orderId === orderId);

    setOrderRequestAtom({
      open: true,
      orderId: orderId,
      projId: getValues('projId'),
      projName: getValues('projName'),
      storeName: getValues('storeName'),
      selectedItems,
    });

  }, [
    orderId,
    getValues,
    setOrderRequestAtom,
  ]);

  if (!orderDataId) return null;

  return (
    <Button
      size={'small'}
      variant={'text'}
      onClick={handleClick}
      fullWidth
    >
      {parsedOrderDataId}
    </Button>
  );
};

export const renderOrderDataId = (props: RenderCellProps<RowItem>) => {
  return (
    <OrderDataId {...props} />
  );
};
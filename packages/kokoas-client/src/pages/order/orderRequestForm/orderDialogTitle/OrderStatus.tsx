import { Chip, Zoom } from '@mui/material';
import { useOrderWatch } from '../hooks/useOrderRHF';
import { TOrderForm } from '../schema';
import { statusBGcolorMap, statusFGcolorMap } from 'kokoas-client/src/lib/progressColors';
import { useOrderById } from 'kokoas-client/src/hooksQuery';
import { KProgress } from 'types/src/common/order';

export const OrderStatus = () => {
  const orderId = useOrderWatch({
    name: 'orderId',
  }) as TOrderForm['orderId'];

  const { 
    data, 
    isFetching,
  } = useOrderById({ orderId });


  const {
    status,
  } = data || {};

  const orderStatus = (orderId 
    ? status?.value || '未発注'
    : '新規') as KProgress | undefined;

  return (
    <Zoom in={!isFetching && !!orderStatus} timeout={2000}>
      <Chip 
        key={orderStatus}
        label={orderStatus}
        size={'small'}
        sx={orderStatus 
          ? {
            backgroundColor: statusBGcolorMap[orderStatus],
            color: statusFGcolorMap[orderStatus],
          }
          : undefined}
      />
    </Zoom>
  );
};
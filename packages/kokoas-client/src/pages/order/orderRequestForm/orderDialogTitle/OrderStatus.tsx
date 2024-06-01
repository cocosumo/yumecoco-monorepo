import { Chip, Zoom } from '@mui/material';
import { statusBGcolorMap, statusFGcolorMap } from 'kokoas-client/src/lib/progressColors';
import { useOrderStatus } from '../hooks/useOrderStatus';

export const OrderStatus = () => {


  const {
    isFetching,
    orderStatus,
  } = useOrderStatus();

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
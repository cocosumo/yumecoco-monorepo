import { Chip, Tooltip, Zoom } from '@mui/material';
import { useWatch } from 'react-hook-form';
import { useOrderFormContext } from '../../hooks/useOrderRHF';


export const OrderDataId = () => {
  const { control } = useOrderFormContext();
  const [
    orderId,
    orderDataId,
  ] = useWatch({
    control,
    name: [
      'orderId',
      'orderDataId',
    ],
  });

  return (
    <Zoom in={!!orderId}>
      <Tooltip 
        title={orderId} 
        placement={'top'}
      >
        <Chip 
          label={orderDataId.replace(/-/g, '')}
          size={'small'}
        />
      </Tooltip>
    </Zoom>
  );
};
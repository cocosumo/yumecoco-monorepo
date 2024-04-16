import { Chip, Zoom } from '@mui/material';
import { useWatch } from 'react-hook-form';
import { useOrderFormContext } from '../../hooks/useOrderRHF';


export const OrderDataId = () => {
  const { control } = useOrderFormContext();
  const orderDataId = useWatch({
    control,
    name: 'orderDataId',
  });

  return (
    <Zoom in={!!orderDataId}>
      <Chip 
        label={orderDataId.replace(/-/g, '')}
        size={'small'}
      />
    </Zoom>
  );
};
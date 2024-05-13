import { Chip, Tooltip, Zoom } from '@mui/material';
import { useInvoiceFormContext } from '../hooks/useInvoiceRHF';
import { useWatch } from 'react-hook-form';

export const OrderDataId = () => {
  const { control } = useInvoiceFormContext();
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
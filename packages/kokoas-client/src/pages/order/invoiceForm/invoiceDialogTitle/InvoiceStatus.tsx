import { Chip, Zoom } from '@mui/material';
import { useInvoiceWatch } from '../hooks/useInvoiceRHF';
import { TInvoiceForm } from '../schema';
import { statusBGcolorMap, statusFGcolorMap } from 'kokoas-client/src/lib/progressColors';

export const InvoiceStatus = () => {
  const invoiceStatus = useInvoiceWatch({
    name: 'invoiceStatus',
  }) as TInvoiceForm['invoiceStatus'];

  return (
    <Zoom in={!!invoiceStatus}>
      <Chip 
        key={invoiceStatus}
        label={invoiceStatus}
        size={'small'}
        sx={invoiceStatus 
          ? {
            backgroundColor: statusBGcolorMap[invoiceStatus],
            color: statusFGcolorMap[invoiceStatus],
          }
          : undefined}
      />
    </Zoom>
  
  );
};
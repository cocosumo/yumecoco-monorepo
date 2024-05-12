import { Typography } from '@mui/material';
import { useInvoiceWatch } from '../hooks/useInvoiceRHF';
import { useOrderById } from 'kokoas-client/src/hooksQuery';

export const SupplierName = () => {
  const orderId = useInvoiceWatch({
    name: 'orderId',
  }) as string;

  const { data } = useOrderById({ orderId });



  return (
    <Typography fontSize={'inherit'} component={'span'}>
      {data?.supplierName.value}
    </Typography>
  );
};
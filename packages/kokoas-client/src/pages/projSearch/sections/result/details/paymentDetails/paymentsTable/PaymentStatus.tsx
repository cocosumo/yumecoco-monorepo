import { Chip } from '@mui/material';

export const PaymentStatus = ({
  paymentStatus,
}:{
  paymentStatus: string,
}) => {

  if (!paymentStatus) return '-';

  return (
    <Chip 
      size="small"
      label={paymentStatus}
      color={paymentStatus === '確認前' ? 'default' : 'success'}
    />);
};
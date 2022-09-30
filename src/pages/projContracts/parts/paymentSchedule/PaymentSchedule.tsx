import { Stack } from '@mui/material';
import { PaymentContainer } from './PaymentContainer';
import { PaymentFields } from './PaymentFields';
import { PaymentFormActions } from './PaymentFormActions';
import { TotalPaymentAmount } from './TotalPaymentAmount';

export const PaymentSchedule = () => {
  return (
    <PaymentContainer>
      <Stack spacing={2}>
        <TotalPaymentAmount />
        <PaymentFields />
        <PaymentFormActions />
      </Stack>
    </PaymentContainer>
  );
};
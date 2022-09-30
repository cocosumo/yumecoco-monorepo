import { Stack } from '@mui/material';
import { PaymentContainer } from './PaymentContainer';
import { PaymentFields } from './PaymentFields';
import { PaymentFormActions } from './PaymentFormActions';
import { TotalPaymentAmount } from './TotalPaymentAmount';

export const PaymentSchedule = ({
  totalAmount,
}: {
  totalAmount : number
}) => {
  return (
    <PaymentContainer>
      <Stack spacing={2}>
        <TotalPaymentAmount totalAmount={totalAmount} />
        <PaymentFields />
        <PaymentFormActions />
      </Stack>
    </PaymentContainer>
  );
};
import { Stack } from '@mui/material';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../form';
import { PaymentContainer } from './PaymentContainer';
import { PaymentFields } from './PaymentFields';
import { PaymentFormActions } from './PaymentFormActions';
import { TotalPaymentAmount } from './TotalPaymentAmount';

export const PaymentSchedule = ({
  totalAmount = 0,
}: {
  totalAmount?: number
}) => {
  const { values } = useFormikContext<TypeOfForm>();
  const { paymentFields } = values; 

  const remainingAmount = paymentFields
    .reduce((acc, { amount }) => acc - +amount, totalAmount);

  return (
    <PaymentContainer>
      <Stack spacing={2}>
        <TotalPaymentAmount totalAmount={totalAmount} />
        <PaymentFields 
          remainingAmount={remainingAmount}
        />
        <PaymentFormActions />
      </Stack>
    </PaymentContainer>
  );
};
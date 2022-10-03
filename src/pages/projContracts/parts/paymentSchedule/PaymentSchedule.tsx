import { Stack } from '@mui/material';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../form';
import { RefundFieldGroup } from './RefundFieldGroup';
import { PaymentContainer } from './PaymentContainer';
import { PaymentFields } from './PaymentFields';
import { PaymentFormActions } from './PaymentFormActions';
import { RemainingAmountInfo } from './RemainingAmountInfo';
import { TotalPaymentAmount } from './TotalPaymentAmount';
import { useEffect } from 'react';

export const PaymentSchedule = ({
  totalAmount = 0,
}: {
  totalAmount?: number
}) => {
  const { values, setValues } = useFormikContext<TypeOfForm>();
  const { paymentFields } = values; 

  const remainingAmount = paymentFields
    .reduce((acc, { amount }) => acc - +amount, totalAmount);

  useEffect(()=>{
    setValues((prev) => ({ ...prev, remainingAmt: remainingAmount }));
  }, [remainingAmount, setValues]);

  return (
    <PaymentContainer>
      <Stack spacing={2}>

        <TotalPaymentAmount totalAmount={totalAmount} />
     
        <PaymentFields />

        <RemainingAmountInfo />

        <RefundFieldGroup />

        <PaymentFormActions />

      </Stack>
    </PaymentContainer>
  );
};
import { Stack } from '@mui/material';
import { RefundFieldGroup } from './RefundFieldGroup';
import { PaymentContainer } from './PaymentContainer';
import { PaymentFields } from './PaymentFields';
import { RemainingAmountInfo } from './RemainingAmountInfo';
import { TotalPaymentAmount } from './TotalPaymentAmount';
import { PaymentMethod } from './PaymentMethod';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../form';
import { SubsidyFieldGroup } from './SubsidyFieldGroup';


export const PaymentSchedule = ({
  totalAmount = 0,
}: {
  totalAmount?: number
}) => {

  const { values } = useFormikContext<TypeOfForm>();
  const { envelopeStatus } = values;

  const isDisabled = !!envelopeStatus;


  return (
    <PaymentContainer>
      <Stack spacing={2}>

        <TotalPaymentAmount totalAmount={totalAmount} />

        <RemainingAmountInfo disabled={isDisabled} />

        <PaymentFields disabled={isDisabled} />

        <RefundFieldGroup disabled={isDisabled} />

        <SubsidyFieldGroup disabled={isDisabled} />

        <PaymentMethod disabled={isDisabled} />

      </Stack>
    </PaymentContainer>
  );
};
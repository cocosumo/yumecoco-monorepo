import {  FormHelperText, Stack } from '@mui/material';
import { RefundFieldGroup } from './RefundFieldGroup';
import { PaymentContainer } from './PaymentContainer';
import { PaymentFields } from './PaymentFields';
import { RemainingAmountInfo } from './RemainingAmountInfo';
import { TotalPaymentAmount } from './TotalPaymentAmount';
import { PaymentMethod } from './PaymentMethod';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../form';
import { SubsidyFieldGroup } from './SubsidyFieldGroup';
import { blue } from '@mui/material/colors';


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
      <Stack spacing={2} alignItems={'center'} >

        <TotalPaymentAmount totalAmount={totalAmount} />

        <RemainingAmountInfo disabled={isDisabled} />

        <PaymentFields disabled={isDisabled} />
    
        <Stack bgcolor={blue[50]} 
          borderRadius={5} p={2}
          width={'100%'}
          mx={'auto'}
        >
          <RefundFieldGroup  />

          <SubsidyFieldGroup />
          <FormHelperText sx={{
            alignSelf: 'flex-end',
          }}
          >
            ※契約書には反映されません。
          </FormHelperText>

        </Stack>

        <PaymentMethod disabled={isDisabled} />
    

      </Stack>
    </PaymentContainer>
  );
};
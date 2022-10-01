import {  Stack } from '@mui/material';
import { FieldArray } from 'formik';
import { KeyOfForm, paymentLabels, TypeOfForm } from '../../form';
import { PaymentFieldGroup } from './PaymentFieldGroup';


export const PaymentFields = (
  {
    totalAmount,
  } : {
    totalAmount: number
  },
) => {

  const payFieldName: KeyOfForm = 'paymentFields';

  return (
    <Stack justifyContent={'center'} spacing={2}>
      <FieldArray
        name={payFieldName}
        render={({ form : { values } }) => {
          const { paymentFields } = values as TypeOfForm;

          const remainingAmt = paymentFields
            .reduce((acc, { amount }) => acc - +amount, totalAmount);

          return paymentLabels
            .map((label, idx) => (
              <PaymentFieldGroup 
                key={label} 
                label={label}
                remainingAmt={remainingAmt}
                idx={idx}
              />
            ));
        }}
      />
    </Stack>
  );
};
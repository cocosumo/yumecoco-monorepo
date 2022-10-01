import {  Stack } from '@mui/material';
import { FieldArray } from 'formik';
import { KeyOfForm, paymentLabels, TypeOfForm } from '../../form';
import { PaymentFieldGroup } from './PaymentFieldGroup';


export const PaymentFields = (
  {
    remainingAmount,
  } : {
    remainingAmount: number
  },
) => {

  const payFieldName: KeyOfForm = 'paymentFields';

  return (
    <Stack justifyContent={'center'} spacing={2}>
      <FieldArray
        name={payFieldName}
        render={() => {

          return paymentLabels
            .map((label, idx) => (
              <PaymentFieldGroup 
                key={label} 
                label={label}
                remainingAmt={remainingAmount}
                idx={idx}
              />
            ));
        }}
      />
    </Stack>
  );
};
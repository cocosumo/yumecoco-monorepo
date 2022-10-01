import {  Checkbox, FormControlLabel, Stack } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import { produce } from 'immer';
import { ComponentProps } from 'react';
import { getPayFieldNameByIdx, TPaymentLabels, TypeOfForm } from '../../form';
import { PaymentFieldAmt } from './PaymentFieldAmt';
import { PaymentFieldDate } from './PaymentFieldDate';

export const PaymentFieldGroup = (
  {
    label,
    remainingAmt,
    idx,
  } : {
    label: TPaymentLabels,
    remainingAmt: number,
    idx: number
  },

) => {
  const { setValues } = useFormikContext<TypeOfForm>();
  const [chkField] = useField(getPayFieldNameByIdx('checked', idx));

  const { value: chkValue } = chkField;

  const handleChange: ComponentProps<typeof Checkbox>['onChange'] = (_, checked) => {

    setValues((prev) =>  produce(prev, ({ paymentFields: pF }) => {
      pF[idx].amount = checked ? remainingAmt : 0;
      pF[idx].checked = checked;
    }));
    
  };

  return (
    <Stack direction={'row'} spacing={1}>
      <FormControlLabel
        label={label}
        control={(
          <Checkbox
            onChange={handleChange}
            checked={chkValue}
            sx={{
              transform: 'scale(1.5)',
            }}
          />)}
      />
      <PaymentFieldAmt 
        disabled={!chkValue}
        idx={idx}
      />
      <PaymentFieldDate idx={idx} disabled={!chkValue} />
    </Stack>
  );
};
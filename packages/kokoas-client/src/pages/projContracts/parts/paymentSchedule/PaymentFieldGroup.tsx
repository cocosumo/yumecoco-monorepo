import { Checkbox, FormControlLabel, Stack } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import { produce } from 'immer';
import { ComponentProps } from 'react';
import { getPayFieldNameByIdx, TPaymentLabels, TypeOfForm } from '../../form';
import { PaymentFieldAmt } from './PaymentFieldAmt';
import { PaymentFieldDate } from './PaymentFieldDate';

export const PaymentFieldGroup = (
  {
    label,
    idx,
    disabled = false,
  }: {
    label: TPaymentLabels,
    idx: number
    disabled?: boolean
  },

) => {
  const { setValues, values } = useFormikContext<TypeOfForm>();
  const [chkField] = useField(getPayFieldNameByIdx('checked', idx));
  const { remainingAmt } = values;
  const { value: chkValue } = chkField;

  const handleChange: ComponentProps<typeof Checkbox>['onChange'] = (_, checked) => {

    setValues((prev) => {
      const newState = produce(prev, (draft) => {

        const { totalAmount, paymentFields: pF } = draft;

        pF[idx].amount = checked ? remainingAmt || 0 : 0;
        pF[idx].checked = checked;

        draft.remainingAmt = pF.reduce((acc, { amount }) => acc - +amount, totalAmount);
      });

      return newState;
    });


  };

  return (
    <Stack direction={'row'} spacing={1}>
      <FormControlLabel
        label={label}
        control={(
          <Checkbox
            onChange={handleChange}
            checked={!!chkValue}
            sx={{
              transform: 'scale(1.5)',
            }}
            disabled={disabled}
          />)}
      />
      <PaymentFieldAmt
        disabled={!chkValue || disabled}
        idx={idx}
      />
      <PaymentFieldDate idx={idx} disabled={!chkValue || disabled} />
    </Stack>
  );
};
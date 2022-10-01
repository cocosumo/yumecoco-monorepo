import { FormControl, Stack } from '@mui/material';
import { useField } from 'formik';
import { getPayFieldName, TPaymentLabels } from '../../form';
import { PaymentFieldAmt } from './PaymentFieldAmt';
import { PaymentFieldChk } from './PaymentFieldChk';
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

  const [chkField] = useField(getPayFieldName('checked', idx));

  const { value: chkValue } = chkField;


  return (

    <FormControl>
      <Stack direction={'row'} spacing={1}>
        <PaymentFieldChk 
          idx={idx} 
          label={label} 
          remainingAmt={remainingAmt}
        />
        <PaymentFieldAmt 
          disabled={!chkValue}
          idx={idx}
        />
        <PaymentFieldDate idx={idx} disabled={!chkValue} />
      </Stack>
    </FormControl>


  );
};
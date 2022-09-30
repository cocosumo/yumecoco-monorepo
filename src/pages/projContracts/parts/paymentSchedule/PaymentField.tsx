import { FormControl, Stack } from '@mui/material';
import { useField } from 'formik';
import { PaymentFieldAmt } from './PaymentFieldAmt';
import { PaymentFieldChk } from './PaymentFieldChk';
import { PaymentFieldDate } from './PaymentFieldDate';


export const PaymentField = (
  {
    name,
    label,
  } : {
    name: 'keiyakukin' | 'chakushukin' | 'chuukankin' | 'saishuukin',
    label: string
  },

) => {

  const [chkField] = useField(`${name}_chk`);
  const { value: chkValue } = chkField;


  return (

    <FormControl>
      <Stack direction={'row'} spacing={1}>
        <PaymentFieldChk name={name} label={label} />
        <PaymentFieldAmt name={name} disabled={!chkValue} />
        <PaymentFieldDate name={name} disabled={!chkValue} />
      </Stack>
    </FormControl>


  );
};
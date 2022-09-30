import {  Stack } from '@mui/material';
import { PaymentField } from './PaymentField';


export const PaymentFields = () => {
  return (
    <Stack justifyContent={'center'} spacing={2}>

      <PaymentField name={'keiyakukin'} label={'契約金'} />
      <PaymentField name={'chakushukin'} label={'着手金'} />
      <PaymentField name={'chuukankin'} label={'中間金'} />
      <PaymentField name={'saishuukin'} label={'最終金'} />

    </Stack>
  );
};
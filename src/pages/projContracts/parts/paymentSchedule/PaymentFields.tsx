import {  Stack } from '@mui/material';
import { PaymentField } from './PaymentField';


export const PaymentFields = () => {
  return (
    <Stack justifyContent={'center'} spacing={0}>

      <PaymentField />
      <PaymentField />
      <PaymentField />
      <PaymentField />

    </Stack>
  );
};
import { Stack, Typography } from '@mui/material';
import { ICustomers } from 'types';
import { Customer } from './Customer';

export const Customers = ({
  customers,
}:{
  customers: ICustomers[]
}) => {
  return ( 
    <Stack 
      spacing={1}
    >
      <Typography variant='h6' color={'GrayText'}>
        顧客情報
      </Typography>

      {customers.map((customer) => (
        <Customer key={customer.uuid.value} customer={customer} />
      ))}

    </Stack>
  );
};
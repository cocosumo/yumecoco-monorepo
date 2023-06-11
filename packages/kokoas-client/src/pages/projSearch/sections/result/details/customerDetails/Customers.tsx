import { Stack } from '@mui/material';
import { ICustomers } from 'types';
import { Customer } from './Customer';
import { DetailSectionTitle } from '../common';

export const Customers = ({
  customers,
}:{
  customers: ICustomers[]
}) => {
  return ( 
    <Stack 
      spacing={1}
    >
      <DetailSectionTitle>
        顧客情報
      </DetailSectionTitle>

      {customers.map((customer) => (
        <Customer key={customer.uuid.value} customer={customer} />
      ))}

    </Stack>
  );
};
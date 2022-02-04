import { Stack, Divider, Typography, Button } from '@mui/material';
import CustomerRegistrationForm from './CustomerRegistrationForm';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import React, { useContext } from 'react';
import CustomerFormContext from '../../context/CustomerFormContext';

interface CRFProps {
  index: string | number,
}

/* Form for every customer instance */
const CustomerRegistrationFormInstance: React.FC<CRFProps> = ({ index }) => {
  const isLinkedCustomer = index > 0;
  const formContext = useContext(CustomerFormContext);
  const dispatch = formContext!.dispatch;


  return (
    <Stack spacing={1}>
      <Divider />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Typography variant="h5">{`【契約者${+index + 1}】`}</Typography>
        {
          Boolean(index) &&
          <Button  id={`customer-${index}`} variant="contained" color="error" startIcon={<PersonRemoveIcon />} onClick={() => dispatch({ type: 'REMOVE', index: +index })}>
            削除
          </Button>
        }
      </Stack>
      <CustomerRegistrationForm {...{ isLinkedCustomer, index: +index }} />
    </Stack>
  );
};

export default CustomerRegistrationFormInstance;
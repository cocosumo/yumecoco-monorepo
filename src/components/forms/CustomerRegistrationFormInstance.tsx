import { Stack, Divider, Typography, Button } from '@mui/material';
import CustomerRegistrationForm from './CustomerRegistrationForm';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import React from 'react';

interface CRFProps {
  index: string | number,
  removeCustomerHandler: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void
  handleCustomerChange: (event: React.ChangeEvent<HTMLInputElement>)=>void
}

/* Form for every customer instance */
const CustomerRegistrationFormInstance = ({ index, handleCustomerChange, removeCustomerHandler } : CRFProps) => {
  const isLinkedCustomer = index > 0;

  return (
    <Stack spacing={1}>
      <Divider />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Typography variant="h5">{`【契約者${+index + 1}】`}</Typography>
        {
          Boolean(index) &&
          <Button  id={`${index}`} variant="contained" color="error" startIcon={<PersonRemoveIcon />} onClick={removeCustomerHandler}>
            削除
          </Button>
        }
      </Stack>
      <CustomerRegistrationForm {...{ handleCustomerChange, isLinkedCustomer }} />
    </Stack>
  );
};

export default CustomerRegistrationFormInstance;
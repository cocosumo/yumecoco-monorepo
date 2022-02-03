import {
  Divider,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


import CustomerRegistrationFormInstance from '../../../components/forms/CustomerRegistrationFormInstance';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import React, { useState } from 'react';
import AgentsForm from '../../../components/forms/AgentsForm';
import Notes from './../../../components/lists/Notes';
import { addCustomers } from '../../../api/kintone/customers/POST';


const initialFormObject = {
  fullName: '',
  fullNameReading: '',
  gender: '',
  birthYear: '',
  birthMonth : '',
  birthDay : '',
  contacts : [
    {
      contactType: '電話番号１',
      contactValue: '',
      classification: '',
    },
  ],
  address: {
    postal: '',
    address1: '',
    address2: '',
  },

};

/* Main Form */
export default function CustomerRegistration() {

  const [customers, setCustomers] = useState([{ ...initialFormObject }]);


  const maxCustomers = 3;

  const addCustomerHandler = () => {
    setCustomers(prev => ([...prev, { ...initialFormObject }]));
  };

  const removeCustomerHandler = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const index = +event.currentTarget.id;
    console.log(event.currentTarget.id);
    setCustomers(prev => {
      const reducedCustomers = [...prev];
      reducedCustomers.splice(index, 1);
      return reducedCustomers;
    });
  };

  const handleSubmit = (e : React.FormEvent<HTMLFormElement> | undefined) => {
    e?.preventDefault();

    const convertedRecords = customers.map(
      ({ fullName, fullNameReading }) => {
        return {
          fullName: {
            value: fullName,
          },
          fullNameReading: {
            value: fullNameReading,
          },
        };
      });

    console.log(convertedRecords, addCustomers(convertedRecords));

  };

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('hello', e);
  };

  const isMaxCustomers = customers.length >= maxCustomers;

  console.log(customers);

  return (
    <form noValidate onSubmit={handleSubmit}>
    <Grid container spacing={2} overflow="auto" justifyContent="center">
      <Grid item xs={12} p={2} sx={{ backgroundColor: '#9CDAF9' }}>
        <Typography variant="h4">顧客登録（個人）</Typography>
      </Grid>
      <Grid item md={6} >
        {customers.map((_, i) => <CustomerRegistrationFormInstance  key={i} index={i} {...{ handleCustomerChange, removeCustomerHandler }} />)}
        {!isMaxCustomers &&
        <Button fullWidth variant="contained" color="success" startIcon={<PersonAddIcon />} onClick={addCustomerHandler}>
          契約者を追加する
        </Button>
        }

      </Grid>
      <Grid item md={3}>
        <AgentsForm />
      </Grid>
      <Grid item md={3}>
        <Notes />
      </Grid>
      <Grid item xs={12}><Divider /></Grid>
      <Grid container item md={4} justifyContent="center">
        <Button size="large" variant="contained" color="primary" type="submit" startIcon={<SaveAltIcon />}>
          保存
        </Button>
      </Grid>
    </Grid>
    </form>
  );
}
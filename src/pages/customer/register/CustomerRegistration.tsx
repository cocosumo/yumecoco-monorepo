import {
  Divider,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


import CustomerRegistrationFormInstance from '../../../components/forms/CustomerRegistrationFormInstance';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import React, { useReducer } from 'react';
import AgentsForm from '../../../components/forms/AgentsForm';
import Notes from './../../../components/lists/Notes';

import customerReducer from '../../../reducers/customer/customerReducer';
import initialFormState from '../../../stores/customer';
import CustomerFormContext from '../../../context/CustomerFormContext';

/* Main Form */
export default function CustomerRegistration() {
  const [formState, dispatch]  = useReducer(customerReducer, initialFormState);

  const providerState = {
    formState, dispatch,
  };

  const maxCustomers = 3;


  const handleSubmit = (e : React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT' });
  };

  const isMaxCustomers = formState.customers.length >= maxCustomers;

  return (
    <CustomerFormContext.Provider value={providerState}>
      <form noValidate onSubmit={handleSubmit}>
      <Grid container spacing={2} overflow="auto" justifyContent="center">
        <Grid item xs={12} p={2} sx={{ backgroundColor: '#9CDAF9' }}>
          <Typography variant="h4">顧客登録（個人）</Typography>
        </Grid>
        <Grid item md={6} >
          {formState.customers.map((_, i) => <CustomerRegistrationFormInstance  key={i} index={i} {...{ dispatch }} />)}
          {!isMaxCustomers &&
          <Button fullWidth variant="contained" color="success" startIcon={<PersonAddIcon />} onClick={() => dispatch({ type: 'ADD' })}>
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
    </CustomerFormContext.Provider>
  );
}
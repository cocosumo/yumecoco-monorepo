import {
  Divider,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import CustomerRegistrationFormInstance from '../../../components/forms/CustomerRegistrationFormInstance';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import React, { useReducer, useEffect, useState } from 'react';
import AgentsForm from '../../../components/forms/AgentsForm';

import customerReducer from '../../../reducers/customer/customerReducer';
import initialFormState from '../../../stores/customer';
import CustomerFormContext from '../../../context/CustomerFormContext';
import addTransactCustomers from '../../../reducers/customer/actions/addTransactCustomers';
import CustomerFormSnack from '../../../components/ui/snacks/CustomerFormSnack';


/* Main Form */
export default function CustomerRegistration() {
  const [formState, dispatch]  = useReducer(customerReducer, initialFormState);
  const [snack, setSnack] = useState({ open: false });

  const stateProvider = { formState, dispatch };
  const { submitState, hasError, isSubmitted } = formState;
  const maxCustomers = 3;

  useEffect(()=>{
    if (submitState === 'VALIDATE' && !hasError){
      setSnack({ open: true });
      addTransactCustomers(formState)
        .then((resp)=>{
          console.log('Success', resp);
          dispatch({ type: 'CHANGE_SUBMITSTATE', payload: { submitState: 'SUCCESS' } });
          setSnack({ open: true });
        })
        .catch((resp) => {
          console.log('Server error:', resp);
          dispatch({ type: 'CHANGE_SUBMITSTATE', payload: { submitState: 'FETCH_ERROR' } });
          setSnack({ open: true });
        });
    } else if (hasError && isSubmitted)  {
      setSnack({ open: true });
      dispatch({ type: 'CHANGE_SUBMITSTATE', payload: { submitState: 'VALIDATE_ERROR' } });
    }

  }, [submitState, hasError]);

  const handleSubmit = (e : React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    dispatch({ type: 'CHANGE_SUBMITSTATE', payload: { submitState: 'VALIDATE' } });
    setSnack({ open: true });

  };

  const isMaxCustomers = formState.customers.length >= maxCustomers;

  return (
    <CustomerFormContext.Provider value={stateProvider}>
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
        {/* <Grid item md={3}>
          <Notes />
        </Grid> */}
        <Grid item xs={12}><Divider /></Grid>
        <Grid container item md={4} justifyContent="center">
          <Button size="large" variant="contained" color="primary" type="submit" startIcon={<SaveAltIcon />}>
            保存
          </Button>
        </Grid>
      </Grid>
      </form>
      <CustomerFormSnack open={snack.open} handleClose={() => setSnack({ open: false })} formState={formState}/>
    </CustomerFormContext.Provider>
  );
}
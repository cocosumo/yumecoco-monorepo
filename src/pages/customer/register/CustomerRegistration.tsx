import {
  Divider,
  Grid,
  Typography,
  Button,
  AlertColor,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import CustomerRegistrationFormInstance from '../../../components/forms/CustomerRegistrationFormInstance';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import React, { useReducer, useEffect, useState } from 'react';
import AgentsForm from '../../../components/forms/AgentsForm';

import customerReducer from '../../../reducers/customer/customerReducer';
import initialFormState from '../../../stores/customer';
import CustomerFormContext from '../../../context/CustomerFormContext';
import UpsertCustomers from '../../../reducers/customer/actions/UpsertCustomers';
import CustomerFormSnack from '../../../components/ui/snacks/CustomerFormSnack';

import Notes from '../../../components/lists/Notes';


import { useNavigate, useParams } from 'react-router-dom';
import { getCustGroup } from '../../../api/kintone/custgroups/GET';
import { getCustomersByIds } from '../../../api/kintone/customers/GET';

export interface CustRegSnackProp {
  open: boolean,
  severity?: AlertColor,
  message?: string
}


/* Main Form */
export default function CustomerRegistration() {
  const [formState, dispatch]  = useReducer(customerReducer, initialFormState);

  const [snack, setSnack] = useState<CustRegSnackProp>({ open: false, severity: 'info' });
  const navigate = useNavigate();
  const groupId = useParams().groupId;
  const stateProvider = { formState, dispatch };
  const { submitState, hasError } = formState;
  const maxCustomers = 3;
  const isMaxCustomers = formState.customers.length >= maxCustomers;
  const isEdit = !!groupId;

  useEffect(()=>{
    switch (submitState) {
      case 'VALIDATE':
        setSnack({ open: true, severity: 'info', message: 'フォームを確認中です。' });

      case 'VALIDATE_SUCCESS':
        dispatch({ type: 'CHANGE_SUBMITSTATE', payload: { submitState: 'FETCHING' } });
        UpsertCustomers(formState)
          .then((resp)=>{

            dispatch({ type: 'CHANGE_SUBMITSTATE', payload: { submitState: isEdit ? 'SUCCES_UPDATE' : 'SUCCESS', fetchResponse: resp } });
            setSnack({ open: true, severity: 'success', message: '保存が出来ました。' });
            navigate(`/custgroup/${resp.group.id}/edit`);
          })
          .catch((resp) => {

            dispatch({ type: 'CHANGE_SUBMITSTATE', payload: { submitState: 'FETCH_ERROR' } });
            setSnack({ open: true, severity: 'error', message: `サーバエラ―！これを管理者にお知らせください。 ${resp}` });
          });
        break;

      case 'VALIDATE_ERROR':
        setSnack({ open: true, severity: 'error', message: '入力内容をご確認ください。' });
        break;

      case 'FETCHING':
        setSnack({ open: true, severity: 'info', message: 'サーバとをやり取り中です。' });
        break;
    }

    if (!snack.open) {
      dispatch({ type: 'CHANGE_SUBMITSTATE', payload: { submitState: 'EDITTING' } });

    }

  }, [submitState, hasError, snack.open]);

  useEffect(()=>{
    if (groupId && !formState.groupId ){
      /* Edit mode state */
      console.log('Update this shit');

      getCustGroup(groupId).then(({ record: groupRec }) => {
        const memberIds = (groupRec.members as CustomerGroupTypes.Data['members']).value.map(row => row.value.customerId.value);
        getCustomersByIds(memberIds).then((custRec) => {
          console.log(groupRec);
          dispatch({ type: 'GET_GROUP_DATA', payload: {
            group: groupRec as unknown as CustomerGroupTypes.SavedData,
            customers: custRec.records as unknown as CustomerTypes.SavedData[],
          } });
        });
      } );

    }
  }, [groupId]);


  const handleSubmit = (e : React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    dispatch({ type: 'CHANGE_SUBMITSTATE', payload: { submitState: 'VALIDATE' } });

  };

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
        {isEdit && <Grid item md={3}>
          <Notes />
        </Grid> }
        <Grid item xs={12}><Divider /></Grid>
        <Grid container item md={4} justifyContent="center">
          <Button disabled={formState.submitState !== 'EDITTING'} size="large" variant="contained" color="primary" type="submit" startIcon={<SaveAltIcon />}>
            保存
          </Button>
        </Grid>
      </Grid>
      </form>
      <CustomerFormSnack
      snackState={snack}
      handleClose={() => {
        setSnack((prev) => ({ ...prev, open: false }));

      }}/>
    </CustomerFormContext.Provider>
  );
}
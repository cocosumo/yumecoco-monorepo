
import { MainContainer } from '../../../components/ui/containers';
import { PageTitle } from '../../../components/ui/labels';
import {  Form, useFormikContext } from 'formik';
import { useEffect } from 'react';
import { Customers } from './parts/Customers/Customers';
import { Agents } from './parts/Agents';
import { FabSave } from '../../../components/ui/fabs/FabSave';
import { ScrollToFieldError } from '../../../components/utils/ScrollToFieldError';
import {  Grid } from '@mui/material';
import { MemoColumn } from './parts/Memo/MemoColumn';
import { CustomerForm } from './form';
import { RecordStatus } from './parts/RecordStatus';
import { CustGroupShortcuts } from  './parts/CustGroupShortcuts';
import { useSnackBar } from '../../../hooks';


export const FormIndividualCustomer  = () => {
  const { setSnackState } = useSnackBar();
  const {
    isValid,
    isSubmitting,
    submitForm,
    values : {
      id: custGroupId,
    },
  } = useFormikContext<CustomerForm>();

  const isEditMode = !!custGroupId;

  useEffect(()=>{
    if (!isValid && !isSubmitting){
      setSnackState({ open: true, message: '入力内容をご確認ください。', severity: 'error' });
    }

  }, [isSubmitting]);



  return (

    <Form noValidate>
      <ScrollToFieldError/>

      <MainContainer >

        <PageTitle label="顧客登録（個人）"/>
        <RecordStatus />
        <Grid container item xs={12} md={12} lg={12} xl={9} spacing={2} alignItems="flex-start" justifyContent={'flex-start'}>

          <Grid className='fieldarray' container item xs={12} md={8} lg={5} spacing={2} >

            <Customers/>
          </Grid>

          <Grid container item xs={12} md={4} lg={6} spacing={4} justifyContent="center">
            <Agents/>
            {isEditMode && <MemoColumn/>}
          </Grid>

        </Grid>
        <FabSave onClick={submitForm} url="custgroup"/>
        {
          isEditMode &&  <CustGroupShortcuts custGroupId={custGroupId} />
        }

      </MainContainer>

    </Form>

  );
};
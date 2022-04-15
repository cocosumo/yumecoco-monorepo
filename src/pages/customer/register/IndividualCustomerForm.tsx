
import { MainContainer } from '../../../components/ui/containers';
import { PageTitle } from '../../../components/ui/labels/';
import {  Form, useFormikContext } from 'formik';
import { SnackState } from '../../../components/ui/snacks/FormSnack';
import { useEffect } from 'react';
import { Customers } from './parts/Customers/Customers';
import { Agents } from './parts/Agents';
import { FabSave } from '../../../components/ui/fabs/FabSave';
import { ScrollToFieldError } from './../../../components/utils/ScrollToFieldError';
import { Grid } from '@mui/material';
import { MemoColumn } from './parts/Memo/MemoColumn';

interface ConstructionFormProps {
  handleSnack:  (snackState: SnackState) => void
}

export const IndividualCustomerForm  = (props: ConstructionFormProps) => {
  const { handleSnack } = props;
  const { isValid, isSubmitting, submitForm } = useFormikContext();

  useEffect(()=>{
    if (!isValid && !isSubmitting){
      handleSnack({ open: true, message: '入力内容をご確認ください。', severity: 'error' });
    }
  }, [isSubmitting]);

  return (

    <Form noValidate>
      <ScrollToFieldError/>
      <MainContainer >
        <PageTitle label="顧客登録（個人）"/>
        <Grid className='fieldarray' container item xs={12} md={8} spacing={2}>
          <Customers/>
        </Grid>
        <Grid container item xs={12} md={4} spacing={2}>
          <Agents/>
          <MemoColumn/>
        </Grid>

        <FabSave onClick={submitForm} url="custgroup"/>
      </MainContainer>
    </Form>

  );
};
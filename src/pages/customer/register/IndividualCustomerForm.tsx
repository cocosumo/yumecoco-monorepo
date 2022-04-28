
import { MainContainer } from '../../../components/ui/containers';
import { PageTitle } from '../../../components/ui/labels/';
import {  Form, useFormikContext } from 'formik';
import { SnackState } from '../../../components/ui/snacks/FormSnack';
import { useEffect, useState } from 'react';
import { Customers } from './parts/Customers/Customers';
import { Agents } from './parts/Agents';
import { FabSave } from '../../../components/ui/fabs/FabSave';
import { ScrollToFieldError } from './../../../components/utils/ScrollToFieldError';
import {  Grid } from '@mui/material';
import { MemoColumn } from './parts/Memo/MemoColumn';
import { CustomerForm } from './form';

interface ConstructionFormProps {
  handleSnack:  (snackState: SnackState) => void
}

export const IndividualCustomerForm  = (props: ConstructionFormProps) => {
  const { handleSnack } = props;
  const { isValid, isSubmitting, submitForm, values } = useFormikContext<CustomerForm>();
  const [initialLoad, setInitialLoad] = useState(true);
  const isEditMode = !!values.id;

  useEffect(()=>{

    if (!isValid && !isSubmitting && !initialLoad){
      handleSnack({ open: true, message: '入力内容をご確認ください。', severity: 'error' });
    }
    setInitialLoad(false);
  }, [isSubmitting]);


  return (

    <Form noValidate>
      <ScrollToFieldError/>

      <MainContainer >

        <PageTitle label="顧客登録（個人）"/>
        <Grid item xs={12}>
          Hello
        </Grid>

        <Grid container item xs={12} md={12} lg={12} xl={9} spacing={2} alignItems="flex-start" justifyContent={'center'}>
          <Grid className='fieldarray' container item xs={12} md={8} lg={5} spacing={2} >
            <Customers/>
          </Grid>

          <Grid container item xs={12} md={4} lg={6} spacing={4} justifyContent="center">

            <Agents/>
            {isEditMode && <MemoColumn/>}
          </Grid>

        </Grid>
        <FabSave onClick={submitForm} url="custgroup"/>
      </MainContainer>

    </Form>

  );
};
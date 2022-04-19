
import { MainContainer } from '../../components/ui/containers';
import { PageTitle } from '../../components/ui/labels/';
import { ConstructionInfo } from './sections/ConstructionInfo';
import { ConstructionLocation, CustInfo } from './sections';
import { Grid } from '@mui/material';

import {  Form, useFormikContext } from 'formik';
import { SnackState } from '../../components/ui/snacks/FormSnack';
import { useEffect } from 'react';
import { FabSave } from '../../components/ui/fabs/FabSave';
import { ScrollToFieldError } from '../../components/utils/ScrollToFieldError';

interface ConstructionFormProps {
  handleSnack:  (snackState: SnackState) => void
}

export const ConstructionForm  = (props: ConstructionFormProps) => {
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
      <MainContainer>

        <PageTitle label="工事情報登録" color="#60498C" textColor='#FFF' />
        <Grid container item xl={8} spacing={2} mb={12}>


          <CustInfo/>
          <ConstructionInfo />
          <ConstructionLocation/>

        </Grid>
        <FabSave onClick={submitForm} url="construction"/>
      </MainContainer>

    </Form>

  );
};
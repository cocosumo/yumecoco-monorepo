
import MainContainer from '../../components/ui/containers/MainContainer';
import PageTitle from '../../components/ui/labels/PageTitle';
import { ConstructionInfo } from './sections/ConstructionInfo';
import { Foot, Submit } from './sections/bottom';
import { ConstructionLocation, CustInfo } from './sections';
import { Divider, Grid } from '@mui/material';

import {  Form, useFormikContext } from 'formik';
import { SnackState } from '../../components/ui/snacks/FormSnack';
import { useEffect } from 'react';

interface ConstructionFormProps {
  handleSnack:  (snackState: SnackState) => void
}

export const ConstructionForm  = (props: ConstructionFormProps) => {
  const { handleSnack } = props;
  const { isValid, isSubmitting } = useFormikContext();

  useEffect(()=>{
    if (!isValid && !isSubmitting){
      handleSnack({ open: true, message: '入力内容をご確認ください。', severity: 'error' });
    }
  }, [isSubmitting]);

  return (

    <Form noValidate>
      <MainContainer>
        <PageTitle label="工事情報登録" color="#60498C" textColor='#FFF' />
        <CustInfo/>
        <ConstructionInfo />
        <ConstructionLocation/>

        <Grid item xs={12}><Divider/></Grid>

        <Submit/>
        <Foot/>
      </MainContainer>

    </Form>

  );
};
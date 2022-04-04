
import MainContainer from '../../../components/ui/containers/MainContainer';
import PageTitle from '../../../components/ui/labels/PageTitle';
import ConstructionInfo from './sections/ConstructionInfo';
import CustInfo from './sections/CustInfo';
import { Foot, Submit } from './sections/bottom';
import ConstructionLocation from './sections/location';
import { Divider, Grid } from '@mui/material';

import { Formik, Form } from 'formik';

import { validationSchema, initialValues } from './form';
import { saveConstructionData } from '../../../api/kintone/construction/POST';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


export const ConstructionForm  = () => {
  const [initialState, setInitialState] = useState(initialValues);
  const constructionId  = useParams().constructionId;

  /* TODO: Add edit */
  useEffect(()=>{
    console.log(constructionId);
  }, [constructionId]);

  return (
    <Formik
      initialValues={initialState}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        saveConstructionData(values)
          .then((resp)=>{
            console.log('SAVED!', resp);
            setSubmitting(false);

          });
      }}
    >
      <Form>
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
    </Formik>

  );
};
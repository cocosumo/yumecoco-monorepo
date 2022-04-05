import { Formik } from 'formik';

import { validationSchema, initialValues } from './form';
import {
  saveConstructionData,
  getFlatConstDetails,
} from '../../api/kintone/construction/';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ConstructionForm } from './ConstructionForm';


export const FormikConstruction  = () => {
  const [initialState, setInitialState] = useState(initialValues);
  const constructionId  = useParams().constructionId;

  useEffect(()=>{
    /** If edit mode */
    if (constructionId){
      getFlatConstDetails(constructionId)
        .then((flatRecord) => {
          setInitialState(flatRecord);
        });
    }
  }, [constructionId]);


  console.log(initialState);
  return (
    <Formik
      enableReinitialize
      initialValues={initialState}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        saveConstructionData({ ...values, $id: constructionId })
          .then((resp)=>{
            console.log('SAVED!', resp);
            setSubmitting(false);

          });
      }}
    >
      <ConstructionForm />
    </Formik>
  );
};
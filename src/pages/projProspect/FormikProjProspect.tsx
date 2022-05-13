import { Formik } from 'formik';
import { saveForm } from './api/saveForm';
import { initialValues, validationSchema, getFieldName, TypeOfForm } from './form';

import { FormProjProspect } from './FormProjProspect';
import { useQuery } from '../../hooks/useQuery';
import { useEffect, useState } from 'react';
import { getFormDataById } from './api/fetchRecord';

export const FormikProjProspect = () => {
  const [formValues, setFormValues] = useState<TypeOfForm>(initialValues);
  const projId = useQuery().get(getFieldName('projId'));

  useEffect(()=>{
    if (!projId) return;

    getFormDataById(projId).then(r => setFormValues(r));



  }, [projId]);

  return (
    <Formik
      initialValues={formValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {

        saveForm(values)
          .then(r => {
            console.log(r);
            setSubmitting(false);
          });

      }}
    >
      <FormProjProspect/>

    </Formik>
  );
};
import { Formik } from 'formik';
import { saveForm } from './api/saveForm';
import { initialValues, validationSchema, getFieldName, TypeOfForm } from './form';

import { FormProjProspect } from './FormProjProspect';
import { useQuery } from '../../hooks/useQuery';
import { useEffect, useState } from 'react';


export const FormikProjProspect = () => {
  const [formValues, setFormValues] = useState<TypeOfForm>(initialValues);

  const projIdFromURL = useQuery().get(getFieldName('projId'));

  useEffect(()=>{
    if (!projIdFromURL) return;
    setFormValues({ ...initialValues, projId: projIdFromURL });
  }, [projIdFromURL]);

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
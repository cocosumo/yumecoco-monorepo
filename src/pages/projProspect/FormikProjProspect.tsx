import { Formik } from 'formik';
import { saveForm } from './api/saveForm';
import { initialValues, validationSchema, getFieldName, TypeOfForm } from './form';

import { FormProjProspect } from './FormProjProspect';
import { useQuery } from '../../hooks/useQuery';
import { useEffect, useState } from 'react';
import { useSnackBar } from '../../hooks/useSnackBar';



export const FormikProjProspect = () => {
  const [formValues, setFormValues] = useState<TypeOfForm>(initialValues);
  const { setValue } = useSnackBar();

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
          .then((r) => {
            setValue({ open: true, message: `保存が出来ました。 ${r?.revision}回目`, severity: 'success' });
            setSubmitting(false);
          });

      }}
    >
      <FormProjProspect/>
    </Formik>
  );
};
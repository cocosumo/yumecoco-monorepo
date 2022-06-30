import { Formik } from 'formik';
//import { saveForm } from './api/saveForm';
import { initialValues, validationSchema, getFieldName, TypeOfForm } from './form';

import { FormContractPreview } from './FormContractPreview';
import { useQuery } from '../../../hooks/useQuery';
import { useEffect, useState } from 'react';
//import { useSnackBar } from '../../../hooks/useSnackBar';



export const FormikContractPreview = () => {
  const [formValues, setFormValues] = useState<TypeOfForm>(initialValues);
  //const { setSnackState } = useSnackBar();

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
        console.log(values);
        setSubmitting(false);
        /*  saveForm(values)
          .then((r) => {
            setSnackState({ open: true, message: `保存が出来ました。 ${r?.revision}回目`, severity: 'success' });
            setSubmitting(false);
          }); */

      }}
    >

      <FormContractPreview/>
    </Formik>
  );
};
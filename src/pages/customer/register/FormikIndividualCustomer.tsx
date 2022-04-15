import { Formik } from 'formik';
import { initialValues, validationSchema } from './form';
import { IndividualCustomerForm } from './IndividualCustomerForm';
import { useState, useEffect } from 'react';
import FormSnack, { SnackState } from '../../../components/ui/snacks/FormSnack';
import { saveFormData } from './api/saveFormData';

import { useNavigate, useParams  } from 'react-router-dom';
import { getFormDataById } from './api/getFormDataById';


export const FormikIndividualCustomer = () => {
  const [snackState, setSnackState] = useState<SnackState>({ open:false });

  const [initialState, setInitialState] = useState(initialValues);
  const recordId  = useParams().recordId;
  const navigate = useNavigate();

  useEffect(()=>{
    if (!recordId) return;
    /* If edit mode */
    getFormDataById(recordId).then(resp => setInitialState(resp));

  }, [recordId]);


  return (
    <>
      <Formik
        validateOnChange={false}
        validateOnMount
        initialValues={initialState}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          saveFormData({ ...values, id: recordId })
            .then((resp)=>{
              setSnackState({ open: true, message: '保存出来ました。' });
              setSubmitting(false);
              navigate(`/custgroup/edit/${resp.id}`);
            });

          setSubmitting(false);
        }}
      >
        <IndividualCustomerForm handleSnack={(snackParam) => setSnackState(snackParam)} />

      </Formik>
      <FormSnack snackState={snackState} handleClose={()=> setSnackState(prev => ({ ...prev, open: false }))}/>
    </>
  );
};
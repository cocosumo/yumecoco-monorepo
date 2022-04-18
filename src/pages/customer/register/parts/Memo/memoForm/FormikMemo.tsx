import { Formik } from 'formik';
import { useContext } from 'react';
import { saveMemo } from './api/saveMemo';

import { initialValues, validationSchema } from './form';
import { MemoContext } from './MemoContext';
import { MemoForm } from './MemoForm';


export const FormikMemo = () => {
  const { memoFormState, handleClose } = useContext(MemoContext)!;


  return (
    <Formik
    validateOnChange={false}
    validateOnMount
    initialValues={{ ...initialValues, ...memoFormState }}
    enableReinitialize
    validationSchema={validationSchema}
    onSubmit={(values, { setSubmitting, resetForm }) => {
     
      saveMemo(values)
        .then(resp => {
          console.log(resp);
          console.log('RESET!!!', values, resp);
          resetForm();
          setSubmitting(false);
          handleClose('submitted');

        })
        .catch((err)=>{
          console.error('Save failed.', err);
        });
        
    }}
    >
      <MemoForm />
    </Formik>
  );
};


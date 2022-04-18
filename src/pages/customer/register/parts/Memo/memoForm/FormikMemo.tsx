import { Formik } from 'formik';
import { useContext } from 'react';
import { saveMemo } from './api/saveMemo';

import { initialValues, validationSchema } from './form';
import { MemoContext } from './MemoContext';
import { MemoForm } from './MemoForm';


export const FormikMemo = () => {
  const { memoState, handleClose } = useContext(MemoContext);


  return (
    <Formik
    validateOnChange={false}
    validateOnMount
    initialValues={{ ...initialValues, ...memoState }}
    enableReinitialize
    validationSchema={validationSchema}
    onSubmit={(values, { setSubmitting, resetForm }) => {
      console.log(values);
      saveMemo(values)
        .then(resp => {
          console.log(resp);
         
          setSubmitting(false);
          handleClose('submitted');
        })
        .catch((err)=>{
          console.error('Save failed.', err);
        });
        
      resetForm();
      setSubmitting(false);
      handleClose('submitted');
    
    }}
    >
      <MemoForm />
    </Formik>
  );
};


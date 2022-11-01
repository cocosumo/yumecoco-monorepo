import { Formik } from 'formik';
import { useContext } from 'react';
//import { saveMemo } from './api/saveMemo';

import { initialValues, validationSchema } from './form';
import { MemoContext } from './MemoContext';
import { MemoForm } from './MemoForm';


export const FormikMemo = () => {

  const { memoFormState, handleConfirmSaveOpen } = useContext(MemoContext)!;


  return (

    <Formik
      validateOnChange={false}
      validateOnMount
      initialValues={{ ...initialValues, ...memoFormState }}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={() => {
        /* Opens confirm dialog, and do the saving there. */
        handleConfirmSaveOpen!(true);
      }}
    >
      <MemoForm />
    </Formik>

  );
};


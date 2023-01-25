import { Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';

import { initialValues, MemoFormType, validationSchema } from './form';
import { MemoContext } from './MemoContext';
import { MemoForm } from './MemoForm';


export const FormikMemo = () => {

  const [newState, setNewState] = useState<MemoFormType>(initialValues);

  const { handleConfirmSaveOpen, memoFormState } = useContext(MemoContext)!;

  useEffect(() => {
    if (memoFormState) {
      setNewState(memoFormState);
    }

  }, [memoFormState]);


  return (

    <Formik
      validateOnChange={false}
      validateOnMount
      initialValues={newState}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={() => {
        /* Opens confirm dialog, and do the saving there. */
        handleConfirmSaveOpen(true);
      }}
    >
      <MemoForm />
    </Formik>

  );
};


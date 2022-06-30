import { Formik } from 'formik';

import { validationSchema, initialValues } from './form';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FormConstruction } from './FormConstruction';
import { getFormDataById } from './api/getFormDataById';
import { saveFormData } from './api/saveFormData';
import { pages } from '../Router';
import { useSnackBar } from '../../hooks';
import { useConfirmDialog } from '../../hooks/useConfirmDialog';
import { NextStepChoices } from './parts/NextStepChoices';




export const FormikConstruction  = () => {
  const [initialState, setInitialState] = useState(initialValues);
  const { setDialogState } = useConfirmDialog();
  const recordId  = useParams().recordId;
  const navigate = useNavigate();
  const { setSnackState } = useSnackBar();

  useEffect(()=>{

    if (recordId) {
      getFormDataById(recordId)
        .then((resp) => {
          setInitialState(resp);
        });
    } /* else {
      setInitialState(initialValues);
    } */
  }, [recordId]);


  return (
    <>
      <Formik
      validateOnMount
      enableReinitialize
      initialValues={initialState}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {

        saveFormData({ ...values, recordId })
          .then((resp)=>{
            setSnackState({ open: true, message: '保存出来ました。', severity: 'success' });
            setSubmitting(false);
            setDialogState({
              title: '次へ進む',
              content: <NextStepChoices recordId={recordId} />,
              withYes: false,
              noText: '閉じる',
            });

            navigate(`${pages.projEdit}${resp.id}`);
          });
      }}
    >
        <FormConstruction />

      </Formik>
    </>
  );
};
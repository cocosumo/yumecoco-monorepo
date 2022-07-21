import { Formik } from 'formik';

import { validationSchema, initialValues, getFieldName } from './form';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FormConstruction } from './FormConstruction';
import { getFormDataById } from './api/getFormDataById';
import { saveFormData } from './api/saveFormData';
import { pages } from '../Router';
import { useQuery, useSnackBar } from '../../hooks';
import { useConfirmDialog } from '../../hooks/useConfirmDialog';
import { NextStepChoices } from './parts/NextStepChoices';




export const FormikConstruction  = () => {
  const [initialState, setInitialState] = useState(initialValues);
  const { setDialogState } = useConfirmDialog();

  const projIdFromURL = useQuery().get('projId') ?? undefined;


  const navigate = useNavigate();
  const { setSnackState } = useSnackBar();

  useEffect(()=>{

    if (projIdFromURL) {
      getFormDataById(projIdFromURL)
        .then((resp) => {
          setInitialState(resp);
        });
    } /* else {
      setInitialState(initialValues);
    } */
  }, [projIdFromURL]);


  return (
    <>
      <Formik
      validateOnMount
      enableReinitialize
      initialValues={initialState}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {

        saveFormData({ ...values, recordId: projIdFromURL })
          .then((resp)=>{
            setSnackState({ open: true, message: '保存出来ました。', severity: 'success' });
            setSubmitting(false);
            setDialogState({
              title: '次へ進む',
              content: <NextStepChoices recordId={projIdFromURL} />,
              withYes: false,
              noText: '閉じる',
            });

            navigate(`${pages.projEdit}?projId=${resp.id}`);
          });
      }}
    >
        <FormConstruction />

      </Formik>
    </>
  );
};
import { Formik } from 'formik';

import { validationSchema, initialValues } from './form';

import { useNavigate } from 'react-router-dom';

import { FormConstruction } from './FormConstruction';

import { saveFormData } from './api/saveFormData';
import { pages } from '../Router';
import {  useSnackBar } from '../../hooks';
import { useConfirmDialog } from '../../hooks/useConfirmDialog';
import { NextStepChoices } from './parts/NextStepChoices';




export const FormikConstruction  = () => {

  const { setDialogState } = useConfirmDialog();
  const navigate = useNavigate();
  const { setSnackState } = useSnackBar();

  return (
    <>
      <Formik
      initialStatus={ ((s: TFormStatus)=> s)('busy')}
      validateOnMount
      //enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {

        saveFormData({ ...values })
          .then((resp)=>{
            setSnackState({ open: true, message: '保存出来ました。', severity: 'success' });
            setSubmitting(false);
            setDialogState({
              title: '次へ進む',
              content: <NextStepChoices recordId={values.recordId} />,
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
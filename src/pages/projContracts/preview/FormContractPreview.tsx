import { Form, useFormikContext } from 'formik';
import { MainContainer } from '../../../components/ui/containers';
import { PageTitle } from '../../../components/ui/labels';

import { useEffect } from 'react';
import { getFormDataById } from './api/fetchRecord';
import { produce } from 'immer';
import { useSnackBar } from '../../../hooks/useSnackBar';
import { ProspectShortcuts } from './parts/ProspectShortcuts';
import { TypeOfForm } from './form';

export const FormContractPreview = () => {
  const {
    dirty,
    resetForm,
    setFormikState,
    isSubmitting,
    isValid,
    values,
  } = useFormikContext<TypeOfForm>();

  const { setSnackState } = useSnackBar();

  const { projId } = values;

  useEffect(()=>{
    if (projId) {
      getFormDataById(projId)
        .then((r) => setFormikState(prev => produce(prev, draft=> { draft.values = r; })));
    } else if (!projId && dirty) {
      resetForm();
    }
  },  [projId]);

  useEffect(()=>{
    if (!isValid && !isSubmitting) {
      setSnackState({ open: true, message: '入力内容をご確認ください。', severity: 'error' });
    }
  }, [isSubmitting]);

  return (
    <Form noValidate>

      <MainContainer>
        <PageTitle label='契約確認'/>

      </MainContainer>
      <ProspectShortcuts />

    </Form>
  );
};
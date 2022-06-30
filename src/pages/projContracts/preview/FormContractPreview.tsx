import { Form, useFormikContext } from 'formik';
import { MainContainer } from '../../../components/ui/containers';
import { PageTitle } from '../../../components/ui/labels';

import { useEffect } from 'react';
import { getFormDataById } from './api/fetchRecord';
import { produce } from 'immer';
import { useSnackBar } from '../../../hooks/useSnackBar';
import { ProspectShortcuts } from './parts/ProspectShortcuts';
import { getFieldName, TypeOfForm } from './form';
import { Grid } from '@mui/material';
import { SearchProjField } from './parts/SearchProjField';
import { SendContract } from './parts/SendContract';
import { Preview } from './parts/Preview';

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

  const { projId, projName } = values;

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

  console.log('env', process.env.NODE_ENV);

  return (
    <Form noValidate>

      <MainContainer>
        <PageTitle label='契約確認'/>
        <Grid container item xl={8} spacing={2} mb={12} alignItems={'center'}>
          <Grid item xs={12} md={4}>
            <SearchProjField
              label="工事情報の検索"
              name={getFieldName('projId')}
              projName={projName}
              />
          </Grid>
          <Grid item xs={12} md={4}>
            <SendContract projId={projId}/>
          </Grid>
          <Grid item xs={12} md={10}>
            <Preview />
          </Grid>
        </Grid>
      </MainContainer>
      <ProspectShortcuts />

    </Form>
  );
};
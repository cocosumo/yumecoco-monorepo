import { Form, useFormikContext } from 'formik';
import { MainContainer } from '../../../components/ui/containers';
import { PageTitle } from '../../../components/ui/labels';

import { ProspectShortcuts } from './parts/ProspectShortcuts';
import { getFieldName, TypeOfForm } from './form';
import { Grid } from '@mui/material';
import { SearchProjField } from './parts/SearchProjField';
import { PreviewContainer } from './parts/PreviewContainer';
import { useEffect } from 'react';
import { getFormDataById } from './api/fetchRecord';
import { useQuery } from '../../../hooks';

export const FormContractPreview = () => {

  const projIdFromURL = useQuery().get(getFieldName('projId'));

  const {
    values,
    setValues,
    setStatus,
    setFieldValue,

  } = useFormikContext<TypeOfForm>();

  const { projName, projId } = values;

  useEffect(()=>{
    if (projId) {
      setStatus('busy' as TFormStatus);
      getFormDataById(projId)
        .then((r) => {
          setValues(r);
          //setStatus('' as TFormStatus);
        });
    }
  },  [projId]);

  useEffect(()=>{
    if (projIdFromURL) {
      setFieldValue(getFieldName('projId'), projIdFromURL);
    }
  }, [projIdFromURL]);



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

          <Grid item xs={12} >
            <PreviewContainer {...values} />
          </Grid>
        </Grid>
      </MainContainer>
      <ProspectShortcuts />

    </Form>
  );
};
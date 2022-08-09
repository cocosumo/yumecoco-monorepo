import { Form, useFormikContext } from 'formik';
import { MainContainer } from '../../components/ui/containers';
import { PageTitle } from '../../components/ui/labels';

import { ProspectShortcuts } from './parts/ProspectShortcuts';
import { getFieldName, initialValues, TypeOfForm } from './form';
import { Grid } from '@mui/material';
import { SearchProjField } from './parts/SearchProjField';
import { ContractContainer } from './parts/ContractContainer';
import { useEffect, useState } from 'react';
import { getFormDataById } from './api/fetchRecord';
import { useQuery } from '../../hooks';
import { EmptyProject } from './parts/EmptyProject';

export const FormContractPreview = () => {
  const [searchTTOpen, setSearchTTOpen] = useState(false);
  const projIdFromURL = useQuery().get(getFieldName('projId'));

  const {
    values,
    setValues,
    setStatus,

  } = useFormikContext<TypeOfForm>();

  const { projName, projId } = values;

  useEffect(()=>{
    if (projId) {
      //resetForm();
      setStatus('busy' as TFormStatus);
      console.log('REFRESHING');
      getFormDataById(projId)
        .then((r) => {
          setValues(r);
          setStatus('' as TFormStatus);
        });
    }
  },  [projId]);

  useEffect(()=>{
    if (projIdFromURL) {
      setValues({ ...initialValues, projId: projIdFromURL });
      // /setFieldValue(getFieldName('projId'), projIdFromURL);

    }
  }, [projIdFromURL]);


  const handleSearchTTClose = () => setSearchTTOpen(false);
  const handleSearchTTOpen = () => setSearchTTOpen(true);


  return (
    <Form noValidate>
      <MainContainer>
        <PageTitle label='契約'/>
        <Grid container item xl={8} spacing={2} mb={12} alignItems={'center'}>
          <Grid item xs={12} md={4}>
            <SearchProjField
              label="工事情報の検索"
              name={getFieldName('projId')}
              projName={projName}
              handleSearchTTClose={handleSearchTTClose}
              handleSearchTTOpen={handleSearchTTOpen}
              searchTTOpen={searchTTOpen}
              />
          </Grid>
          <Grid item xs={12} >
            {projId && <ContractContainer />}
            {!projId && <EmptyProject {...{ handleSearchTTOpen, handleSearchTTClose }} />}
          </Grid>
        </Grid>
      </MainContainer>
      <ProspectShortcuts />

    </Form>
  );
};
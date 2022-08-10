import { Form, useFormikContext } from 'formik';
import { MainContainer } from '../../components/ui/containers';
import { PageTitle } from '../../components/ui/labels';

import { ProspectShortcuts } from './parts/ProspectShortcuts';
import { getFieldName, initialValues, TypeOfForm } from './form';
import {  Grid, Grow } from '@mui/material';
import { SearchProjField } from './parts/SearchProjField';
import { useEffect, useState } from 'react';
import { getFormDataById } from './api/fetchRecord';
import { useQuery } from '../../hooks';
import { EmptyProject } from './parts/EmptyProject';
import { SelectProjEstimates } from './parts/ProjEstimates/SelectProjEstimate';
import { ItemEstimate } from './parts/ProjEstimates/ItemEstimate';
import { getProjEstimates } from './api/getProjEstimates';
import { Box } from '@mui/system';

export const FormContractPreview = () => {
  const [searchTTOpen, setSearchTTOpen] = useState(false);
  const [options, setOptions] = useState<OptionNode[]>([]);
  const projIdFromURL = useQuery().get(getFieldName('projId'));

  const {
    values,
    setValues,
    setStatus,
    status,
  } = useFormikContext<TypeOfForm>();

  const { projName, projId } = values;

  const handleInitForm = async () => {
    setStatus('busy' as TFormStatus);
    const projDetails = await getFormDataById(projId);
    const estimates = await getProjEstimates(projId);

    const newOptions = estimates.map<OptionNode>((rec)=>{
      const { contractPrice, $id, 作成日時 } = rec;
      return {
        value: $id.value,
        key: $id.value,
        component: <ItemEstimate contractPrice={contractPrice.value} dateCreated={作成日時.value} id={$id.value}/>,
      };
    });

    setOptions(newOptions);
    setValues(projDetails);
    setStatus('' as TFormStatus);
  };

  useEffect(()=>{
    if (projId) {
      handleInitForm();
    } else {
      setStatus('');
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

  console.log(projId, status, options.length);

  return (
    <Form noValidate>
      <MainContainer>
        <PageTitle label='契約'/>
        <Grid container item xl={8} spacing={2} mb={12} alignItems={'center'} >
          <Grid item xs={12} md={4} >
            <SearchProjField
              label="工事情報の検索"
              name={getFieldName('projId')}
              projName={projName}
              handleSearchTTClose={handleSearchTTClose}
              handleSearchTTOpen={handleSearchTTOpen}
              searchTTOpen={searchTTOpen}
              />
          </Grid>

          <Grid item xs={12} md={8} >
            <Grow in={!!projId && status === '' } timeout={1000}>
              <Box sx={{ position: 'relative' }}>
                {!!projId && <SelectProjEstimates {...{ options, status }} />}
              </Box>
            </Grow>

            <Grow in={!!!projId && status === ''} timeout={1000}>
              <Box sx={{ position: 'relative' }}>
                {!!!projId && <EmptyProject {...{ handleSearchTTOpen, handleSearchTTClose }} />}
              </Box>
            </Grow>
          </Grid>

        </Grid>


      </MainContainer>
      <ProspectShortcuts />

    </Form>
  );
};
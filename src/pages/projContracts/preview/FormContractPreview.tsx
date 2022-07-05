import { Form, useFormikContext } from 'formik';
import { MainContainer } from '../../../components/ui/containers';
import { PageTitle } from '../../../components/ui/labels';

import { ProspectShortcuts } from './parts/ProspectShortcuts';
import { getFieldName, TypeOfForm } from './form';
import { Grid } from '@mui/material';
import { SearchProjField } from './parts/SearchProjField';
import { Preview } from './parts/Preview';

export const FormContractPreview = () => {
  const {
    values,
  } = useFormikContext<TypeOfForm>();



  const { projId, projName, dsEnvIdUkeoi } = values;

  /*   useEffect(()=>{
    if (projId) {
      getFormDataById(projId)
        .then((r) => setFormikState(prev => produce(prev, draft=> { draft.values = r; })));
    } else if (!projId && dirty) {
      resetForm();
    }
  },  [projId]); */


  console.log('env', projId, values);

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
            <Preview projId={projId} envelopeId={dsEnvIdUkeoi} />
          </Grid>
        </Grid>
      </MainContainer>
      <ProspectShortcuts />

    </Form>
  );
};
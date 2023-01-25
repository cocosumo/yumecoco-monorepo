
import { MainContainer } from '../../components/ui/containers';
import { PageTitle } from '../../components/ui/labels';
import { ConstructionInfo } from './sections/ConstructionInfo';
import { ConstructionLocation, CustInfo, StatusControls } from './sections';
import { Grid } from '@mui/material';
import {  Form, useFormikContext } from 'formik';
import { FabSave } from '../../components/ui/fabs/FabSave';
import { ScrollToFieldError } from '../../components/utils/ScrollToFieldError';
import { TypeOfForm } from './form';
import { ProjectShortCuts } from './parts/ProjectShortCuts';
import { UneditableInfo } from 'kokoas-client/src/components/ui/information/UneditableInfo';
import { RecordSelect } from './sections/RecordSelect/RecordSelect';


export const FormConstruction  = () => {

  const {
    status,
    submitForm,
    values,
    dirty,
  } = useFormikContext<TypeOfForm>();

  const {
    projId,
    storeId,
    territory,
    projTypeId,
    projDataId,
    custGroupId,
  } = values;

  const isEditMode = window.location.href.includes('edit');
  const isFormDisabled = (status as TFormStatus) === 'disabled';

  return (

    <Form noValidate>
      <ScrollToFieldError />

      <MainContainer>
        <PageTitle
          label="工事情報登録"
          color="#60498C"
          textColor='#FFF'
          secondaryLabel={projDataId}
        />
        <Grid container item xl={8}
          spacing={2} mb={12}
        >
          <UneditableInfo isVisible={isFormDisabled} projId={projId} />
          <RecordSelect />
          <CustInfo />

          {custGroupId && (
            <>
              <ConstructionLocation />
              <ConstructionInfo
                storeId={storeId}
                territory={territory}
                projTypeId={projTypeId}
              />
              {isEditMode && <StatusControls />}
            </>
          )}
        </Grid>
        <FabSave onClick={submitForm} url="project" appear={!!custGroupId && dirty} />
      </MainContainer>



      {isEditMode && <ProjectShortCuts />}

    </Form>

  );
};
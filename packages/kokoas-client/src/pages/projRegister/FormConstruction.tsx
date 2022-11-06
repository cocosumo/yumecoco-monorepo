
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


export const FormConstruction  = () => {

  const {
    status,
    isValid,
    dirty,
    isSubmitting,
    setValues,
    setStatus,
    submitForm,
    values,
  } = useFormikContext<TypeOfForm>();

  const {
    recordId,
    storeId,
    territory,
    projTypeId,
    envelopeStatus,
  } = values;

  const isEditMode = window.location.href.includes('edit');
  const isAbleToSave = (status as TFormStatus) === '';
  const isFormDisabled = (status as TFormStatus) === 'disabled';

  console.log(dirty, values);

  /*   useEffect(()=>{
    if (!isValid && !isSubmitting) {
      setSnackState({ open: true, message: '入力内容をご確認ください。', severity: 'error' });
    }
  }, [isSubmitting, isValid, setSnackState]); */


  return (

    <Form noValidate>
      <ScrollToFieldError />

      <MainContainer>
        <PageTitle label="工事情報登録" color="#60498C" textColor='#FFF' />
        <Grid container item xl={8}
          spacing={2} mb={12}
        >
          <UneditableInfo isVisible={isFormDisabled} projId={recordId} />
          <CustInfo />
          <ConstructionLocation />
          <ConstructionInfo
            storeId={storeId}
            territory={territory}
            projTypeId={projTypeId}
          />


          {isEditMode && !envelopeStatus && <StatusControls />}
        </Grid>
        {isAbleToSave && <FabSave onClick={submitForm} url="project" />}
      </MainContainer>

      {isEditMode && <ProjectShortCuts />}

    </Form>

  );
};
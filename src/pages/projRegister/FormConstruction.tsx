
import { MainContainer } from '../../components/ui/containers';
import { PageTitle } from '../../components/ui/labels';
import { ConstructionInfo } from './sections/ConstructionInfo';
import { ConstructionLocation, CustInfo, StatusControls } from './sections';
import { Grid } from '@mui/material';
import {  Form, useFormikContext } from 'formik';
import { useEffect } from 'react';
import { FabSave } from '../../components/ui/fabs/FabSave';
import { ScrollToFieldError } from '../../components/utils/ScrollToFieldError';
import { GetEmployeesParams } from '../../api/kintone/employees/GET';
import { TypeOfProjForm, getFieldName } from './form';
import { useQuery } from '../../hooks/useQuery';
import { useSnackBar } from '../../hooks';
import { ProjectShortCuts } from './parts/ProjectShortCuts';




export const FormConstruction  = () => {
  const { setSnackState } = useSnackBar();

  const {
    isValid,
    isSubmitting,
    submitForm,
    setFieldValue,
    values : {
      recordId,
      storeId,
      territory,
      constructionTypeId,
    },
  } = useFormikContext<TypeOfProjForm>();
  let passedCustGroupId = useQuery().get(getFieldName('custGroupId'));

  const isEditMode = !!recordId;

  useEffect(()=>{
    if (passedCustGroupId) {
      setFieldValue(getFieldName('custGroupId'), passedCustGroupId);
    }
  }, [passedCustGroupId]);

  useEffect(()=>{
    if (!isValid && !isSubmitting) {
      setSnackState({ open: true, message: '入力内容をご確認ください。', severity: 'error' });
    }
  }, [isSubmitting]);

  return (

    <Form noValidate>
      <ScrollToFieldError/>
      <MainContainer>
        <PageTitle label="工事情報登録" color="#60498C" textColor='#FFF' />
        <Grid container item xl={8} spacing={2} mb={12}>
          <CustInfo />
          <ConstructionLocation/>
          <ConstructionInfo
            storeId={storeId}
            territory={territory as GetEmployeesParams['territory']}
            constructionTypeId={constructionTypeId}

            />
          {isEditMode && <StatusControls />}
        </Grid>
        <FabSave onClick={submitForm} url="project"/>
      </MainContainer>

      {isEditMode && <ProjectShortCuts />}

    </Form>

  );
};
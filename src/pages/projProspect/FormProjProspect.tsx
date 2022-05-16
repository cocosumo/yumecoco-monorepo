import { Form, useFormikContext } from 'formik';
import { MainContainer } from '../../components/ui/containers';
import { PageTitle } from '../../components/ui/labels';
import { Divider, Grid } from '@mui/material';
import { FormikSelect } from '../../components/ui/selects';
import { getFieldName, TypeOfForm } from './form';
import { FormikTextField } from '../../components/ui/textfield';
import { FormikDatePicker } from '../../components/ui/datetimepickers';
import { SearchProjField } from './parts/SearchProjField';
import { FabSave } from '../../components/ui/fabs/FabSave';
import { useEffect } from 'react';
import { getFormDataById } from './api/fetchRecord';
import { produce } from 'immer';
import { useSnackBar } from '../../hooks/useSnackBar';
import { ScrollToFieldError } from '../../components/utils/ScrollToFieldError';
import { ProspectShortcuts } from './parts/ProspectShortcuts';

export const FormProjProspect = () => {
  const {
    dirty,
    resetForm,
    submitForm,
    setFormikState,
    isSubmitting,
    isValid,
    values,
  } = useFormikContext<TypeOfForm>();

  const { setSnackState } = useSnackBar();

  const { projId, projName } = values;

  useEffect(()=>{
    if (projId){
      getFormDataById(projId)
        .then((r) => setFormikState(prev => produce(prev, draft=> { draft.values = r; })));
    } else if (!projId && dirty) {
      resetForm();
    }
  },  [projId]);

  useEffect(()=>{
    if (!isValid && !isSubmitting){
      setSnackState({ open: true, message: '入力内容をご確認ください。', severity: 'error' });
    }
  }, [isSubmitting]);

  return (
    <Form noValidate>
      <ScrollToFieldError />
      <MainContainer>
        <PageTitle label='見込み登録'/>
        <Grid container item xl={8} spacing={2} mb={12}>
          <Grid item xs={12} md={4}>
            <SearchProjField
              label="工事情報の検索"
              name={getFieldName('projId')}
              projName={projName}
              />
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormikSelect label='ランク' name={getFieldName('rank')} options={['A', 'B', 'C', 'D'].map(o => ({ label: o, value: o }))}/>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormikTextField label="契約予定金額" name={getFieldName('schedContractPrice')} type="number" endAdornment="円"/>
          </Grid>

          <Grid item xs={4}/>

          <Grid item xs={12} md={4}>
            <FormikDatePicker label="不動産決済日" name={getFieldName('estatePurchaseDate')} />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormikDatePicker label="設計申込日" name={getFieldName('planApplicationDate')} />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormikDatePicker label="契約予定日" name={getFieldName('schedContractDate')} />
          </Grid>

          <Grid item xs={12} >
            <FormikTextField label="備考" name={getFieldName('memo')} multiline/>
          </Grid>

        </Grid>
      </MainContainer>
      <ProspectShortcuts />
      <FabSave onClick={()=> {
        submitForm();
      }}/>
    </Form>
  );
};
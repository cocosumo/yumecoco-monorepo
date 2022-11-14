import { Form, useFormikContext } from 'formik';
import { MainContainer } from '../../components/ui/containers';
import { PageTitle } from '../../components/ui/labels';
import { Divider, Grid } from '@mui/material';
import { FormikSelect } from '../../components/ui/selects';
import { getFieldName, TypeOfForm } from './form';
import { FormikTextField } from '../../components/ui/textfield';
import { FormikDatePicker } from '../../components/ui/datetimepickers';
import { FabSave } from '../../components/ui/fabs/FabSave';
import { useEffect } from 'react';
import { getFormDataById } from './api/fetchRecord';
import { useSnackBar } from '../../hooks/useSnackBar';
import { ScrollToFieldError } from '../../components/utils/ScrollToFieldError';
import { ProspectShortcuts } from './parts/ProspectShortcuts';
import { useQuery } from '../../hooks';
import { UneditableInfo } from '../../components/ui/information/UneditableInfo';
import { FormikSearchProjField } from 'kokoas-client/src/components/ui/textfield/FormikSearchProjField';

export const FormProjProspect = () => {
  const projIdFromURL = useQuery().get(getFieldName('projId'));
  const { setSnackState } = useSnackBar();
  const {
    dirty,
    resetForm,
    submitForm,
    setValues,
    isSubmitting,
    isValid,
    values,
    status,
    setStatus,
  } = useFormikContext<TypeOfForm>();
  const { projId, projName } = values;
  const isBusy = (status as TFormStatus) === 'busy';
  const isReadOnly = (status as TFormStatus) === 'disabled';
  const isDisabled = isReadOnly || isBusy || !projId;

  useEffect(()=>{
    if (projId) {
      getFormDataById(projId)
        .then((r) => {
          setValues(r);
          setStatus(((s: TFormStatus) => s )(r.envelopeStatus === '' ? '' : 'disabled'));
        });
    } else if (!projId && dirty) {
      resetForm();
    }
  },  [projId]);

  useEffect(()=>{
    if (projIdFromURL) {
      setValues({ ...values, projId: projIdFromURL });
    }
  }, [projIdFromURL]);

  useEffect(()=>{
    if (!isValid && !isSubmitting) {
      setSnackState({ open: true, message: '入力内容をご確認ください。', severity: 'error' });
    }
  }, [isSubmitting]);





  return (
    <Form noValidate>
      <ScrollToFieldError />
      <MainContainer>
        <PageTitle label='見込み登録' />
        <Grid container item xl={8}
          spacing={2} mb={12}
        >

          <UneditableInfo isVisible={isReadOnly} projId={projId} />


          <Grid item xs={12} md={4}>

            <FormikSearchProjField 
              label="工事情報の検索"
              name={getFieldName('projId')}
              projName={projName}
              disabled={isReadOnly}
            />

          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormikSelect disabled={isDisabled} label='ランク' name={getFieldName('rank')}
              options={['A', 'B', 'C', 'D'].map(o => ({ label: o, value: o }))}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormikTextField disabled={isDisabled} label="契約予定金額" name={getFieldName('schedContractPrice')}
              type="number" endAdornment="円"
            />
          </Grid>

          <Grid item xs={4} />

          <Grid item xs={12} md={4}>
            <FormikDatePicker disabled={isDisabled} label="不動産決済日" name={getFieldName('estatePurchaseDate')} />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormikDatePicker disabled={isDisabled} label="設計申込日" name={getFieldName('planApplicationDate')} />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormikDatePicker disabled={isDisabled} label="契約予定日" name={getFieldName('schedContractDate')} />
          </Grid>

          <Grid item xs={12} >
            <FormikTextField disabled={isDisabled} label="備考" name={getFieldName('memo')}
              multiline
            />
          </Grid>

        </Grid>
      </MainContainer>
      <ProspectShortcuts />
      {!isBusy && !isReadOnly &&
      <FabSave onClick={()=> {
        submitForm();
      }} 
      />}

    </Form>
  );
};
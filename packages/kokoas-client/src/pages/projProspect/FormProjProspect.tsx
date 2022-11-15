import { useFormikContext } from 'formik';
import { Divider, Grid } from '@mui/material';
import { FormikSelect } from '../../components/ui/selects';
import { getFieldName, TypeOfForm } from './form';
import { FormikMoneyField, FormikTextFieldV2 as FormikTextField } from '../../components/ui/textfield';
import { FormikJADatePicker } from '../../components/ui/datetimepickers';
import { FabSave } from '../../components/ui/fabs/FabSave';
import { useEffect } from 'react';
import { useSnackBar } from '../../hooks/useSnackBar';
import { ProspectShortcuts } from './parts/ProspectShortcuts';
import { FormikSearchProjField } from 'kokoas-client/src/components/ui/textfield/FormikSearchProjField';
import { FormContainer } from './FormContainer';

export const FormProjProspect = () => {
  const { setSnackState } = useSnackBar();
  const {
    submitForm,
    isSubmitting,
    isValid,
    values,

  } = useFormikContext<TypeOfForm>();
  const { projId, projName } = values;
  const isDisabled = !projId;
  

  useEffect(()=>{
    if (!isValid && !isSubmitting) {
      setSnackState({ open: true, message: '入力内容をご確認ください。', severity: 'error' });
    }
  }, [isSubmitting, isValid, setSnackState]);



  return (
    <FormContainer>

      <Grid item xs={12} md={4}>

        <FormikSearchProjField 
          label="工事情報の検索"
          name={getFieldName('projId')}
          projName={projName}
 
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
        <FormikMoneyField 
          disabled={isDisabled} 
          label="契約予定金額" 
          name={getFieldName('schedContractPrice')}
        />
      </Grid>

      <Grid item xs={4} />

      <Grid item xs={12} md={4}>
        <FormikJADatePicker disabled={isDisabled} label="不動産決済日" name={getFieldName('estatePurchaseDate')} />
      </Grid>
      <Grid item xs={12} md={4}>
        <FormikJADatePicker disabled={isDisabled} label="設計申込日" name={getFieldName('planApplicationDate')} />
      </Grid>

      <Grid item xs={12} md={4}>
        <FormikJADatePicker disabled={isDisabled} label="契約予定日" name={getFieldName('schedContractDate')} />
      </Grid>

      <Grid item xs={12} >
        <FormikTextField disabled={isDisabled} label="備考" name={getFieldName('memo')}
          multiline
        />
      </Grid>

      <ProspectShortcuts />

      <FabSave onClick={()=> {
        submitForm();
      }} 
      />

    </FormContainer >
  );
};
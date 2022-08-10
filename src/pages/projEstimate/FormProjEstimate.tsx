import { Divider, Grid } from '@mui/material';
import { Form, useFormikContext } from 'formik';
import { MainContainer } from '../../components/ui/containers';
import { FabSave } from '../../components/ui/fabs/FabSave';
import { PageTitle } from '../../components/ui/labels';
import { FormikTextField } from '../../components/ui/textfield';
import { ScrollToFieldError } from '../../components/utils/ScrollToFieldError';
import { getFieldName } from './form';

export default function FormProjEstimate() {
  const { submitForm } = useFormikContext();

  return (
    <Form noValidate>
      <ScrollToFieldError />
      <MainContainer>
        <PageTitle label='見積もり登録'/>

        <Grid container item xl={8} spacing={2} mb={12}>
          
          <Grid item xs={12} md={4}>
            <FormikTextField name={getFieldName('tax')} label="税率" />
          </Grid>
        </Grid>
        <FabSave onClick={submitForm} />
      </MainContainer>
    </Form>
  );
}
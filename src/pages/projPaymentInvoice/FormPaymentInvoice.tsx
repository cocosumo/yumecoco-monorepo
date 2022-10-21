import { Form } from 'formik';
import { MainContainer } from '../../components/ui/containers';
import { PageTitle } from '../../components/ui/labels';
import { getFieldName } from './form';
import { ScrollToFieldError } from '../../components/utils/ScrollToFieldError';
import { FormikTextField } from '../../components/ui/textfield';
import { ContractAmount } from './fieldComponents/ContractAmount';
import { BillingBalance } from './fieldComponents/BillingBalance';
import { FormikDatePicker } from '../../components/ui/datetimepickers';
import { Grid } from '@mui/material';



export const FormPaymentInvoice = () => {
  // const { values } = useFormikContext<TypeOfForm>();


  return (
    <Form noValidate>
      <ScrollToFieldError />
      <MainContainer justifyContent={'space-between'}>
        <PageTitle label='入金管理/請求入力' />

        {/* 請求書の選択 */}
        <Grid item xs={12} md={4} >
          請求書の選択
        </Grid>
        <Grid item md={8} />

        {/* 請求書情報の表示/入力エリア */}
        {/* 契約金額 */}
        <Grid item xs={12} md={12}>
          <ContractAmount />
        </Grid>

        {/* 請求金額 */}
        <Grid item xs={12} md={12}>
          <FormikTextField
            label='請求額'
            name={getFieldName('billingAmount')}
          />
        </Grid>

        {/* 請求残額 */}
        <Grid item xs={12} md={12}>
          <BillingBalance />
        </Grid>


        {/* 入金予定日 */}
        <Grid item xs={12} md={12}>
          <FormikDatePicker
            label='入金予定日'
            name={getFieldName('plannedPaymentDate')}
          />
        </Grid>
        


      </MainContainer>
    </Form>
  );
};
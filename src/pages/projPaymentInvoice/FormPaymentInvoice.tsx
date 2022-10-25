import { Form, useFormikContext } from 'formik';
import { MainContainer } from '../../components/ui/containers';
import { PageTitle } from '../../components/ui/labels';
import { getFieldName, TypeOfForm } from './form';
import { ScrollToFieldError } from '../../components/utils/ScrollToFieldError';
import { FormikTextField } from '../../components/ui/textfield';
import { ContractAmount } from './fieldComponents/ContractAmount';
import { BillingBalance } from './fieldComponents/BillingBalance';
import { Button, Divider, Grid } from '@mui/material';
import { EstimateCards } from './fieldComponents/EstimateCards';
import { SearchProject } from './fieldComponents/SearchProject';
import { paymentLabels } from '../projContracts';
import { FormikSelect } from '../../components/ui/selects';
import { PlannedPaymentDate } from './fieldComponents/PlannedPaymentDate';



export const FormPaymentInvoice = () => {
  const { values } = useFormikContext<TypeOfForm>();
  const { projId } = values;


  return (
    <Form noValidate>
      <ScrollToFieldError />
      <MainContainer justifyContent={'space-between'}>
        <PageTitle label='入金管理/請求入力' />

        {/* 工事の選択 */}
        <Grid item xs={12} md={4}>
          <SearchProject values={values} />
        </Grid>

        {/* 支払金額の種別 */}
        <Grid item xs={12} md={2}>
          <FormikSelect
            name={getFieldName('amountType')}
            label={'支払金額の種別'}
            options={paymentLabels.map((item) => {
              return ({
                label: item,
                value: item,
              });
            })}
          />
        </Grid>
        <Grid item md={6} />

        {/* 契約済み見積り情報の表示 */}
        <Grid item xs={12} md={12}>
          <EstimateCards projId={projId} />
        </Grid>


        <Grid item xs={12} md={12}>
          <Divider />
        </Grid>


        {/* 請求書情報の表示/入力エリア */}
        {/* 契約金額 */}
        <Grid item xs={12} md={6}>
          <ContractAmount />
        </Grid>
        <Grid item md={6} />


        {/* 請求金額 */}
        <Grid item xs={12} md={6}>
          <FormikTextField
            label='請求額'
            name={getFieldName('billingAmount')}
          />
        </Grid>
        <Grid item md={6} />


        {/* 請求残額 */}
        <Grid item xs={12} md={6}>
          <BillingBalance />
        </Grid>
        <Grid item md={6} />


        {/* 入金予定日 */}
        <Grid item xs={12} md={6}>
          <PlannedPaymentDate />
        </Grid>
        <Grid item md={6} />


        {/* 請求書発行ボタン */}
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            onClick={() => { alert('未対応です'); }}
          >
            請求書発行
          </Button>
        </Grid>
        <Grid item md={6} />


      </MainContainer>
    </Form>
  );
};
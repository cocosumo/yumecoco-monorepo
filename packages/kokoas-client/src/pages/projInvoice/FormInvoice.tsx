import { Form, useFormikContext } from 'formik';
import { MainContainer } from '../../components/ui/containers';
import { PageTitle } from '../../components/ui/labels';
import { getFieldName, TypeOfForm } from './form';
import { ScrollToFieldError } from '../../components/utils/ScrollToFieldError';
import { ContractAmount } from './fieldComponents/ContractAmount';
import { Button, Divider, Grid } from '@mui/material';
import { EstimateCards } from './fieldComponents/EstimateCards';
import { paymentLabels } from '../projContracts';
import { FormikSelect } from '../../components/ui/selects';
import { PlannedPaymentDate } from './fieldComponents/PlannedPaymentDate';
import { useResolveParams } from './hooks/useResolveParams';
import { SearchProjects } from 'kokoas-client/src/components/ui/textfield';
import { useNavigate } from 'react-router-dom';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { pages } from '../Router';
import { BillingAmount } from './fieldComponents/BillingAmount';
import { BilledAmount } from './fieldComponents/BilledAmount';
import { useEffect } from 'react';
import { useInvoiceTotalByProjId } from 'kokoas-client/src/hooksQuery';



export const FormInvoice = () => {
  const navigate = useNavigate();

  const { values, submitForm, setValues } = useFormikContext<TypeOfForm>();
  const { projId, projName, billingAmount, billedAmount, contractAmount } = values;

  const {
    data: Invoices,
  } = useInvoiceTotalByProjId(projId);

  const { records } = Invoices || {};

  useResolveParams();

  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      billingAmount: String(+contractAmount - +billedAmount),
    }));
  }, [contractAmount, billedAmount, setValues]);



  return (
    <Form noValidate>
      <ScrollToFieldError />
      <MainContainer justifyContent={'space-between'}>
        <PageTitle label='入金管理/請求入力' />

        {/* 工事の選択 */}
        <Grid item xs={12} md={4}>
          <SearchProjects
            value={projId ? { id: projId, projName: projName } : undefined}
            onChange={(_, val) => navigate(`${pages.projInvoice}?${generateParams({ projId: val?.id })}`)}
            label='工事情報の検索'
          />
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
          <ContractAmount contractAmount={+contractAmount} />
        </Grid>
        <Grid item md={6} />

        {/* 請求済額 */}
        <Grid item xs={12} md={6}>
          <BilledAmount
            billedAmount={+billedAmount}
            records={records}
          />
        </Grid>
        <Grid item md={6} />


        {/* 請求金額・請求残高 */}
        <Grid item xs={12} md={12}>
          <BillingAmount
            open={+billingAmount > (+contractAmount - +billedAmount)}
            billingBalance={+billingAmount - +billingAmount}
          />
        </Grid>


        {/* 入金予定日 */}
        <Grid item xs={12} md={6}>
          <PlannedPaymentDate />
        </Grid>
        <Grid item md={6} />


        {/* 請求書発行ボタン */}
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            onClick={submitForm}
          >
            請求書発行
          </Button>
        </Grid>
        <Grid item md={6} />


      </MainContainer>
    </Form>
  );
};
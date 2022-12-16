import { Form, useFormikContext } from 'formik';
import { MainContainer } from '../../components/ui/containers';
import { PageTitle } from '../../components/ui/labels';
import { getFieldName, TypeOfForm } from './form';
import { ScrollToFieldError } from '../../components/utils/ScrollToFieldError';
import { Button, Divider, Grid, Typography } from '@mui/material';
import { PlannedPaymentDate } from './fieldComponents/PlannedPaymentDate';
import { useResolveParams } from './hooks/useResolveParams';
import { SearchCustGroup } from 'kokoas-client/src/components/ui/textfield';
import { useNavigate } from 'react-router-dom';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { pages } from '../Router';
import { BillingAmount } from './fieldComponents/BillingAmount';
import { useEffect, useRef } from 'react';
import { useSnackBar } from 'kokoas-client/src/hooks';
import { isEmpty } from 'lodash';
import { EstimatesTable } from './fieldComponents/EstimatesTable';
import { DisplayAmount } from './fieldComponents/DisplayAmount';



export const FormInvoice = () => {
  const navigate = useNavigate();
  const { setSnackState } = useSnackBar();

  const { values, submitForm, setValues, errors, submitCount } = useFormikContext<TypeOfForm>();
  const submitCountRef = useRef(0);

  const {
    custGroupId,
    custName,
    billingAmount,
    billedAmount,
    contractAmount,
    estimates,
  } = values;

  useResolveParams();

  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      billingAmount: String(+contractAmount - +billedAmount),
    }));
  }, [contractAmount, billedAmount, setValues]);

  useEffect(() => {
    const newContractAmount = estimates.reduce((acc, cur) => {
      if (cur.isForPayment) return acc;

      return acc + +cur.amountPerContract;
    }, 0);

    setValues((prev) => ({
      ...prev,
      contractAmount: String(newContractAmount),
    }));
  }, [estimates, setValues]);

  useEffect(() => {
    if (!isEmpty(errors) && submitCount !== submitCountRef.current) {
      setSnackState({
        open: true,
        severity: 'error',
        message: '入力エラーです',
      });
    }
    submitCountRef.current = submitCount;
  }, [errors, setSnackState, submitCount, submitCountRef]);



  return (
    <Form noValidate>
      <ScrollToFieldError />
      <MainContainer justifyContent={'space-between'}>
        <PageTitle label='入金管理/請求入力' />

        {/* 顧客の検索 */}
        <Grid item xs={12} md={6}>
          <SearchCustGroup
            fullWidth
            value={custGroupId ? {
              id: custGroupId,
              name: custName,
            } : undefined}
            onChange={(_, val) => navigate(`${pages.projInvoice}?${generateParams({ custGroupId: val?.id })}`)}
            inputProps={{
              label: '顧客検索',
              name: getFieldName('custGroupId'),
            }}
          />
        </Grid>


        {/* 契約済み見積り情報の表示 */}
        <Grid item xs={12} md={12}>
          <Typography>
            {'契約一覧'}
          </Typography>
          <EstimatesTable />
        </Grid>


        <Grid item xs={12} md={12}>
          <Divider />
        </Grid>



        {/* 請求書情報の表示/入力エリア */}
        {/* 契約金額 */}
        <Grid item xs={12} md={6}>
          <DisplayAmount
            amount={+contractAmount}
            label={'契約金額(税込)'}
          />
        </Grid>
        <Grid item md={6} />


        {/* 請求金額・請求残高 */}
        <Grid item xs={12} md={12}>
          <BillingAmount
            open={+billingAmount > (+contractAmount - +billedAmount)}
            billingBalance={+contractAmount - +billedAmount - +billingAmount}
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
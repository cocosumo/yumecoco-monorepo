import { Form, useFormikContext } from 'formik';
import { MainContainer } from '../../components/ui/containers';
import { PageTitle } from '../../components/ui/labels';
import { getFieldName, TypeOfForm } from './form';
import { ScrollToFieldError } from '../../components/utils/ScrollToFieldError';
import { Button, Divider, Grid, Stack, Typography } from '@mui/material';
import { PlannedPaymentDate } from './fieldComponents/PlannedPaymentDate';
import { SearchCustGroup } from 'kokoas-client/src/components/ui/textfield';
import { useNavigate } from 'react-router-dom';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { pages } from '../Router';
import { useEffect, useRef } from 'react';
import { useSnackBar } from 'kokoas-client/src/hooks';
import isEmpty from 'lodash/isEmpty';
import { EstimatesTable } from './fieldComponents/EstimatesTable';
import { BillingEntryTable } from './fieldComponents/BillingEntryTable';
import { EmptyBox } from 'kokoas-client/src/components/ui/information/EmptyBox';
import { BillingTotal } from './fieldComponents/BillingTotal';
import { SelectInvoices } from './fieldComponents/selectInvoices/SelectInvoices';



export const FormInvoice = () => {
  const navigate = useNavigate();
  const { setSnackState } = useSnackBar();

  const { values, submitForm, setValues, errors, submitCount } = useFormikContext<TypeOfForm>();
  const submitCountRef = useRef(0);

  const {
    custGroupId,
    custName,
    estimates,
    invoiceStatus,
  } = values;



  const totalAmountExceeded = estimates.some(({ contractAmount, billedAmount, billingAmount, isForPayment }) => {
    const totalBilledAmount = +billedAmount + +billingAmount;
    const isUnderContractAmount = (+contractAmount > 0) && (totalBilledAmount > +contractAmount);
    const isOverContractAmount = (+contractAmount <= 0) && (totalBilledAmount < +contractAmount);

    return isForPayment && (isUnderContractAmount || isOverContractAmount);
  });

  const isBilled = (invoiceStatus !== 'created') && (invoiceStatus !== '');


  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      exceededContract: totalAmountExceeded,
    }));
  }, [setValues, totalAmountExceeded]);

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
        <Grid
          container
          item
          justifyContent="flex-end"
          xs
        >
          <SelectInvoices custGroupId={custGroupId} />
        </Grid>



        {custGroupId &&
          <>
            {/* 契約済み見積り情報の表示 */}
            <Grid item xs={12} md={12}>
              <Typography>
                {'契約一覧'}
              </Typography>
              <EstimatesTable isBilled={isBilled} />
            </Grid>


            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>


            {/* 請求入力欄(テーブル) */}
            <Grid item xs={12} md={12}>
              <Stack direction={'row'}>
                <Typography>
                  {'請求入力欄　'}
                </Typography>
                <Typography variant={'caption'}>
                  {'※請求には課税対象分から使用し、非課税額は最後に使用します'}
                </Typography>
              </Stack>
              <BillingEntryTable
                totalAmountExceeded={totalAmountExceeded}
                isBilled={isBilled}
              />
            </Grid>


            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>


            <Grid container
              spacing={2}
              alignItems="flex-end"
              padding={2}
            >
              <Grid item xs={12} md={7}>
                {/* 請求合計 */}
                <BillingTotal />
              </Grid>

              <Grid item xs={12} md={5}>
                {/* 入金予定日 */}
                <PlannedPaymentDate isBilled={isBilled} />
              </Grid>
            </Grid>


            {/* 請求書発行ボタン */}
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                onClick={submitForm}
                disabled={isBilled}
              >
                保存
              </Button>
            </Grid>
            <Grid item md={6} />
          </>}

        {!custGroupId &&
          <Grid item xs={12} md={6}>
            <EmptyBox>
              顧客を選択してください
            </EmptyBox>
          </Grid>}

      </MainContainer>
    </Form>
  );
};
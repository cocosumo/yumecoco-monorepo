import { Divider, FormControl, Grid, Input } from '@mui/material';
import { FieldArray, Form, useFormikContext } from 'formik';
import { MainContainer } from '../../components/ui/containers';
import { FabSave } from '../../components/ui/fabs/FabSave';
import { PageTitle } from '../../components/ui/labels';
import { FormikTextField } from '../../components/ui/textfield';
import { ScrollToFieldError } from '../../components/utils/ScrollToFieldError';
import { getFieldName, TypeOfForm } from './form';
import SummaryTable from './SummaryTable/SummaryTable';
import { useEffect } from 'react';
import { RenderFunc } from './QuoteTable/RenderFunc';

export default function FormProjEstimate() {
  const { values, submitForm, setFieldValue } = useFormikContext<TypeOfForm>();

  // 原価合計の算出処理
  const costPriceFields = values.items.map(({ costPrice, quantity }) => +costPrice * +quantity);
  const totalCostPrice = costPriceFields.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  // 粗利合計の算出処理
  const grossProfitFields = values.items.map(({ costPrice, quantity, elemProfRate }) => {
    return ((+costPrice * +quantity) * (+elemProfRate / 100));
  });
  const grossProfitVal = grossProfitFields.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  // 利益率の算出処理
  const grossProfitMarginVal = ((grossProfitVal / totalCostPrice) * 100 + '%').toString();

  // 税抜金額の算出処理
  const taxExcludedAmountFields = values.items.map(({ costPrice, quantity, elemProfRate }) => {
    return ((+costPrice * quantity) * (1 + (elemProfRate / 100)));
  });
  const taxExcludedAmountVal = taxExcludedAmountFields.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  // 税込金額の算出処理
  const amountIncludingTaxFields = values.items.map(({ price })=> price);
  const amountIncludingTaxVal = amountIncludingTaxFields.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  // 合計欄の更新処理
  useEffect(() => {
    setFieldValue('totalCost', totalCostPrice);
    setFieldValue('grossProfit', grossProfitVal);
    setFieldValue('grossProfitMargin', grossProfitMarginVal);
    setFieldValue('taxAmount', (amountIncludingTaxVal - taxExcludedAmountVal));
    setFieldValue('taxExcludedAmount', taxExcludedAmountVal);
    setFieldValue('amountIncludingTax', amountIncludingTaxVal);

  }, [totalCostPrice, grossProfitVal, grossProfitMarginVal, taxExcludedAmountVal, amountIncludingTaxVal]);

  /* フォームプルダウンに使用する配列の入れ物の定義 */
  /* フォームプルダウンに使用する配列の更新処理 */
  /* 何かをトリガにuseEffectで更新する？？ */

  console.log('values', values);

  return (
    <Form noValidate>
      <ScrollToFieldError />
      <MainContainer>
        <PageTitle label='見積もり登録' />

        <Grid container item xl={8} spacing={2} mb={12}>
          <Grid item xs={12} md={4}>



            {/* 工事情報の検索 */}
            <div>
              工事情報の検索：未対応
              <FormControl variant="standard">
                {/* <InputLabel htmlFor="component-simple">テスト</InputLabel> */}
                <Input id="component-simple" value={name}/*  onChange={handleChange} */ />
              </FormControl>
            </div>


          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12} md={3}>
            <FormikTextField name={getFieldName('constructionType')} label="工事種別名" />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormikTextField name={getFieldName('profitRate')} label="利益率" />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormikTextField name={getFieldName('taxRate')} label="税率" />
          </Grid>
          <Grid item md={3} />

          <Grid item xs={12} md={12}>
            <SummaryTable />
          </Grid>

          <Grid item xs={12} md={12}>
            {/* 見積もり用のテーブル */}
            <FieldArray
              name={getFieldName('items')}
              render={RenderFunc}
            />
          </Grid>


        </Grid>
        <FabSave onClick={submitForm} />
      </MainContainer>
    </Form>
  );
}

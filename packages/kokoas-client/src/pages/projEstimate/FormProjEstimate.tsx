import { Divider, Grid } from '@mui/material';
import { FieldArray, Form, useFormikContext } from 'formik';
import { MainContainer } from '../../components/ui/containers';
import { PageSubTitle, PageTitle } from '../../components/ui/labels';
import { FormikNumberField, FormikTextFieldV2 as FormikTextField } from '../../components/ui/textfield';
import { ScrollToFieldError } from '../../components/utils/ScrollToFieldError';
import { getFieldName, statusChoices, TypeOfForm } from './form';
import SummaryTable from './SummaryTable/SummaryTable';

import { renderQuoteTable } from './QuoteTable/';
import { SubTotalTable } from './SubTotalTable/SubTotalTable';
import { SearchProject } from './fieldComponents/SearchProject';
import { FormActions } from './fieldComponents/formActions/FormActions';
import { FormikSelect } from '../../components/ui/selects';
import { ProjEstimateShortcuts } from './navigationComponents/ProjEstimateShortcuts';
import { GoToContractButton } from './navigationComponents/GoToContractButton';
import { MismatchedProfit } from './fieldComponents/MismatchedProfit';
import { EstimatesInfo } from './fieldComponents/EstimatesInfo';
import { ButtonMenu } from './fieldComponents/ButtonMenu';

export default function FormProjEstimate() {

  const { values } = useFormikContext<TypeOfForm>();
  const {
    projId,
    projTypeProfit,
    projTypeProfitLatest,
    estimateId,
    estimateDataId,
    createdDate,
    envStatus,

  } = values;


  const isEditMode = !!estimateId;
  const isDisabled = !!envStatus;


  return (
    <Form noValidate>
      <ScrollToFieldError />
      <MainContainer>
        <PageTitle label={`見積もり${isEditMode ? '編集' : '登録'}`} />

        <Grid item xs={10} md={5}>

          {/* 工事情報の検索 */}
          <SearchProject />

        </Grid>

        <Grid item xs={12} md={3}>

          {/* 編集中の見積もり情報 */}
          {projId &&
            <EstimatesInfo
              id={estimateDataId}
              createdDate={createdDate}
              envStatus={envStatus}
            />}
        </Grid>

        <Grid
          container
          item
          justifyContent="flex-end"
          xs
        >
          {/* 見積もりの検索 */}
          {/* コピー */}
          <ButtonMenu projId={projId} />
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12} md={3}>
          <FormikTextField name={getFieldName('projTypeName')} label="工事種別名" disabled />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormikNumberField
            name={getFieldName('projTypeProfit')}
            label="利益率"
            disabled={projTypeProfitLatest !== 0 || isDisabled}
          />
          {projTypeProfitLatest !== null &&
            projTypeProfitLatest !== 0 &&
            +projTypeProfit !== +projTypeProfitLatest &&
            !isDisabled &&
            <MismatchedProfit />}

        </Grid>
        <Grid item xs={12} md={3}>
          <FormikNumberField
            name={getFieldName('tax')}
            label="税率"
            disabled={isDisabled}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormikSelect
            name={getFieldName('status')}
            label='ステータス'
            options={statusChoices.map((c) => ({ label: c || '-', value: c }))}
            disabled={isDisabled}
          />
        </Grid>

        <Grid item xs={12} mt={4}>
          <PageSubTitle label="合計欄" />
        </Grid>

        <Grid item xs={12} md={12}
          id={'summaryTable'}
        >
          {/* 合計欄テーブル */}
          <SummaryTable />
        </Grid>

        <Grid item xs={12} mt={4}>
          <PageSubTitle label="内訳" />
        </Grid>

        <Grid item xs={12} md={12}>
          {/* 見積もり内訳のテーブル */}
          <FieldArray
            name={getFieldName('items')}
            render={renderQuoteTable}
          />
        </Grid>


        <Grid item xs={12} mt={4}>
          <PageSubTitle label="大項目小計欄" />
        </Grid>
        <Grid item xs={12}
          md={4}
          lg={3}
        >
          {/* 大項目ごとの表示テーブル */}
          <SubTotalTable />
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <GoToContractButton />
        </Grid>

        {!isDisabled && <FormActions />}
        {projId && <ProjEstimateShortcuts />}
      </MainContainer>
    </Form>
  );
}

import { Divider, Grid } from '@mui/material';
import { FieldArray, Form, useFormikContext } from 'formik';
import { MainContainer } from '../../components/ui/containers';
import { PageSubTitle, PageTitle } from '../../components/ui/labels';
import { FormikTextField } from '../../components/ui/textfield';
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

export default function FormProjEstimate() {

  const { values } = useFormikContext<TypeOfForm>();
  const { projName, customerName, projId } = values;

  return (
    <Form noValidate>
      <ScrollToFieldError />
      <MainContainer>
        <PageTitle label='見積もり登録' />

        <Grid item xs={12} md={5}>

          {/* 工事情報の検索 */}
          <SearchProject {...{ customerName, projId, projName }} />
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12} md={3}>
          <FormikTextField name={getFieldName('projType')} label="工事種別名" disabled />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormikTextField name={getFieldName('profitRate')} label="利益率" disabled />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormikTextField name={getFieldName('taxRate')} label="税率" />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormikSelect
            name={getFieldName('status')}
            label='ステータス'
            options={statusChoices.map((c) => ({ label: c || '-', value: c }))}
          />
        </Grid>

        <Grid item xs={12} mt={4}>
          <PageSubTitle label="合計欄"  />
        </Grid>

        <Grid item xs={12} md={12}
          id={'summaryTable'}
        >
          {/* 合計欄テーブル */}
          <SummaryTable />
        </Grid>

        <Grid item xs={12} mt={4}>
          <PageSubTitle label="内訳"  />
        </Grid>

        <Grid item xs={12} md={12}>
          {/* 見積もり用のテーブル */}
          <FieldArray
            name={getFieldName('items')}
            render={renderQuoteTable}
          />
        </Grid>


        <Grid item xs={12} mt={4}>
          <PageSubTitle label="大項目小計欄"  />
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

        <FormActions />
        {projId && <ProjEstimateShortcuts />}
      </MainContainer>
    </Form>
  );
}

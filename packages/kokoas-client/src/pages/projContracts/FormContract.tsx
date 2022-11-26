import { Form, useFormikContext } from 'formik';
import { MainContainer } from '../../components/ui/containers';
import { PageSubTitle, PageTitle } from '../../components/ui/labels';
import { ContractPageShortcuts } from './parts/ContractPageShortcuts';
import { getFieldName, TypeOfForm } from './form';
import { Grid } from '@mui/material';
import { ContractInfo } from './parts/contractInfo/ContractInfo';
import { EmptyBox } from '../../components/ui/information/EmptyBox';
import { SelectProjEstimates } from '../../components/ui/selects';
import { PaymentSchedule } from './parts/paymentSchedule/PaymentSchedule';
import { ScrollToFieldError } from '../../components/utils/ScrollToFieldError';
import { ContractFormActions } from './parts/ContractFormActions';
import { ProjectSchedules } from './parts/projSchedules/ProjectSchedules';

import { FormikSearchProjField } from 'kokoas-client/src/components/ui/textfield/FormikSearchProjField';
import { calculateEstimate } from 'api-kintone';


export const FormContract = ({
  calculated,
}: {
  calculated?: ReturnType<typeof calculateEstimate>
}) => {
  const { values } = useFormikContext<TypeOfForm>();
  const { projEstimateId, projId, projName, envelopeStatus } = values;


  const { totalAmountInclTax } = calculated ?? {};

  const roundedTotalAmt = Math.round(totalAmountInclTax ?? 0);

  const disabled = !!envelopeStatus;

  return (
    <Form noValidate>
      <ScrollToFieldError />
      <MainContainer justifyContent={'space-between'}>
        <PageTitle label='契約' />

        <Grid item xs={12} md={4} >
          <FormikSearchProjField
            label='工事検索'
            name={getFieldName('projId')}
            projName={projName}
          />
        </Grid>


        {/* 見積もり選択フィールド
          Reload field and its options after every submit.
        */}

        <Grid item xs={12} md={8}
          lg={6}
        >
          <SelectProjEstimates
            projId={projId}
            name={getFieldName('projEstimateId')}
          />
        </Grid>


        {!!projEstimateId && (
          <>
            {/* 支払い予定入力 */}
            <PageSubTitle label='支払い予定' />
            <PaymentSchedule totalAmount={roundedTotalAmt} />

            {/* 工期 */}
            <PageSubTitle label={'工期'} />
            <ProjectSchedules disabled={disabled} />
          </>
        )}

        {/* 契約内容 */}
        <ContractInfo />

        {!!projEstimateId && (
          <Grid item xs={12} justifyContent={'center'} >
            <ContractFormActions />
          </Grid>
        )}


        {!projEstimateId &&
          <Grid item xs={12}>
            <EmptyBox>
              見積を選択してください。
            </EmptyBox>
          </Grid>}

      </MainContainer>

      {!!projId && <ContractPageShortcuts />}


    </Form>
  );
};
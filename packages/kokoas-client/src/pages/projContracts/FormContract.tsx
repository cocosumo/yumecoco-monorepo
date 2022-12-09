import { Form, useFormikContext } from 'formik';
import { MainContainer } from '../../components/ui/containers';
import { PageSubTitle, PageTitle } from '../../components/ui/labels';
import { ContractPageShortcuts } from './parts/ContractPageShortcuts';
import { TypeOfForm } from './form';
import { Grid } from '@mui/material';
import { ContractInfo } from './parts/contractInfo/ContractInfo';
import { EmptyBox } from '../../components/ui/information/EmptyBox';
import { PaymentSchedule } from './parts/paymentSchedule/PaymentSchedule';
import { ScrollToFieldError } from '../../components/utils/ScrollToFieldError';
import { ContractFormActions } from './parts/ContractFormActions';
import { ProjectSchedules } from './parts/projSchedules/ProjectSchedules';

import { SearchProjects } from 'kokoas-client/src/components/ui/textfield';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { useNavigate } from 'react-router-dom';
import { pages } from '../Router';
import { SelectProjEstimates } from 'kokoas-client/src/components/ui/selects';
import { calculateEstimateRecord } from 'api-kintone';


export const FormContract = ({
  calculated,
}: {
  calculated?: ReturnType<typeof calculateEstimateRecord>
}) => {
  const { values, isValid } = useFormikContext<TypeOfForm>();
  const navigate = useNavigate();
  const { projEstimateId, projId, projName, envelopeStatus } = values;


  const { summary } = calculated ?? {};

  const roundedTotalAmt = Math.round(summary?.totalAmountAfterTax ?? 0);

  const disabled = !!envelopeStatus;


  console.log(isValid);

  return (
    <Form noValidate>
      <ScrollToFieldError />
      <MainContainer justifyContent={'space-between'}>
        <PageTitle label='契約' />

        <Grid item xs={12} md={4} >
          <SearchProjects
            label='工事情報の検索'
            value={projId ? {
              id: projId,
              projName: projName,
            } : undefined}
            onChange={(_, opt) => {
              navigate(`${pages.projContractPreview}?${generateParams({
                projId: opt?.id,
              })}`);
            }}
          />
        </Grid>

        <Grid item xs={12} md={8}
          lg={6}
        >
          <SelectProjEstimates
            projId={projId}
            value={projEstimateId}
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
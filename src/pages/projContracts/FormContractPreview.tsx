import { Form } from 'formik';
import { MainContainer } from '../../components/ui/containers';
import { PageTitle } from '../../components/ui/labels';

import { ContractPageShortcuts } from './parts/ContractPageShortcuts';
import { getFieldName } from './form';
import {  Grid, LinearProgress } from '@mui/material';
import { SearchProjField } from './parts/SearchProjField';
import { ContractInfo } from './parts/contractInfo/ContractInfo';
import { EmptyBox } from '../../components/ui/information/EmptyBox';
import { Preview } from './parts/Preview/Preview';
import {
  useUpdateProjId,
  useResolveParams,
  useEstimateChangeHandler } from './hooks/';
import useDeepCompareEffect from 'use-deep-compare-effect';



import { SelectProjEstimates } from '../../components/ui/selects';

export const FormContractPreview = () => {

  const { projEstimateIdFromURL } = useResolveParams();

  const {
    formStatus,
    values: { projEstimateId, projId, projName },
  } = useUpdateProjId();

  const {
    handleChangeEstimate,
    previewUrl,
    previewLoading,
    selectedEstimate,
  } = useEstimateChangeHandler();


  useDeepCompareEffect(() => {
    if (projEstimateIdFromURL && selectedEstimate && formStatus !== 'busy') {
      /*
        Triggers when projEstimateId was passed from the url,
        but ensures that selectedEstimate and projId are not empty
        to avoid pre-mature rendering.
      */
      handleChangeEstimate(selectedEstimate, projEstimateIdFromURL);
    }
  }, [projEstimateIdFromURL, formStatus, selectedEstimate || {}]);

  return (
    <Form noValidate>
      <MainContainer>
        <PageTitle label='契約' />


        <Grid item xs={12} md={4} >
          <SearchProjField
            label="工事情報の検索"
            name={getFieldName('projId')}
            projName={projName}
          />
        </Grid>

        {/* 見積もり選択フィールド */}
        <Grid item xs={12}
          md={8}
          lg={6}
        >
          <SelectProjEstimates
            projId={projId}
            projEstimateId={projEstimateId}
            handleChange={handleChangeEstimate}
            disabled={previewLoading}
          />

        </Grid>


        {/* 契約内容 */}
        <ContractInfo />

        {/* 契約のプレビュー */}
        {!!projEstimateId &&
        <Preview
          previewUrl={previewUrl}
          previewLoading={previewLoading}
        />}

        {!projEstimateId &&
          <Grid item xs={12}>
            <EmptyBox>
              見積を選択してください。
            </EmptyBox>
          </Grid>}



        {(formStatus) === 'busy' && <Grid item xs={12}>
          <LinearProgress />
          </Grid>}

      </MainContainer>

      {!!projId &&  <ContractPageShortcuts />}


    </Form>
  );
};
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
import { ProjEstimatesField } from './parts/ProjEstimates/ProjEstimatesField';
import { useUpdateProjId } from './hooks/useUpdateProjId';
import { useState } from 'react';
import { useResolveParams } from './hooks/useResolveParams';

export const FormContractPreview = () => {

  // State for search field's tooltip.
  const [searchTTOpen, setSearchTTOpen] = useState(false);

  useResolveParams();

  const {
    estimatesRec,
    formStatus,
    isWithEstimates,
    values: { projEstimateId, projId, projName },
  } = useUpdateProjId();


  const handleSearchTTClose = () => setSearchTTOpen(false);
  const handleSearchTTOpen = () => setSearchTTOpen(true);

  return (
    <Form noValidate>
      <MainContainer>
        <PageTitle label='契約' />


        <Grid item xs={12} md={4} >
          <SearchProjField
            label="工事情報の検索"
            name={getFieldName('projId')}
            projName={projName}
            handleSearchTTClose={handleSearchTTClose}
            handleSearchTTOpen={handleSearchTTOpen}
            searchTTOpen={searchTTOpen}
          />
        </Grid>

        {/* 見積もり選択フィールド */}
        <Grid item xs={12} 
          md={8}
          lg={6}
        >
          <ProjEstimatesField
            estimatesRecord={estimatesRec}
            handleSearchTTClose={handleSearchTTClose}
            handleSearchTTOpen={handleSearchTTOpen}
          />

        </Grid>
  

        {/* 契約内容 */}
        <ContractInfo />

        {/* 契約のプレビュー */}
        {!!projEstimateId &&  <Preview />}

        {!projEstimateId && !!projId && isWithEstimates &&
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
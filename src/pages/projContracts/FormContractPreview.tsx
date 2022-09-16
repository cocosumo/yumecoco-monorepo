import { Form, useFormikContext } from 'formik';
import { MainContainer } from '../../components/ui/containers';
import { PageTitle } from '../../components/ui/labels';

import { ProspectShortcuts } from './parts/ProspectShortcuts';
import { getFieldName, TypeOfForm } from './form';
import {  Button, Grid, LinearProgress } from '@mui/material';
import { SearchProjField } from './parts/SearchProjField';
import { useEffect, useState } from 'react';
import { getFormDataById } from './api/fetchRecord';
import { ItemEstimate } from './parts/ProjEstimates/ItemEstimate';
import { getProjEstimates } from './api/getProjEstimates';
import { ContractInfo } from './parts/ContractInfo';
import { EmptyBox } from '../../components/ui/information/EmptyBox';
import { Preview } from './parts/Preview/Preview';
import { getParam } from '../../helpers/url';
import { useNavigate } from 'react-router-dom';
import { ProjEstimatesField } from './parts/ProjEstimates/ProjEstimatesField';

export const FormContractPreview = () => {
  const [searchTTOpen, setSearchTTOpen] = useState(false);
  const [options, setOptions] = useState<OptionNode[]>([]);
  const navigate = useNavigate();

  const projIdFromURL = getParam('projId');
  const projEstimateIdFromURL = getParam('projEstimateId');

  const {
    values,
    setValues,
    setStatus,
    status,
  } = useFormikContext<TypeOfForm>();

  const { projName, projId, projEstimateId } = values;

  const handleInitForm = async () => {
    setStatus('busy' as TFormStatus);
    const projDetails = await getFormDataById(projId);
    const estimates = await getProjEstimates(projId);

    if (estimates.length) {

      const newOptions: OptionNode[] = [{
        value: '',
        key: 'clear',
        component: '---',
      }];

      newOptions.push(...estimates.map<OptionNode>((rec)=>{
        const { contractPrice, $id, 作成日時 } = rec;
        return {
          value: $id.value,
          key: $id.value,
          component: <ItemEstimate contractPrice={contractPrice.value} dateCreated={作成日時.value} id={$id.value} />,
        };
      }));

      newOptions.push({
        value: '',
        key: 'new',
        component: <Button onClick={()=>navigate('/')} variant="text" color={'inherit'}
          fullWidth disableRipple
                   >
          見積作成
        </Button>,
      });
      setOptions(newOptions);

    }

    setValues((prev)=>({ ...prev, ...projDetails }));
    setStatus('' as TFormStatus);
  };

  useEffect(()=>{
    if (projId) {
      handleInitForm();
    } else {
      setStatus('');
    }
  },  [projId]);


  useEffect(()=>{
    if (projIdFromURL) {
      setValues((prev)=>({
        ...prev,
        projEstimateId: projEstimateIdFromURL ?? '',
        projId: projIdFromURL,
      }));
      // /setFieldValue(getFieldName('projId'), projIdFromURL);
    }
  }, [projIdFromURL, projEstimateIdFromURL, setValues]);


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
        <ProjEstimatesField
          projId={projId}
          options={options}
          status={status}
          handleSearchTTClose={handleSearchTTClose}
          handleSearchTTOpen={handleSearchTTOpen}
        />

        {/* 契約のプレビュー */}
        {!!projEstimateId &&  <Preview />}
        {!projEstimateId && !!projId && !!options.length &&
          <Grid item xs={12}>
            <EmptyBox>
              見積を選択してください。
            </EmptyBox>
          </Grid>}

        {/* 契約内容 */}
        <ContractInfo />



        {(status as TFormStatus) === 'busy' && <Grid item xs={12}>
          <LinearProgress />
          </Grid>}



      </MainContainer>
      <ProspectShortcuts />

    </Form>
  );
};
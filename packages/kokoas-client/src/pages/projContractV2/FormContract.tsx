import { EmptyBox, FormContainer, PageSubTitle, PageTitle } from 'kokoas-client/src/components';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import schema, { TypeOfForm } from './schema';
import { Grid } from '@mui/material';
import { SearchProjects } from 'kokoas-client/src/components/reactHookForm';
import { pages } from '../Router';
import { useResolveParams } from './hooks/useResolveParams';
import { useEffect } from 'react';
import { FormInput } from './FormInput';
import { ProjDetailsButton } from './parts/ProjDetailsButton';
import { FormActions } from './sections/FormActions';
import { CustomerSummary } from './sections/CustomerSummary';
import { ProjectSummary } from './sections/ProjectSummary';
import { ContractStatus } from './sections/ContractStatus';


export const FormContract = () => {
  const {
    newFormVal,
  } = useResolveParams();

  const formReturn = useForm<TypeOfForm>({
    defaultValues: newFormVal,
    resolver: zodResolver(schema),
    
  });

  const { contractId, projId } = newFormVal;

  const { 
    control, 
    reset,
  } = formReturn;

  useEffect(() => {
    reset({ ...newFormVal });
  }, [reset, newFormVal]);


  return (
    <FormProvider {...formReturn}>
      <FormContainer
        noValidate
      >
        <PageTitle 
          label={`契約${contractId ? '編集' : '作成'}`}
        />
        <Grid item xs={12} 
          md={8}
          lg={4}
        >
          <SearchProjects
            navigateTo={pages.projContractPreviewV2}
            controllerProps={{
              name: 'projId',
              control,
            }}
          />
        </Grid>

        {projId && (
          <>
            <Grid item xs={12} md={4}>
              <ProjDetailsButton />
            </Grid>

            <PageSubTitle label={'契約情報'} />
            <Grid item xs={12}>
              <ContractStatus />
            </Grid>           

            <PageSubTitle label={'顧客情報'} />
            <Grid item xs={12}>
              <CustomerSummary />
            </Grid>

            <PageSubTitle label={'工事情報'} />
            <Grid item xs={12}>
              <ProjectSummary />
            </Grid>

          
            <FormInput />

            <Grid item xs={12}>
              <FormActions />
            </Grid>
          </>
        )}  

  
        {!projId && (
          <Grid item xs={12}>
            <EmptyBox>
              工事を選択してください
            </EmptyBox>
          </Grid>
   
        )}
        
      </FormContainer>
    </FormProvider>
  );
};
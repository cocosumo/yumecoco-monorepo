import { EmptyBox, PageSubTitle3, PageTitle3 } from 'kokoas-client/src/components';
import { FormProvider, useForm, Form } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import schema, { TypeOfForm } from './schema';
import {  Stack } from '@mui/material';
import { SearchProjects } from 'kokoas-client/src/components/reactHookForm';
import { pages } from '../Router';
import { useResolveParams } from './hooks/useResolveParams';
import { useEffect } from 'react';
import { FormInput } from './FormInput';
import { FormActions } from './sections/formActions/FormActions';
import { CustomerSummary } from './sections/CustomerSummary';
import { ProjectSummary } from './sections/ProjectSummary';
import { ContractStatus } from './sections/contractStatus/ContractStatus';
import { DevTool } from '@hookform/devtools';


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
      <Form
        noValidate
      >
        <Stack spacing={2}>
          <PageTitle3 
            label={`契約${contractId ? '編集' : '作成'}`}
          />

          <SearchProjects
            navigateTo={pages.projContractPreviewV2}
            controllerProps={{
              name: 'projId',
              control,
            }}
          />

          {projId && (
          <>        

            <PageSubTitle3 label={'契約情報'} />
            <ContractStatus />

            <PageSubTitle3 label={'顧客情報'} />
            <CustomerSummary />

            <PageSubTitle3 label={'工事情報'} />
            <ProjectSummary />

          
            <FormInput />

            <FormActions />
          </>
          )}  

          {!projId && (
            <EmptyBox>
              工事を選択してください
            </EmptyBox>
   
          )}
        
        </Stack>
      </Form>
      <DevTool control={control} />

    </FormProvider>
  );
};
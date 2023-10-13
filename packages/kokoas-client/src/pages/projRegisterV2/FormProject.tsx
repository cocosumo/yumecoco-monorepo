import { Form, FormProvider, useForm } from 'react-hook-form';
import { useResolveParams } from './hooks/useResolveParams';
import { zodResolver } from '@hookform/resolvers/zod';
import {  TForm, schema } from './schema';
import { useEffect } from 'react';
import { EmptyBox } from 'kokoas-client/src/components';
import { RecordSelect } from './sections/RecordSelect';
import { Contents } from './Contents';
import { Divider, Stack } from '@mui/material';
import { PageTitle3 } from 'kokoas-client/src/components/ui/labels/PageTitle3';
import { FormActions } from './sections/formActions/FormActions';
import { DevTool } from '@hookform/devtools';
import { FormStatus } from './sections/FormStatus';
import { AndpadLog } from './sections/andpadLogs/AndpadLogs';


export const FormProject = () => {
  
  const {
    newFormVal,
  } = useResolveParams();

  const formReturn = useForm<TForm>({
    defaultValues: newFormVal,
    resolver: zodResolver(schema),
  });

  const { 
    reset,
    control,
  } = formReturn;

  useEffect(() => {
    reset(newFormVal);
  }, [reset, newFormVal]);
  
  const {
    projId,
    projDataId,
    custGroupId,
  } = newFormVal;
  return (
    <FormProvider {...formReturn}>
      <Form noValidate>
        <Stack 
          spacing={2}
          mb={8}
        >
          <PageTitle3
            label={`工事情報${projId ? '編集' : '登録'}`}
            secondaryLabel={projDataId}
            backgroundColor='#60498C'
            color='#FFF'
          />
          <RecordSelect />

          {!custGroupId && (
            <EmptyBox>
              顧客を選択してください
            </EmptyBox>
          )}

          {!!custGroupId && (
          <>
            <Contents />
            <Divider />
            
            <FormActions />
            <FormStatus />
            <AndpadLog />
          </>
          )}


          <DevTool control={control} placement='top-right' />
        </Stack>
      </Form>
    </FormProvider>
  );
};
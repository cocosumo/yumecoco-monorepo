import { Divider, LinearProgress, Stack } from '@mui/material';
import { Form, FormProvider, useForm } from 'react-hook-form';

import { useResolveParam } from './hooks/useResolveParam';
import { FormContents } from './FormContents';
import { useSaveForm } from './hooks/useSaveForm';
import { useFormReset } from './hooks/useFormReset';
import { PageTitle3 } from 'kokoas-client/src/components/ui/labels/PageTitle3';
import { HeadSection } from './sections/HeadSection';
import schema, { TForm } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useIsFetching } from '@tanstack/react-query';

export const FormProjEstimate = () => {
  const { initialForm } = useResolveParam();
  const isLoading = !!useIsFetching();

  const formReturn = useForm<TForm>({
    defaultValues: initialForm,
    resolver: zodResolver(schema),
  });

  /* initialFormが変わったら、リセットする */
  useFormReset({
    initialForm,
    formReturn,
  });


  const {
    handleSubmit,
    //handleSubmitFinal,
  } = useSaveForm(formReturn);

  const {
    control,
  } = formReturn;

  if (isLoading) return (<LinearProgress />);

  return (
    <FormProvider {...formReturn}>
      <Form control={control}>
        <Stack 
          spacing={2}
        >
          <PageTitle3 label={`見積：${initialForm.estimateId ? '上書き編集中' : '新規作成中'}`} />
          
          <HeadSection /> 

          <Divider />

          <FormContents 
            handleSubmit={handleSubmit}
          />
          
        </Stack>

      </Form>
    </FormProvider>
  );
};
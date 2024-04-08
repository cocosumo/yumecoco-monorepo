import { PageSubTitle3, PageTitle3 } from 'kokoas-client/src/components';
import { Stack } from '@mui/material';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { TForm, schema } from './schema';
import { useResolveParams } from './hooks/useResolveParams';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearchProjects } from 'kokoas-client/src/components/reactHookForm';
import { pages } from '../Router';
import { OrderBudgetDataGrid } from './inputGrid/OrderBudgetDataGrid';
import { FooterActionButtons } from './sections/FooterActionButtons';
import { OrderTableLabel } from './sections/inputGridLabel/OrderTableLabel';
import { useEffect } from 'react';
import { Actions } from './sections/actions/Actions';


export const FormOrder = () => {

  const {
    newFormValues,
  } = useResolveParams();

  const formReturn = useForm<TForm>({
    defaultValues: newFormValues,
    resolver: zodResolver(schema),
    
  });

  const { control, reset } = formReturn;
  /* initialFormが変わったら、リセットする */

  useEffect(() => {
    reset({ ...newFormValues });
  }, [reset, newFormValues]);



  return (
    <FormProvider {...formReturn}>
      <Form
        noValidate
      >
        <Stack spacing={2}>
          <PageTitle3 
            label={'発注登録'}
          />
          <SearchProjects
            navigateTo={pages.projOrderInput}
            controllerProps={{
              name: 'projId',
              control,
            }}
          />

          <PageSubTitle3 label={<OrderTableLabel />} />

          <Actions />

          <OrderBudgetDataGrid />

          <FooterActionButtons />
            
        </Stack>
      </Form>
    </FormProvider>
  );
};
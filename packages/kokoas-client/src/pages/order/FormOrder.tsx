import { PageTitle3 } from 'kokoas-client/src/components';
import { Stack } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { TForm, schema } from './schema';
import { useResolveParams } from './hooks/useResolveParams';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'react-router-dom';
import { UnderDevelopmentAlert } from './common/UnderdevelopmentAlert';


export const FormOrder = () => {

  const {
    initialForm,
  } = useResolveParams();

  const formReturn = useForm<TForm>({
    defaultValues: initialForm,
    resolver: zodResolver(schema),
    
  });


  return (
    <FormProvider {...formReturn}>
      <Form
        noValidate
      >
        <Stack spacing={2}>
          <PageTitle3 
            label={'発注登録'}
          />
          <UnderDevelopmentAlert />
        
        </Stack>
      </Form>
    </FormProvider>
  );
};
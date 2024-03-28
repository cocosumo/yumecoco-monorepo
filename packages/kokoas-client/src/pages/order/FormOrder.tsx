import { PageTitle3 } from 'kokoas-client/src/components';
import { Stack } from '@mui/material';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { TForm, schema } from './schema';
import { useResolveParams } from './hooks/useResolveParams';
import { zodResolver } from '@hookform/resolvers/zod';
import { UnderDevelopmentAlert } from './common/UnderdevelopmentAlert';
import { SearchProjects } from 'kokoas-client/src/components/reactHookForm';
import { pages } from '../Router';


export const FormOrder = () => {

  const {
    initialForm,
  } = useResolveParams();

  const formReturn = useForm<TForm>({
    defaultValues: initialForm,
    resolver: zodResolver(schema),
    
  });

  const { control } = formReturn;


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
          <UnderDevelopmentAlert />
        
        </Stack>
      </Form>
    </FormProvider>
  );
};
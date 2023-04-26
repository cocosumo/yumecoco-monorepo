import { FormContainer, PageTitle } from 'kokoas-client/src/components';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import schema, { TypeOfForm } from './schema';
import { initialForm } from './form';
import { Grid } from '@mui/material';
import { SearchProjects } from 'kokoas-client/src/components/reactHookForm';
import { pages } from '../Router';

export const FormContract = () => {
  const formReturn = useForm<TypeOfForm>({
    defaultValues: initialForm,
    resolver: zodResolver(schema),
  });

  const { control } = formReturn;


  return (
    <FormProvider {...formReturn}>
      <FormContainer
        noValidate
      >
        <PageTitle label={'契約'} />
        <Grid item xs={12} md={4} >
          <SearchProjects
            navigateTo={pages.projContractPreviewV2}
            controllerProps={{
              name: 'projId',
              control,
            }}
          />
        </Grid>
      </FormContainer>

    </FormProvider>
  );
};
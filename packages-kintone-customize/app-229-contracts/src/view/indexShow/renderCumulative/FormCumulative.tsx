import { Form, FormProvider, useForm } from 'react-hook-form';
import { TForm, schema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { initialForm } from './form';
import { Stack } from '@mui/material';
import { Results } from './sections/results/Results';
import { Toolbar } from './sections/toolbar/Toolbar';

export const FormCumulative = () => {
  const formReturn = useForm<TForm>({
    defaultValues: initialForm,
    resolver: zodResolver(schema),
  });

  
  
  return (
    <FormProvider {...formReturn}>
      <Form
        noValidate
      >
        <Stack
          spacing={2}
          px={4}
          pt={2}
          pb={4}
        >

          <Toolbar />
          <Results />
        </Stack>

      </Form>
    </FormProvider>
  );
};
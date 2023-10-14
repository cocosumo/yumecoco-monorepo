import { Form, FormProvider, useForm } from 'react-hook-form';
import { TForm, schema } from './schema';
import { initialForm } from './form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import { Toolbar } from './sections/toolbar/Toolbar';
import { Results } from './sections/results/Results';

export const FormSchedule = () => {
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
          p={2}
          width={'fit-content'}
          height={'fit-content'}
          bgcolor={'#fff'}

        >
          <Toolbar />
          <Results />
        </Stack>

      </Form>
    </FormProvider>
  );
};
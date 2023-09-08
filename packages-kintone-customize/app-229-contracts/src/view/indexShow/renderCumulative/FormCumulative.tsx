import { Form, FormProvider, useForm } from 'react-hook-form';
import { TForm, schema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { initialForm } from './form';
import { Filter } from './sections/filter/Filter';
import { Stack } from '@mui/material';
import { FiscalYearResult } from './sections/fiscalYearResult/FiscalYearResult';

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
          pb={4}
        >

          <Filter />
          <FiscalYearResult />
        </Stack>

      </Form>
    </FormProvider>
  );
};
import { Form, FormProvider, useForm } from 'react-hook-form';
import { TForm, schema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { initialForm } from './form';

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
        Hello

      </Form>
    </FormProvider>
  );
};
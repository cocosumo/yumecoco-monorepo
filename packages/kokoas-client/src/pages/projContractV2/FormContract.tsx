import { FormContainer } from 'kokoas-client/src/components';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import schema, { TypeOfForm } from './schema';
import { initialForm } from './form';

export const FormContract = () => {
  const formReturn = useForm<TypeOfForm>({
    defaultValues: initialForm,
    resolver: zodResolver(schema),
  });


  return (
    <FormProvider {...formReturn}>
      <FormContainer
        noValidate
      >
        Hello
      </FormContainer>

    </FormProvider>
  );
};
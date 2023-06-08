
import { FormProvider, useForm } from 'react-hook-form';
import { initialForm } from './form';
import schema, { TypeOfForm } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Filter } from './sections/filter/Filter';
import { Stack } from '@mui/material';
import { PageTitle3 } from 'kokoas-client/src/components/ui/labels/PageTitle3';
import { Result } from './sections/result/Result';

export const FormProjectSearch = () => {
  const formReturn = useForm<TypeOfForm>({
    defaultValues: initialForm,
    resolver: zodResolver(schema),
    
  });

  return (
    <Stack
      spacing={2}
    >
      <PageTitle3 label='顧客一覧' color='#333333' />
      <FormProvider {...formReturn}>
        <Filter />
      </FormProvider>

      <Result />

    </Stack>
  );
};
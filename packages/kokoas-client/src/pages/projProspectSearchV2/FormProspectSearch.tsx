import { FormProvider, useForm } from 'react-hook-form';
import { TForm, schema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import { PageTitle3 } from 'kokoas-client/src/components';
import { useParseQuery } from './hooks/useParseQuery';
import { Filter } from './filter/Filter';
import { Result } from './result/Result';
//import parseISO from 'date-fns/parseISO';

export const FormProspectSearch = () => {
  const parsedQuery = useParseQuery();

  const formReturn = useForm<TForm>({
    defaultValues: {
      ...parsedQuery,
      //contractDateFrom: parseISO(parsedQuery.contractDateFrom),
      //contractDateTo: parseISO(parsedQuery.contractDateTo),
    },
    resolver: zodResolver(schema),
  });


  return (
    <Stack
      spacing={2}
    >
      <PageTitle3 label='見込一覧' color='#333333' />
      
      <FormProvider {...formReturn}>
        <Filter />
      </FormProvider>


      <Result />

    </Stack>
  );
};
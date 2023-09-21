import { FormProvider, useForm } from 'react-hook-form';
import { TForm, schema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import { PageTitle3 } from 'kokoas-client/src/components';
import { useParseQuery } from './hooks/useParseQuery';
import { Filter } from './filter/Filter';
import { Result } from './result/Result';
import { FilterChips } from './filter/FilterChips';
import { useEffect } from 'react';
//import parseISO from 'date-fns/parseISO';

export const FormProspectSearch = () => {
  const parsedQuery = useParseQuery();

  const formReturn = useForm<TForm>({
    defaultValues: {
      ...parsedQuery,
    },
    resolver: zodResolver(schema),
  });

  const { reset } = formReturn;

  useEffect(() => {
    reset(parsedQuery);
  }, [reset, parsedQuery]);


  return (
    <Stack
      spacing={2}
    >
      <PageTitle3 label='見込一覧' color='#333333' />

      <FormProvider {...formReturn}>
        <Filter />
      </FormProvider>
      <FilterChips />

      <Result />

    </Stack>
  );
};
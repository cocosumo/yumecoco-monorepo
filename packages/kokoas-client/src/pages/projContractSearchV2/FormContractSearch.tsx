import { PageTitle3 } from '../../components/ui/labels';

import { WrappedSearchField } from './parts/WrappedSearchField';
import { Results } from './parts/results/Results';
import { useFilteredContracts } from './hooks/useFilteredContracts';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { FilterForm } from './parts/filterDialog/FilterForm';
import { FilterChips } from './parts/filterChips/FilterChips';
import { useNewValuesFromParams } from './hooks/useNewValuesFromParams';
import { Stack } from '@mui/material';
import { TForm, schema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';

export const FormContractSearch = () => {
  const { data } = useFilteredContracts();
  const {
    items,
    minAmount,
    maxAmount,
  } = data || {};


  const newValues = useNewValuesFromParams();

  const methods = useForm<TForm>({
    defaultValues: {
      ...newValues,
    },
    resolver: zodResolver(schema),
  });


  const {
    reset,
  } = methods;

  useEffect(
    () => {
      reset(newValues);
    },
    [newValues, reset],
  );

  return (

    <Stack
      spacing={2}
    >
      <PageTitle3 label='契約一覧' />
      <FilterForm useFormMethods={methods}>
        <WrappedSearchField
          minAmount={minAmount}
          maxAmount={maxAmount}
        />
        <FilterChips />
        <Results items={items} />
      </FilterForm>
    </Stack>

  );
};
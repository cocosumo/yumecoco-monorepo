import { MainContainer } from '../../components/ui/containers';
import { PageTitle } from '../../components/ui/labels';

import { WrappedSearchField } from './parts/WrappedSearchField';
import { Results } from './parts/results/Results';
import { useFilteredContracts } from './hooks/useFilteredContracts';
import { useForm } from 'react-hook-form';
import { validationSchema } from './formValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { TypeOfForm } from './form';
import { FilterForm } from './parts/filterDialog/FilterForm';
import { FilterChips } from './parts/filterChips/FilterChips';
import { useNewValuesFromParams } from './hooks/useNewValuesFromParams';

export const FormContractSearch = () => {
  const { data } = useFilteredContracts();
  const {
    items,
    minAmount,
    maxAmount,
  } = data || {};


  const newValues = useNewValuesFromParams();

  const methods = useForm<TypeOfForm>({
    defaultValues: {
      ...newValues,
    },
    resolver: yupResolver(validationSchema as any),
  });


  const {
    reset,
  } = methods;

  useEffect(() => {
    reset(newValues);
  },
  [newValues, reset]);

  return (

    <MainContainer justifyContent={'center'}>
      <PageTitle label='契約一覧' />
      <FilterForm useFormMethods={methods}>
        <WrappedSearchField
          minAmount={minAmount}
          maxAmount={maxAmount}
        />
        <FilterChips />
        <Results items={items} />
      </FilterForm>
    </MainContainer>

  );
};
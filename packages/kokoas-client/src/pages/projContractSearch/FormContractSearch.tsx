import { MainContainer } from '../../components/ui/containers';
import { PageTitle } from '../../components/ui/labels';

import { WrappedSearchField } from './parts/WrappedSearchField';
import { Results } from './parts/results/Results';
import { useFilteredContracts } from './hooks/useFilteredContracts';
import { useForm } from 'react-hook-form';
import { validationSchema } from './formValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
import { initialValues, TypeOfForm } from './form';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { FilterForm } from './parts/filterDialog/FilterForm';
import { FilterChips } from './parts/filterChips/FilterChips';

export const FormContractSearch = () => {
  const { data } = useFilteredContracts();
  const {
    items,
    minAmount,
    maxAmount,
  } = data || {};

  const urlParams = useURLParams<TypeOfForm>();
  const {
    amountFrom,
    amountTo,
    contractDateFrom,
    contractDateTo,
  } = urlParams;

  const newValues = useMemo(() => {
    return {
      ...initialValues,
      contractDateFrom,
      contractDateTo,
      amountTo,
      amountFrom,
    };
  }, [
    amountTo,
    amountFrom,
    contractDateFrom,
    contractDateTo,
  ]);

  const methods = useForm<TypeOfForm>({
    defaultValues: newValues,
    resolver: yupResolver(validationSchema),
  });


  const {
    reset,
  } = methods;

  useEffect(() => {
    reset(newValues);
  },
  [newValues, reset],
  );

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
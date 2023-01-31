import { MainContainer } from '../../components/ui/containers';
import { PageTitle } from '../../components/ui/labels';

import { WrappedSearchField } from './parts/WrappedSearchField';
import { Results } from './parts/results/Results';
import { useFilteredContracts } from './hooks/useFilteredContracts';

export const FormContractSearch = () => {
  const { data } = useFilteredContracts();
  const {
    items,
    minAmount,
    maxAmount,
  } = data || {};

  return (

    <MainContainer justifyContent={'center'}>
      <PageTitle label='契約一覧' />
      <WrappedSearchField
        minAmount={minAmount}
        maxAmount={maxAmount}
      />

      <Results items={items} />
    </MainContainer>

  );
};
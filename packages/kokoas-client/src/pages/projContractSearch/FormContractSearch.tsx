import { MainContainer } from '../../components/ui/containers';
import { PageTitle } from '../../components/ui/labels';

import { WrappedSearchField } from './parts/WrappedSearchField';
import { Results } from './parts/Results';

export const FormContractSearch = () => {

  return (

    <MainContainer justifyContent={'center'}>
      <PageTitle label='契約一覧' />
      <WrappedSearchField />
      <Results />
    </MainContainer>

  );
};
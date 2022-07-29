import { Form } from 'formik';
import { MainContainer } from '../../components/ui/containers';
import { PageTitle } from '../../components/ui/labels';
import UnderConstruction from '../UnderConstruction';
import { FilterContainer } from './parts/filter/FilterContainer';
import { MainSearch } from './parts/MainSearch';

export const FormProjProspectSearch = () => {

  return (
    <Form noValidate>
      <MainContainer>
        <PageTitle label="見込み検索" />
        <MainSearch />
        <FilterContainer />
        <UnderConstruction />

      </MainContainer>
    </Form>
  );

};
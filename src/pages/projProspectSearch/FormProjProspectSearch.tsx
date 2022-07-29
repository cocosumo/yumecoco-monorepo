import { Form } from 'formik';
import { MainContainer } from '../../components/ui/containers';
import { PageTitle } from '../../components/ui/labels';
import UnderConstruction from '../UnderConstruction';
import { TSearchResult } from './api/searchProject';
import { FilterContainer } from './parts/filter/FilterContainer';
import { MainSearch } from './parts/MainSearch';
import { TableResult } from './parts/table/TableResult';

export const FormProjProspectSearch = ({
  list,
}: {
  list?: TSearchResult
}) => {

  return (
    <Form noValidate>
      <MainContainer>
        <PageTitle label="見込み検索" />
        <MainSearch />
        <FilterContainer />
        {list && <TableResult list={list} />}
        {!list && <UnderConstruction />}

      </MainContainer>
    </Form>
  );

};
import { Form, useFormikContext } from 'formik';
import { MainContainer } from '../../components/ui/containers';
import { PageTitle } from '../../components/ui/labels';
import { TSearchResult } from './api/searchProject';
import { TypeOfForm } from './form';
import { InitialResult } from './parts/common/InitialResult';
import { NoResult } from './parts/common/NoResult';
import { FilterContainer } from './parts/filter/FilterContainer';
import { MainSearch } from './parts/MainSearch';
import { TableResult } from './parts/table/TableResult';

export const FormProjProspectSearch = ({
  list,
}: {
  list?: TSearchResult
}) => {
  const { dirty } = useFormikContext<TypeOfForm>();
  const isWithResult = Boolean(list?.length);

  return (
    <Form noValidate>
      <MainContainer>
        <PageTitle label="見込み検索" />
        <MainSearch />
        <FilterContainer />
        {isWithResult && <TableResult list={list!} />}
        {!isWithResult && dirty && <NoResult />}
        {!isWithResult && !dirty && <InitialResult />}

      </MainContainer>
    </Form>
  );

};
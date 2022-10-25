import { Form } from 'formik';
import { MainContainer } from '../../components/ui/containers';
import { PageTitle } from '../../components/ui/labels';

import { ScrollToFieldError } from '../../components/utils/ScrollToFieldError';
import { renderSearch } from './parts/renderSearch';

export const FormContractSearch = () => {

  return (
    <Form noValidate>
      <ScrollToFieldError />
      <MainContainer justifyContent={'center'}>
        <PageTitle label='契約一覧' />
        {renderSearch('mainSearch')}

      </MainContainer>
    </Form>
  );
};
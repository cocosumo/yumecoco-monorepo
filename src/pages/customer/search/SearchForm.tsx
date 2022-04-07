import { Form } from 'formik';
import { MainContainer } from '../../../components/ui/containers';
import { PageTitle } from '../../../components/ui/labels/';
import { Fields, TableResult } from './parts';

export const SearchForm = () => {
  return (
    <Form noValidate>
      <MainContainer>
        <PageTitle label="顧客検索" color="#FFCB92" textColor='#333333' />
        <Fields/>
        <TableResult/>
      </MainContainer>

    </Form>
  );
};
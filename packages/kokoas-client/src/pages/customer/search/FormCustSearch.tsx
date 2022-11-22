import { Form } from 'formik';
import { MainContainer } from '../../../components/ui/containers';
import { PageTitle } from '../../../components/ui/labels';
import { Fields } from './parts';
import { TableResult } from './parts/TableResult/TableResult';

export const FormCustSearch = () => {
  return (
    <Form noValidate>
      <MainContainer>
        <PageTitle label="顧客検索" color="#FFCB92" textColor='#333333' />
        <Fields />
        <TableResult />
      </MainContainer>

    </Form>
  );
};
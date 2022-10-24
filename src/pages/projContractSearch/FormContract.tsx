import { Form } from 'formik';
import { MainContainer } from '../../components/ui/containers';
import { PageTitle } from '../../components/ui/labels';

import { ScrollToFieldError } from '../../components/utils/ScrollToFieldError';

export const FormContract = () => {

  return (
    <Form noValidate>
      <ScrollToFieldError />
      <MainContainer justifyContent={'space-between'}>
        <PageTitle label='契約' />


      </MainContainer>


    </Form>
  );
};
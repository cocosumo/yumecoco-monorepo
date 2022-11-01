import { Form } from 'formik';
import { ReactNode } from 'react';
import { MainContainer } from '../../../components/ui/containers';
import { ScrollToFieldError } from '../../../components/utils/ScrollToFieldError';

export const FormContainer = ({
  children,
}: {
  children: ReactNode
}) => {
  return (

    <Form noValidate>
      <ScrollToFieldError />

      <MainContainer >
        {children}
      </MainContainer>
    </Form>
  );
};
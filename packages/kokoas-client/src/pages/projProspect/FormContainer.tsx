import { Form } from 'formik';
import { MainContainer } from 'kokoas-client/src/components/ui/containers';
import { PageTitle } from 'kokoas-client/src/components/ui/labels';
import { ScrollToFieldError } from 'kokoas-client/src/components/utils/ScrollToFieldError';
import { ReactNode } from 'react';

export const FormContainer = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <Form noValidate>
      <ScrollToFieldError />
      <MainContainer >
        <PageTitle label='見込み登録' />
        {children}
      </MainContainer>

    </Form>
  );
};
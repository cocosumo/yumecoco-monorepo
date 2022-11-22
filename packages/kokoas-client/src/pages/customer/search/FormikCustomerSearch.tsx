import { Form, Formik } from 'formik';
import { MainContainer } from 'kokoas-client/src/components/ui/containers';
import { PageTitle } from 'kokoas-client/src/components/ui/labels';
import { useState } from 'react';
import { useSnackBar } from '../../../hooks';


import { initialValues } from './form';
import { useSearchResult } from './hooks/useSearchResult';
import { Fields } from './parts';
import { TableResult } from './parts/TableResult/TableResult';

export const FormikCustomerSearch = () => {

  const { setSnackState } = useSnackBar();
  const { data: rows } = useSearchResult();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async () => {

        setSnackState({
          severity: 'success',
          message: `${length ?? 0}件 見つかりました。`,
          open: true,
        });

      }}
    >

      <Form noValidate>
        <MainContainer>
          <PageTitle label="顧客検索" color="#FFCB92" textColor='#333333' />
          <Fields />
          <TableResult rows={rows || []} />
        </MainContainer>

      </Form>

    </Formik>);
};
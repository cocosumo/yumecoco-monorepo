import { Form, Formik } from 'formik';
import { MainContainer } from 'kokoas-client/src/components/ui/containers';
import { PageTitle } from 'kokoas-client/src/components/ui/labels';
import { useSnackBar } from 'kokoas-client/src/hooks';
import { useState } from 'react';

import { initialValues, TypeOfForm } from './form';
import { useSearchResult } from './hooks/useSearchResult';
import { Fields } from './parts';
import { TableResult } from './parts/TableResult/TableResult';

export const FormikCustomerSearch = () => {
  const { setSnackState } = useSnackBar();
  const [filter, setFilter] = useState<Partial<TypeOfForm>>(initialValues);
  const { 
    data: rows, 
  } = useSearchResult(filter);

  /*   useEffect(() => {
    if (rows?.length) {
      setSnackState({
        open: true,
        message: `検索結果： ${rows.length}件`,
      });
    }
  }, [rows, setSnackState]);
 */
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        setFilter(values);
        setSnackState({
          open: true,
          message: '検索が成功しました',
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
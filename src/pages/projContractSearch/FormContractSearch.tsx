import { Grid } from '@mui/material';
import { Form } from 'formik';
import { MainContainer } from '../../components/ui/containers';
import { PageTitle } from '../../components/ui/labels';

import { ScrollToFieldError } from '../../components/utils/ScrollToFieldError';
import { WrappedSearchField } from './parts/WrappedSearchField';
import { Results } from './parts/Results';

export const FormContractSearch = () => {

  return (
    <Form noValidate>
      <ScrollToFieldError />
      <MainContainer justifyContent={'center'}>
        <PageTitle label='契約一覧' />
        <WrappedSearchField name={'mainSearch'} />
        <Grid item
          xs={12}
          md={10}
          mt={4}
        >
          <Results />
        </Grid>
      </MainContainer>
    </Form>
  );
};
import { Grid } from '@mui/material';
import { Form, useFormikContext } from 'formik';
import { useState } from 'react';
import { MainContainer } from '../../components/ui/containers';
import { PageTitle } from '../../components/ui/labels';
import { FormikSearchField } from '../../components/ui/textfield/FormikSearchField';
import { TSearchResult } from './api/searchProject';
import { getFieldName, TypeOfForm } from './form';
import { InitialResult } from './parts/common/InitialResult';
import { NoResult } from './parts/common/NoResult';
import { FilterContainer } from './parts/filter/FilterContainer';
import { TableResult } from './parts/table/TableResult';

export const FormProjProspectSearch = ({
  list,
}: {
  list?: TSearchResult
}) => {
  const [open, setOpen] = useState(false);
  const handleCloseFilterDialog = () => setOpen(false);
  const handleOpenFilterDialog = () => setOpen(true);

  const { dirty } = useFormikContext<TypeOfForm>();
  const isWithResult = Boolean(list?.length);

  return (
    <Form noValidate>
      <MainContainer justifyContent={'center'}>
        <PageTitle label="見込一覧" />
        <Grid item xs={12} md={8}>
          <FormikSearchField
            name={getFieldName('mainSearch')}
            onOpenFilter={handleOpenFilterDialog}
          />
        </Grid>

        <FilterContainer
          open={open}
          handleCloseFilterDialog={handleCloseFilterDialog}
        />
        {isWithResult && <TableResult list={list!} />}
        {!isWithResult && dirty && <NoResult />}
        {!isWithResult && !dirty && <InitialResult />}

      </MainContainer>
    </Form>
  );

};
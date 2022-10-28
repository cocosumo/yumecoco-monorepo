import { Grid } from '@mui/material';
import { useFormikContext } from 'formik';
import { FormikSearchField } from '../../../components/ui/textfield/FormikSearchField';
import { KeyOfForm, TypeOfForm } from '../form';
import { FilterDialog } from './filterDialog/FilterDialog';

export const WrappedSearchField = ({ name }: { name: KeyOfForm }) => {
  const dialogFieldKey : KeyOfForm = 'isFilterOpen';

  const { setFieldValue } = useFormikContext<TypeOfForm>();
  const handleFilterOpen = () => setFieldValue(dialogFieldKey, true);
  const handleFilterClose = () => setFieldValue(dialogFieldKey, false);

  return (
    <Grid item xs={12} md={8}>
      <FilterDialog handleClose={handleFilterClose} />
      <FormikSearchField name={name} onOpenFilter={handleFilterOpen} />
    </Grid>
  );
};
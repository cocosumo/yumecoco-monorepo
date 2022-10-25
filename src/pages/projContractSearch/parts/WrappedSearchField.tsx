import { Grid } from '@mui/material';
import { FormikSearchField } from '../../../components/ui/textfield/FormikSearchField';
import { KeyOfForm } from '../form';

export const WrappedSearchField = ({ name }: { name: KeyOfForm }) => {
  return (
    <Grid item xs={12} md={8}>
      <FormikSearchField name={name} />
    </Grid>
  );
};
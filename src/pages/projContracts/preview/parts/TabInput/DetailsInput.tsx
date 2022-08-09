import { Grid } from '@mui/material';
import { FormikTextField } from '../../../../../components/ui/textfield';
import { getFieldName } from '../../form';

export const DetailsInput = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={4}>
        <FormikTextField name={getFieldName('contractPrice')} label={'契約金'} type="number" />
      </Grid>

    </Grid>
  );
};
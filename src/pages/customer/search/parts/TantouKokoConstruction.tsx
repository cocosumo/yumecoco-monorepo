
import { Grid } from '@mui/material';

import { FormikSelect } from '../../../../components/ui/selects';
import { FormFieldNames } from '../form';

export const TantouKokoConstruction = () => {
  return (
    <Grid item xs={12} md={2}>
      <FormikSelect name={'kokoConstruction' as FormFieldNames } label='ここすも工事' />
    </Grid>
  );
};
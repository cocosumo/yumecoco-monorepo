
import { Grid } from '@mui/material';

import { FormikSelect } from '../../../../components/ui/selects';
import { FormFieldNames } from '../form';

export const TantouKokoAG = () => {
  return (
    <Grid item xs={12} md={2}>
      <FormikSelect name={'kokoAG' as FormFieldNames } label='ここすも営業' />
    </Grid>
  );
};
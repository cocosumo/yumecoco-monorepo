
import { Grid } from '@mui/material';

import { FormikSelect } from '../../../../components/ui/selects';
import { FormFieldNames } from '../form';

export const TantouYumeAG = () => {
  return (
    <Grid item xs={12} md={2}>
      <FormikSelect name={'yumeAG' as FormFieldNames } label='ゆめてつAG' />
    </Grid>
  );
};
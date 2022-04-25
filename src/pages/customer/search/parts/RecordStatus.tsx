
import { Grid } from '@mui/material';
import { FormikCheckBoxes } from '../../../../components/ui/checkboxes';

import { FormFieldKeys, recordStatuses } from '../form';


export const RecordStatus = () => {
  return (
    <Grid item xs={12}>
      <FormikCheckBoxes name={'storeId' as FormFieldKeys } label='状態' choices={recordStatuses}/>
    </Grid>
  );
};
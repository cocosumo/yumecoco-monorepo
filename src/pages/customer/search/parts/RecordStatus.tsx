
import { Grid } from '@mui/material';
import { useRef } from 'react';
import { FormikCheckBoxes } from '../../../../components/ui/checkboxes';

import { FormFieldKeys } from '../form';
import { recordStatuses } from '../../../../config/formValues';

export const RecordStatus = () => {
  const recordOptions = useRef(recordStatuses.map(item=>({ label: item, value: item })));

  return (
    <Grid item xs={12}>
      <FormikCheckBoxes
        name={'recordStatus' as FormFieldKeys}
        label='状態'
        choices={recordOptions.current} 
      />
    </Grid>
  );
};
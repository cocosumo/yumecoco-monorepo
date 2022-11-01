import { Grid, Stack } from '@mui/material';
import { useState } from 'react';
import { LabeledCheckBox } from '../../../components/ui/checkboxes';
import { FormikDatePicker } from '../../../components/ui/datetimepickers';
import { getFieldName } from '../form';

export const PlannedPaymentDate = () => {
  const [pendingChk, setPendingChk] = useState(false);

  const chkHandler = () => {
    setPendingChk((prev) => !prev);
  };

  return (
    <Stack direction={'row'} spacing={2} alignItems={'end'}>
      <Grid item xs={12} md={8}>
        <FormikDatePicker
          label='入金予定日'
          name={getFieldName('plannedPaymentDate')}
          disabled={pendingChk}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <LabeledCheckBox
          label='未定'
          checked={pendingChk}
          setCheckedHandler={chkHandler}
        />
      </Grid>
    </Stack>
  );
};
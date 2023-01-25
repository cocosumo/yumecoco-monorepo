import { Grid, Stack } from '@mui/material';
import { useFormikContext } from 'formik';
import { FormikLabeledCheckBox } from '../../../components/ui/checkboxes';
import { FormikJADatePicker } from '../../../components/ui/datetimepickers';
import { getFieldName, TypeOfForm } from '../form';

/**
 * 支払い予定日コンポーネント
 * @returns 
 */
export const PlannedPaymentDate = () => {
  const { values } = useFormikContext<TypeOfForm>();
  const { undecidedPaymentDate } = values;

  return (
    <Stack direction={'row'} spacing={2} alignItems={'end'}>
      <Grid item xs={12} md={7}>
        <FormikJADatePicker
          label='入金予定日'
          name={getFieldName('plannedPaymentDate')}
          disabled={undecidedPaymentDate}
        />
      </Grid>

      <Grid item xs={12} md={5}>
        <FormikLabeledCheckBox
          name={getFieldName('undecidedPaymentDate')}
          label='未定'
          checked={undecidedPaymentDate}
        />
      </Grid>
    </Stack>
  );
};
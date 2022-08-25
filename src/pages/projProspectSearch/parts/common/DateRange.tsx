import { Grid, Stack  } from '@mui/material';
import {  KeyOfForm } from '../../form';
import { FormikDatePicker } from '../../../../components/ui/datetimepickers';
import { RangeIcon } from './RangeIcon';


export const DateRange = (props : {
  fieldNames : [KeyOfForm, KeyOfForm],
  label: string,
}) => {
  const { fieldNames, label } = props;
  const [fromField, toField] = fieldNames;
  return (
    <Grid item xs={12}>
      <Stack direction={'row'} spacing={2} alignItems={'center'}>
        <FormikDatePicker name={fromField} label={label} size={'small'} />
        <RangeIcon/>
        <FormikDatePicker name={toField} label={label} size={'small'} />
      </Stack>
    </Grid>
  );
};
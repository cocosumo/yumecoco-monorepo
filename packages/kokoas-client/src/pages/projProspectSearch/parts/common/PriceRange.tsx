import { Grid, Stack  } from '@mui/material';
import {  KeyOfForm } from '../../form';
import { FormikTextField } from '../../../../components/ui/textfield';
import { RangeIcon } from './RangeIcon';

export const PriceRange = (props : {
  fieldNames : [KeyOfForm, KeyOfForm],
  label: string,
}) => {
  const { fieldNames, label } = props;
  const [fromField, toField] = fieldNames;
  return (
    <Grid item xs={12}>
      <Stack direction={'row'} spacing={2} alignItems={'center'}>
        <FormikTextField name={fromField} label={label} size={'small'}
          type={'number'} endAdornment={'万円'}
        />
        <RangeIcon />
        <FormikTextField name={toField} label={label} size={'small'}
          type={'number'} endAdornment={'万円'}
        />
      </Stack>
    </Grid>
  );
};
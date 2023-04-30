import { Checkbox, FormControlLabel } from '@mui/material';
import { Stack } from '@mui/system';
import { TypeOfForm } from '../schema';
import { useFormContext, useWatch } from 'react-hook-form';
import { ControlledCurrencyInput } from '../fields/ControlledCurrencyInput';

export const RefundAmount = () => {
  const { register, control } = useFormContext<TypeOfForm>();

  const isChecked = useWatch({
    control,
    name: 'hasRefund',
  });

  return (
    <Stack direction={'row'} spacing={2}>
      <FormControlLabel
        label={'返金額'}
        control={(
          <Checkbox
            {...register('hasRefund')}
            sx={{
              transform: 'scale(1.5)',
            }}
          />)}
      />
      <ControlledCurrencyInput 
        name="refundAmt" 
        variant='standard'
        disabled={!isChecked}
      />

    </Stack>
  );
};
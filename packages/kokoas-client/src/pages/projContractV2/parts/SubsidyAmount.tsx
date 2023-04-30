import { Checkbox, FormControlLabel, Stack } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import { TypeOfForm } from '../schema';
import { ControlledCurrencyInput } from '../fields/ControlledCurrencyInput';

export const SubsidyAmount = () => {
  const { register, control } = useFormContext<TypeOfForm>();

  const isChecked = useWatch({
    control,
    name: 'hasSubsidy',
  });
  return (
    <Stack direction={'row'} spacing={2}>
      <FormControlLabel
        label={'補助金'}
        control={(
          <Checkbox
            {...register('hasSubsidy')}
            sx={{
              transform: 'scale(1.5)',
            }}
          />)}
      />
      <ControlledCurrencyInput 
        name="subsidyAmt" 
        variant='standard'
        disabled={!isChecked}
      />

    </Stack>
  );
};
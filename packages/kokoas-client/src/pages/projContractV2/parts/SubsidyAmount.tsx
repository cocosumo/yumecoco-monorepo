import { Checkbox, FormControl, FormControlLabel, Radio, RadioGroup, Stack } from '@mui/material';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { TypeOfForm, subsidyTypes } from '../schema';
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

      {/* uncontrolledのやり方だと null　になるので、controlledにする */}
      <Controller
        name={'subsidyType'}
        control={control}
        render={({
          field: {
            onChange,
            ...otherFieldProps
          },
        }) => {
          return (
            <FormControl disabled={!isChecked}>
              <RadioGroup 
                row
                {...otherFieldProps}
                onChange={(_, value) => onChange(value)}
              >
                {subsidyTypes
                  .map((value) => (
                    <FormControlLabel 
                      key={value} 
                      value={value} 
                      control={<Radio />}
                      label={value}
                      sx={{ mr: 0, ml: 1 }}
                    /> 
                  ))}
              </RadioGroup>
            </FormControl>
          );
        }}
      />
    </Stack>
  );
};
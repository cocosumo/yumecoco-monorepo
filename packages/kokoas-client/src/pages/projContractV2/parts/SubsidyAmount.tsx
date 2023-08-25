import { Checkbox, FormControlLabel, Stack } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import { TypeOfForm } from '../schema';
import { ControlledCurrencyInput } from '../fields/ControlledCurrencyInput';

export const SubsidyAmount = () => {
  const { register, control, setValue, getFieldState } = useFormContext<TypeOfForm>();

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
            checked={isChecked}
            {...register('hasSubsidy', {
              onChange: (e) => {
                if (!e.target.checked) {
                  // チェックを外したら、エラーがあればクリアする
                  const { error } = getFieldState('subsidyAmt');
                  if (error) {
                    setValue('subsidyAmt', 0, { shouldValidate: true });
                  }
                }
              },
            })}
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
      {/* <Controller
        name={'subsidyMethod'}
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
                onChange={(_, value) => onChange(value as typeof subsidyMethods[number])}
              >
                {subsidyMethods
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
      /> */}
    </Stack>
  );
};
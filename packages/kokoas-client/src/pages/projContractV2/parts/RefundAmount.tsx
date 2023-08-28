import { Checkbox, FormControl, FormControlLabel, InputAdornment, Radio, RadioGroup, Stack } from '@mui/material';
import { TypeOfForm, refundMethod } from '../schema';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { ControlledCurrencyInput } from '../fields/ControlledCurrencyInput';

export const RefundAmount = () => {
  const { 
    control, 
    register,  
    setValue,
    getFieldState, 
  } = useFormContext<TypeOfForm>();

  const isChecked = useWatch({
    control,
    name: 'hasRefund',
  });

  return (
    <Stack direction={'row'} spacing={2}>
      <FormControlLabel
        label={'返金'}
        sx={{
          width: '90px',
        }}
        control={(
          <Checkbox
            checked={isChecked}
            {...register('hasRefund', {
              onChange: (e) => {
                if (!e.target.checked) {
                  // チェックを外したら、エラーがあればクリアする
                  const { error } = getFieldState('refundAmt');
                  if (error) {
                    setValue('refundAmt', 0);
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
        name="refundAmt" 
        variant='outlined'
        disabled={!isChecked}
        width={260}
        startAdornment={(
          <InputAdornment position='start'>
            ▲
          </InputAdornment>
          )}
      />

      <Controller
        name={'refundMethod'}
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
                onChange={(_, value) => onChange(value as typeof refundMethod[number])}
              >
                {refundMethod
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
import { Checkbox, FormControlLabel, InputAdornment, Stack } from '@mui/material';
import { TypeOfForm } from '../schema';
import { useFormContext, useWatch } from 'react-hook-form';
import { ControlledCurrencyInput } from '../fields/ControlledCurrencyInput';

export const ReductionAmount = () => {
  const { 
    control, 
    register,  
    setValue,
    getFieldState, 
  } = useFormContext<TypeOfForm>();

  const isChecked = useWatch({
    control,
    name: 'hasReduction',
  });

  return (
    <Stack 
      direction={'row'} 
      spacing={2}
    >
      <FormControlLabel
        label={'減額'}
        sx={{
          width: '90px',
        }}
        control={(
          <Checkbox
            checked={isChecked}
            {...register('hasReduction', {
              onChange: (e) => {
                if (!e.target.checked) {
                  // チェックを外したら、エラーがあればクリアする
                  const { error } = getFieldState('reductionAmt');
                  if (error) {
                    setValue('reductionAmt', 0);
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
        name="reductionAmt" 
        variant='outlined'
        startAdornment={(
          <InputAdornment position='start'>
            ▲
          </InputAdornment>
          )}
        disabled={!isChecked}
      />

    </Stack>
  );
};
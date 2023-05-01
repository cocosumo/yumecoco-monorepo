import { Checkbox, FormControlLabel, Stack } from '@mui/material';
import { TypeOfForm } from '../schema';
import { useFormContext, useWatch } from 'react-hook-form';
import { ControlledCurrencyInput } from '../fields/ControlledCurrencyInput';

export const RefundAmount = () => {
  const { 
    control, 
    register,  
    resetField,
    getFieldState, 
  } = useFormContext<TypeOfForm>();

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
            {...register('hasRefund', {
              onChange: (e) => {
                if (!e.target.checked) {
                  // チェックを外したら、エラーがあればクリアする
                  const { error } = getFieldState('refundAmt');
                  if (error) {
                    resetField('refundAmt');
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
        variant='standard'
        disabled={!isChecked}
      />

    </Stack>
  );
};
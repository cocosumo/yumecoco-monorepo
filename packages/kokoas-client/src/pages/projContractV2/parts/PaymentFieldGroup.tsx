import { Checkbox, FormControlLabel, Stack } from '@mui/material';
import { ControlledCurrencyInput } from '../fields/ControlledCurrencyInput';
import { ControlledDatePicker } from '../fields/ControlledDatePicker';
import { KeyOfForm } from '../form';
import { useFormContext, useWatch } from 'react-hook-form';
import { TypeOfForm } from '../schema';


export const PaymentFieldGroup = (
  {
    fieldNames,
    label,
  }: {
    label: string,
    fieldNames: {
      chkFldName: KeyOfForm,
      amtFldName: KeyOfForm,
      dateFldName: KeyOfForm,
    }
  },
) => {

  const { 
    chkFldName, 
    amtFldName, 
    dateFldName, 
  } = fieldNames;

  const { register, control, setValue, getFieldState } = useFormContext<TypeOfForm>();
  const isChecked = useWatch({
    control,
    name: chkFldName,
  });

  return (
    <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
      <FormControlLabel
        label={label}
        name={chkFldName}
        control={(
          <Checkbox
            {...register(chkFldName, {
              onChange: (e) => {
                if (!e.target.checked) {
                  // チェックを外したら、エラーがあればクリアする
                  const { error: amtFldErr } = getFieldState(amtFldName);
                  const { error: dateFldErr } = getFieldState(dateFldName);
                  if (amtFldErr) {
                    setValue(amtFldName, null, { shouldValidate: true });
                  }
                  if (dateFldErr) {
                    setValue(dateFldName, null, { shouldValidate: true });
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
        name={amtFldName} 
        variant='standard'
        disabled={!isChecked}
      />
      <ControlledDatePicker 
        name={dateFldName}
        disabled={!isChecked}
      />
    </Stack>
  );
};
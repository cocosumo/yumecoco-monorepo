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

  const { register, control } = useFormContext<TypeOfForm>();
  const isChecked = useWatch({
    control,
    name: chkFldName,
  });

  return (
    <Stack direction={'row'} spacing={2}>
      <FormControlLabel
        label={label}
        name={chkFldName}
        control={(
          <Checkbox
            {...register(chkFldName)}
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
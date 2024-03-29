import { FormControl, FormLabel, InputAdornment, Stack, TextField } from '@mui/material';
import { ControlledDatePicker } from '../fields/ControlledDatePicker';
import { KeyOfForm } from '../form';
import { useFormContext, useFormState } from 'react-hook-form';
import { TypeOfForm } from '../schema';

export const ConstructionDates = ({
  label,
  dateFldName,
  daysFldName,
  disabled,
}: {
  label: string
  dateFldName: KeyOfForm
  daysFldName: KeyOfForm
  disabled?: boolean,
}) => {
  const {
    register,
    control,
  } = useFormContext<TypeOfForm>();

  const { errors: {
    [daysFldName]: daysFldNameErr,
  } } = useFormState({
    name: daysFldName,
    control,
  });


  return (
    <FormControl fullWidth>
      <FormLabel>
        {label}
      </FormLabel>
      <Stack direction={'row'} spacing={2}> 
        <ControlledDatePicker disabled={disabled} name={dateFldName} width='50%' />
        <TextField 
          {...register(daysFldName, { setValueAs(value) {
            return Number(value);
          } })}
          sx={{ width: '50%' }} 
          fullWidth
          type='number'
          variant='standard'
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                契約の日から
              </InputAdornment>),
            endAdornment: (
              <InputAdornment position="end">
                日以内
              </InputAdornment>),
          }}
          inputProps={{
            sx: {
              textAlign: 'right',
            },
          }}
          error={!!daysFldNameErr}
          helperText={daysFldNameErr?.message}
          disabled={disabled}
        />
      </Stack>
    </FormControl>
  );
};
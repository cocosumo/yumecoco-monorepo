import { FormControl, FormLabel, InputAdornment, Stack, TextField } from '@mui/material';
import { ControlledDatePicker } from '../fields/ControlledDatePicker';
import { KeyOfForm } from '../form';
import { useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../schema';

export const ConstructionDates = ({
  label,
  dateFldName,
  daysFldName,
}: {
  label: string
  dateFldName: KeyOfForm
  daysFldName: KeyOfForm
}) => {
  const {
    register,
  } = useFormContext<TypeOfForm>();

  return (
    <FormControl fullWidth>
      <FormLabel>
        {label}
      </FormLabel>
      <Stack direction={'row'} spacing={2}> 
        <ControlledDatePicker name={dateFldName} width='50%' />
        <TextField 
          {...register(daysFldName)}
          sx={{ width: '50%' }} 
          fullWidth
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
        />
      </Stack>
    </FormControl>
  );
};
import { Controller, useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../../../schema';
import { Checkbox, FormControlLabel } from '@mui/material';

export const IncludeRetired = () => {
  const {
    control,
  } = useFormContext<TypeOfForm>();


  return (
    <Controller
      name='includeRetired'
      control={control}
      render={({
        field: {
          value,
          onChange,
        },
      }) => (
        <FormControlLabel 
          control={<Checkbox checked={value} />} 
          label="退職者を含む"
          onChange={(_, checked) => onChange(checked)}
        />
      )}
    />


  );
};
import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../hooks';
import { Checkbox, FormControlLabel } from '@mui/material';

export const IsNotCocoConstConfirmed = () => {
  const { control, trigger } = useTypedFormContext(); 
  return (
    <Controller 
      name={'isNotCocoConstConfirmed'}
      control={control}
      render={({
        field: {
          value,
          onChange,
          ...otherFieldProps
        },
      }) => {

        return (
          <FormControlLabel 
            onChange={(_, checked) => {
              onChange(checked);
              trigger('cocoConst.0');
            }}
            control={<Checkbox checked={value} />} 
            label="未定"
            {...otherFieldProps}
          />

        );
      }}
    />
  );
  
};
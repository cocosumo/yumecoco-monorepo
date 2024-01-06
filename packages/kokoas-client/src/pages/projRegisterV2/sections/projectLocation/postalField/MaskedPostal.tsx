import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../../hooks/useTypedRHF';
import { KForm } from '../../../schema';
import { PatternFormat  } from 'react-number-format';




export const MaskedPostal = ({
  disabled,
  name,
  label = '郵便番号',
  required,
}:{
  disabled?: boolean;
  name: KForm,
  label?: string,
  required?: boolean,
}) => {
  const { control } = useTypedFormContext();


  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: {
          onChange,
          onBlur,
          value,
          ref,
        },
        fieldState: {
          error,
          isTouched,
        },
      }) => {
        const showError = !!error && isTouched;
        return (
          <PatternFormat 
            value={(value as string).replace('-', '')} 
            format="###-####"
            onValueChange={(e) => {
              console.log('onValueChanges', e);
              onChange(e.value);
            }}
            onBlur={onBlur}
            name="postal"
            customInput={TextField}
            error={showError}
            size='small'
            label={label}
            disabled={disabled}
            required={required}
            inputRef={ref}
            InputProps={{
              sx: {
                width: 150,
              },
            }}
          />
        );
      }}
    />


  );
};
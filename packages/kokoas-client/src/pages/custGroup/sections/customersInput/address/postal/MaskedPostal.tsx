import { TextField } from '@mui/material';
import { useTypedFormContext } from 'kokoas-client/src/pages/custGroup/hooks/useTypedHooks';
import { Controller } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';



export const MaskedPostal = ({
  disabled,
  label = '郵便番号',
  required,
  index,
}:{
  disabled?: boolean;
  label?: string,
  required?: boolean,
  index: number,
}) => {
  const { control } = useTypedFormContext();


  return (
    <Controller
      control={control}
      name={`customers.${index}.postal`}
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
        formState: {
          isSubmitted,
        },
      }) => {
        const showError = !!error && (isTouched || isSubmitted);

        return (
          <PatternFormat 
            value={(value as string).replace('-', '')} 
            format="###-####"
            onValueChange={(e) => {
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
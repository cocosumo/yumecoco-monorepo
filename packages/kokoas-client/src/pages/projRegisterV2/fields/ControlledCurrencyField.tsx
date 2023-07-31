import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../hooks/useTypedRHF';
import { KForm } from '../schema';
import { fieldMapJa } from '../api/fieldMapJa';
import { NumberCommaField } from 'kokoas-client/src/components/ui/textfield/NumberCommaField';

export const ControlledCurrencyField = ({
  name,
  label,
  placeholder,
  disabled = false,
  required,
  helperText,
  fullWidth,
}:{
  name: KForm,
  label?: string,
  width?: number;
  placeholder?: string,
  disabled?: boolean,
  required?: boolean,
  helperText?: string,
  fullWidth?: boolean,
}) => {
  const {
    control,
  } = useTypedFormContext();
  

  return (
    <Controller 
      control={control}
      name={name}
      render={({
        field:{
          onChange,
          value,
          ref,
        },
        fieldState: {
          error,
          isTouched,
        },
        formState: {
          isDirty,
        },
      }) => {

        const showError = (isTouched || isDirty) && !!error;
        return (
          <NumberCommaField
            name={name}
            onChange={onChange}
            value={value as string}
            inputRef={ref}
            label={label || fieldMapJa[name]}
            variant={'outlined'}
            size='small'
            error={showError}
            disabled={disabled}
            placeholder={placeholder}
            helperText={error?.message || helperText}
            required={required}
            fullWidth={fullWidth}

          />
        );
      }}
    />

  );
};
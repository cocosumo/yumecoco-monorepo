import { JADatePicker } from 'kokoas-client/src/components';
import { FieldError } from 'react-hook-form';

export const CustomDate = ({
  value,
  onChange,
  error,
  label,
}:{
  value: Date | null,
  onChange: (date: Date) => void,
  error?: FieldError,
  label?: string,
}) => {

  return (
    <JADatePicker
      value={value || null}
      onChange={onChange}
      label={label}
      slotProps={{
        textField:{
          variant: 'outlined',
          size: 'small',
          fullWidth: true,
          error: !!error,
          helperText: error?.message,
        },
      }}
      sx={{
        maxWidth: '150px',
      }}
    />
  );
};
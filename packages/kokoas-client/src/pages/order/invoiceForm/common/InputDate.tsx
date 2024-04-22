import { JADatePicker } from 'kokoas-client/src/components';

export interface InputDateProps {
  label: string;
  required?: boolean;
}

export const InputDate = ({
  label,
  required,
} : InputDateProps) => {

  return (
    <JADatePicker
      label={label}
      slotProps={{
        textField: {
          variant: 'outlined',
          size: 'small',
          fullWidth: true,
          required,
        },
      }}

    />
  );

};
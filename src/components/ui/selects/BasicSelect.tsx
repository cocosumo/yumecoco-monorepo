import { FormControl, Select, MenuItem, InputLabel, FormHelperText, SelectChangeEvent } from '@mui/material';
import { InputField } from '../../../types/forms';



export interface BasicSelectProps extends Partial<InputField> {
  options: Options,
  name: string,
  disabled?: boolean,
  onChange?: ((event: SelectChangeEvent<string>, child: React.ReactNode) => void) | undefined
}

export default function BasicSelect({ label, hasError, name, options, value, helperText, isRequired, disabled, onChange }: BasicSelectProps) {

  return (
    <FormControl required={isRequired} fullWidth error={hasError}>
      <InputLabel error={hasError}>{label}</InputLabel>
      <Select error={hasError} name={name} label={label} required={isRequired} value={value} onChange={onChange} disabled={disabled}>

        {
          options !== null &&
          options.map((option) => <MenuItem key={option.value || option.label} value={option.value || option.label}>{option.label}</MenuItem>)
        }
      </Select>
      <FormHelperText error={hasError}>{helperText}</FormHelperText>
    </FormControl>
  );
}
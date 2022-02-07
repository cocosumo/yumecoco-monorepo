import { FormControl, Select, MenuItem, InputLabel, FormHelperText, SelectChangeEvent } from '@mui/material';
import { InputField } from '../../../types/forms';



export interface BasicSelectProps extends Partial<InputField> {
  options: Options,
  name: string
  onChange?: ((event: SelectChangeEvent<string>, child: React.ReactNode) => void) | undefined
}

export default function BasicSelect({ label, hasError, name, options, value, helperText, isRequired, onChange } : BasicSelectProps) {

  return (
    <FormControl required={isRequired} fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select error={hasError} name={name} label={label} required={isRequired} value={value} onChange={onChange}>
        {options.map((option) => <MenuItem key={option.value || option.label} value={option.value || option.label}>{option.label}</MenuItem>)}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}
import { FormControl, Select, MenuItem, InputLabel, FormHelperText, SelectChangeEvent } from '@mui/material';

interface BasicSelectProps {
  label: string,
  options: Options,
  name?: string,
  value?: string,
  helperText?: string,
  required?: boolean,
  onChange?: ((event: SelectChangeEvent<string>, child: React.ReactNode) => void) | undefined
}

export default function BasicSelect({ label, name, options, value, helperText, required, onChange } : BasicSelectProps) {
  return (
    <FormControl required={required} fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select name={name} label={label} required={required} value={value} onChange={onChange}>
        {options.map((option) => <MenuItem key={option.key || option.text} value={option.key || option.text}>{option.text}</MenuItem>)}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}
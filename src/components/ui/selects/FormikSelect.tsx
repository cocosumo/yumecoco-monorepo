import { FormControl, Select, MenuItem, InputLabel, FormHelperText, Stack } from '@mui/material';

import { useField } from 'formik';
import Chip from '@mui/material/Chip';



export interface FormikSelecProps {
  options?: Options,
  name: string,
  label: string
  required?: boolean
  helperText?: string
}

export function FormikSelect(props : FormikSelecProps) {
  const [fields, meta] = useField(props);

  return (
    <FormControl required={props.required} fullWidth error={!!meta.error}>
      <InputLabel error={!!meta.error}>{props.label}</InputLabel>
      <Select  error={!!meta.error} label={props.label} required={props.required} {...fields}>

        {
          props.options &&
          props.options.map((option) => <MenuItem key={option.value || option.label} value={option.value || option.label}>
            <Stack direction="row" spacing={1}>
              {option.secondaryLabel && <Chip label={option.secondaryLabel} variant="outlined" size="small"/>}
              <div>{option.label}</div>
            </Stack>
          </MenuItem>)
        }
      </Select>
      <FormHelperText error={!!meta.error}>{meta.error}</FormHelperText>
      {props.helperText && <FormHelperText>{props.helperText}</FormHelperText>}
    </FormControl>
  );
}
import { FormControl, Select, MenuItem, InputLabel, FormHelperText, Stack } from '@mui/material';

import { useField } from 'formik';
import Chip from '@mui/material/Chip';



export interface FormikSelecProps {
  options?: Options,
  name: string,
  label: string
  isRequired?: boolean
}

export function FormikSelect(props : FormikSelecProps) {
  const [fields, meta, helpers] = useField(props);
  console.log(fields);
  return (
    <FormControl required={props.isRequired} fullWidth error={!!meta.error}>
      <InputLabel error={!!meta.error}>{props.label}</InputLabel>
      <Select error={!!meta.error} name={props.name} label={props.label} required={props.isRequired} value={fields.value  ?? ''} onChange={ (e) => helpers.setValue(e.target.value)}>

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
    </FormControl>
  );
}
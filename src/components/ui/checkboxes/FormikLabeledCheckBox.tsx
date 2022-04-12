import { FormControlLabel, Checkbox, FormControl, FormHelperText } from '@mui/material';
import { useField } from 'formik';

interface FormikLabeledCheckBoxProps {
  label?: string,
  defaultVal?: boolean
  name: string
  helperText?: string,
}

export const FormikLabeledCheckBox = (props : FormikLabeledCheckBoxProps) =>{
  const {
    label = '',
    helperText = '',
    defaultVal = false,
  } = props;

  const [field, meta, helpers] = useField(props);

  let dirtyVal: boolean = meta.value ?? defaultVal;

  if (typeof meta.value === 'string'){
    dirtyVal = Boolean(+meta.value);
  }


  return (
    <FormControl>
      <FormControlLabel
      name={field.name}
      label={label}
      control={
        <Checkbox checked={dirtyVal} onClick={() => helpers.setValue(!meta.value)} />}

  />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );

};
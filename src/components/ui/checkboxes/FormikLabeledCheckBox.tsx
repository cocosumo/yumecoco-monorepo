import { FormControlLabel, Checkbox, FormControl, FormHelperText } from '@mui/material';
import { useField } from 'formik';

interface FormikLabeledCheckBoxProps {
  label?: string,
  name: string
  helperText?: string,
}

export const FormikLabeledCheckBox = (props : FormikLabeledCheckBoxProps) =>{
  const {
    label = '',
    helperText = '',
  } = props;

  const [field, meta, helpers] = useField(props);



  return (
    <FormControl>
      <FormControlLabel
      name={field.name}
      label={label}
      control={
        <Checkbox checked={meta.value ?? false} onClick={() => helpers.setValue(!meta.value)} />}

  />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );

};
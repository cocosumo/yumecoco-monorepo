import { FormControlLabel, Checkbox, FormControl, FormHelperText, CheckboxProps } from '@mui/material';

interface LabeledCheckBoxProps {
  label?: string,
  checked? : boolean,
  helperText?: string,
  setCheckedHandler?: ()=>void,
}

export function LabeledCheckBox(props : CheckboxProps & LabeledCheckBoxProps) {
  const {
    label = '',
    checked = false,
    setCheckedHandler,
    helperText,
  } = props;


  return (
    <FormControl>
      <FormControlLabel
        control={
          <Checkbox checked={checked} onChange={setCheckedHandler} />
}
        label={label}
      />
      <FormHelperText>
        {helperText}
      </FormHelperText>
    </FormControl>
  );
}
import { TextField, TextFieldProps } from '@mui/material';
import { useField } from 'formik';
import { JADatePicker } from './JADatePicker';

export const FormikJADatePicker = (
  props: TextFieldProps & {
    name: string
    disabled: boolean,
  },
) => {
  const { disabled, name, ...textFieldProps } = props;
  const [field, meta, helpers] = useField(name);
  const { value } = field;
  const { error, touched } = meta;
  const { setValue, setTouched } = helpers;


  const isShowError = touched && !!error;

  return (
    <JADatePicker
      disabled={disabled}
      /* Need to use null as empty string wont work when clearing the field.
      This is different with other fields where they
      become uncontrolled component when value becomes null. ~ ras 2022.10.03 */
      value={value || null}
      disablePast
      views={['year', 'month', 'day' ]}
      onChange={(v)=>{
        setValue(v ?? '', true);
        setTouched(true);
      }}
      InputProps={{
        label: 'hello',
      }}
      renderInput={(params) =>(
        <TextField
          {...params}
          {...textFieldProps}
          name={name}
          onBlur={() => setTouched(true, true)}
          error={isShowError}
          helperText={isShowError ? error : ''}
        />)}
    />
  );
};
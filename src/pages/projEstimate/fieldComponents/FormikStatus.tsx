import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { useField } from 'formik';

export const FormikStatus = (
  { name, options, handleChange, labelMain }:
  {
    name: string
    options: Options
    handleChange?: (newVal?: string) => void
    labelMain: string
  },
) => {
  const [field, meta] = useField(name);
  const { touched, error } = meta;

  return (
    <FormControl variant='outlined' fullWidth>
      <InputLabel id={`status_${name}`}>
        {labelMain}
      </InputLabel>
      <Select {...field} labelId={`status_${name}`} label={labelMain}
        onChange={(event) => {
          if (handleChange) handleChange(event.target.value);
          field.onChange(event);
        }}
      >
        <MenuItem value="">
          <em>
            -
          </em>
        </MenuItem>
        {options.map(({ label, value }) => {
          return (<MenuItem value={value} key={value}>
            {label}
          </MenuItem>);
        })}
      </Select>
      {(!!error && touched) &&
        <FormHelperText error={!!error && touched}>
          {error}
        </FormHelperText>}
    </FormControl>
  );
};
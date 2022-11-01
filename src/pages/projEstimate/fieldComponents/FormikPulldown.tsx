import { FormControl, FormHelperText, MenuItem, Select } from '@mui/material';
import { useField } from 'formik';

export const FormikPulldown = (
  { name,
    options,
    handleChange,
    disabled = false,
  }: {
    name: string,
    options: Options
    handleChange?: (newVal?: string) => void
    disabled?: boolean,
  },
) => {
  const [field, meta] = useField(name);
  const { touched, error } = meta;

  return (
    <FormControl variant="standard" size='small' fullWidth>
      <Select
        {...field}
        onChange={(event) => {

          if (handleChange) handleChange(event.target.value);
          field.onChange(event);
        }}
        disabled={disabled}
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
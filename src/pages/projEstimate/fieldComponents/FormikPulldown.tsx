import { FormControl, FormHelperText, MenuItem, Select } from '@mui/material';
import { useField } from 'formik';

export const FormikPulldown = (
  { name, options } :
  {
    name: string,
    options: Options
  },
) => {
  const [field, meta] = useField(name);
  const { touched, error } = meta;

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} size='small'>
      <Select {...field} >
        <MenuItem value="">
          <em>-</em>
        </MenuItem>
        {options.map(({ label, value }) => {
          return (<MenuItem value={value} key={value}>{label}</MenuItem>);
        })
          }
      </Select>
      {(!!error && touched) &&
      <FormHelperText error={!!error && touched}>
        {error}
      </FormHelperText>}
    </FormControl>
  );
};
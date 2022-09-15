import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { useField } from 'formik';
import { useMemo } from 'react';
import { getFieldName, statusChoices } from '../form';

export const FormikStatus = () => {
  const name = getFieldName('status');
  const [field, meta] = useField(name);
  const { touched, error } = meta;
  
  const options = statusChoices.map((c) => ({ label: c, value: c }));

  const optionMenu = useMemo(() => options.map((option) => {
    return (
      <MenuItem value={option.value} key={option.value}>
        {option.label}
      </MenuItem>
    );
  }), [options]);

  return (
    <FormControl variant='outlined' fullWidth>
      <InputLabel id={`status_${name}`}>
        {'ステータス'}
      </InputLabel>
      <Select {...field} labelId={`status_${name}`} label={'ステータス'}>
        {optionMenu}
      </Select>
      {(!!error && touched) &&
        <FormHelperText error={!!error && touched}>
          {error}
        </FormHelperText>}
    </FormControl>
  );
};
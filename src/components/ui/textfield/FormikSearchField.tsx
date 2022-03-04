import { TextField, Autocomplete, Stack } from '@mui/material';
import { useField } from 'formik';
import debounce from 'lodash.debounce';
import { useCallback, useState } from 'react';
import Caption from '../typographies/Caption';


interface FormikSearchFieldProps {
  name: string,
  label: string,
  helperText?: string,
  required?: boolean
  renderOptionsFn : (value: string) => Promise<SearchOptions[]>
  setRecord?: (record: any) => void
}

export interface SearchOptions {
  name: string,
  id: string,
  subTitle?: string,
  secondaryLabel?: string
  record?: any
}

const FormikSearchField = (props: FormikSearchFieldProps) => {
  const [options, setOptions] = useState<readonly SearchOptions[]>([]);
  const [field, meta, helpers] = useField(props);

  const handleChange = useCallback(debounce((value: string) => {
    console.log(value);
    props.renderOptionsFn(value)
      .then(res => setOptions(res));

  }, 1000), []);

  return (
    <Autocomplete

      onChange={ (_, newState) => {
        helpers.setValue(newState?.id ?? '');

        if (props.setRecord) props.setRecord(newState?.record);
      }}

      onBlur={field.onBlur}
      isOptionEqualToValue={(option, value) => {
        return option.id === value.id;
      }}

      getOptionLabel={(option) => option.name || ''}

      options={options}
      filterOptions={(x) => x}

      renderInput={(params) => <TextField name={props.name} label={props.label} {...params}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.error || props.helperText}
        onChange = {(ev) => {
          if (ev.target.value) {
            console.log(ev.target.value);
            handleChange(ev.target.value);
          }
        }}
        />
      }

      renderOption={(p, option) => {
        const key = `listItem-${option.id}`;
        return (
          <li {...p} key={key}>
            <Stack>
              {option.name}
              {option.subTitle && <Caption text={option.subTitle } />}
              {option.secondaryLabel && <Caption text={ `${option.secondaryLabel} id: ${option.id}`} />}
            </Stack>
          </li>
        );
      }}

    />


  );
};

export default FormikSearchField;
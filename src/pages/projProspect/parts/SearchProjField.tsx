import { Autocomplete, TextField, Stack } from '@mui/material';
import { useField } from 'formik';
import { useState } from 'react';
import { useLazyEffect } from '../../../hooks';
import { searchProjects } from '../api';
import { Caption } from '../../../components/ui/typographies';

type Opt = {
  id: string,
  projName: string
};

export const SearchProjField = (props: {
  name: string,
  label: string,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [fieldVal, setFieldVal] = useState<Opt | null>(null);
  const [options, setOptions] = useState<Array<Opt>>([]);

  const [field, meta, helpers] = useField(props);

  const { error, touched } = meta;

  useLazyEffect(()=>{
    if (!inputVal) return;
    searchProjects(inputVal)
      .then(r => {
        setOptions(r.map(({ $id, constructionName })=>{
          return { id: $id.value, projName: constructionName.value };
        }));
      });

  }, [inputVal], 1000);

  return (
    <Autocomplete
      value={fieldVal}
      onInputChange={(_, value)=>{
        setInputVal(value);
      }}
      onChange={(_, val)=>{
        helpers.setValue(val?.id);
        setFieldVal(val);

      }}

      options={options}
      getOptionLabel={(opt)=> opt.projName}
      isOptionEqualToValue={(opt, value) => opt.id === value.id}

      renderInput={(params) => <TextField
        {...params}
        name = {field.name}
        label={props.label}
        error={Boolean(error && touched)}
        helperText={error ? error : ''}
        />}
      renderOption={(p, opt) => {
        const key = `listItem-${opt.id}`;
        return (
          <li {...p} key={key}>
            <Stack>
              {opt.projName}
              <Caption text={`id: ${opt.id}` } />
            </Stack>
          </li>
        );
      }}

    />
  );
};
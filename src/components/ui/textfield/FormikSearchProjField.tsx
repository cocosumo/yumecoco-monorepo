import { Autocomplete, TextField, Stack, CircularProgress } from '@mui/material';
import { useField } from 'formik';
import { useEffect, useState } from 'react';
import { searchProjects } from '../../../api/kintone/construction';
import { useLazyEffect } from '../../../hooks';

import { Caption } from '../typographies';

type Opt = {
  id: string,
  projName: string
};

export const FormikSearchProjField = (props: {
  name: string,
  label: string,
  projName: string,
  disabled?: boolean,
  isLoading?: boolean
}) => {
  const [inputVal, setInputVal] = useState('');
  const [fieldVal, setFieldVal] = useState<Opt | null>(null);
  const [options, setOptions] = useState<Array<Opt>>([]);
  const [field, meta, helpers] = useField(props);
  const { error, touched } = meta;

  const {
    projName,
    isLoading = false,
    disabled = false,
  } = props;

  useLazyEffect(()=>{
    if (!inputVal) return;
    searchProjects(inputVal)
      .then(r => {
        setOptions(r.map((projRec)=>{
          const { $id, constructionName } = projRec;
          return {
            id: $id.value,
            projName: constructionName.value,
          };
        }));

      });

  }, [inputVal], 1000);

  useEffect(()=>{

    if (options.length === 0 && projName) {

      const singleOpt = { projName, id: field.value };
      setOptions([singleOpt]);
      setFieldVal(singleOpt);
    }

  }, [field.value, projName]);

  return (
    <Autocomplete
      disabled={disabled}
      value={fieldVal}
      onInputChange={(_, value)=>{
        setInputVal(value);
        if (!touched) helpers.setTouched(true);

      }}
      onBlur={()=>{
        if (!touched) helpers.setTouched(true);
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
        helperText={Boolean(error && touched) ? error : ''}
        InputProps={isLoading ?  { endAdornment: <CircularProgress size={20}/> } : params.InputProps }
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
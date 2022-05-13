import { Autocomplete, TextField, Stack } from '@mui/material';
import { useField } from 'formik';
import { useState } from 'react';
import { useLazyEffect } from '../../../hooks';
import { searchProjects } from '../api';
import { Caption } from '../../../components/ui/typographies';



export const SearchProjField = (props: {
  name: string,
  label: string,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [options, setOptions] = useState<Array<{
    id: string,
    projName: string
  }>>([]);

  const [field] = useField(props);

  useLazyEffect(()=>{
    if (!inputVal) return;
    searchProjects(inputVal)
      .then(r => {
        setOptions(r.map(({ $id, constructionName })=>{
          return { id: $id.value, projName: constructionName.value };
        }));
      });

  }, [inputVal], 1000);

  console.log(field.value);

  return (
    <Autocomplete
      onInputChange={(_, value)=>{
        setInputVal(value);
      }}
      options={options}
      getOptionLabel={(opt)=> opt.projName}
      isOptionEqualToValue={(opt, value) => opt.id === value.id}

      renderInput={(params) => <TextField {...params} label={props.label} />}
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
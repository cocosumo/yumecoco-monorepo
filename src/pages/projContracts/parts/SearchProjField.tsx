import { Autocomplete, TextField, Stack, Tooltip } from '@mui/material';
import { useField } from 'formik';
import { useEffect, useState } from 'react';
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
  projName: string,
  handleSearchTTOpen: ()=>void,
  handleSearchTTClose: ()=>void,
  searchTTOpen: boolean,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [fieldVal, setFieldVal] = useState<Opt | null>(null);
  const [options, setOptions] = useState<Array<Opt>>([]);
  const [field, meta, helpers] = useField(props);
  const { error, touched } = meta;

  const { projName, searchTTOpen, handleSearchTTOpen, handleSearchTTClose } = props;

  useLazyEffect(()=>{
    if (!inputVal) return;
    searchProjects(inputVal)
      .then(r => {
        setOptions(r.map(({ $id, constructionName })=>{
          return { id: $id.value, projName: constructionName.value };
        }));

      });

  }, [inputVal], 2000);

  useEffect(()=>{

    if (options.length === 0 && projName) {
      const singleOpt = { projName, id: field.value };
      setOptions([singleOpt]);
      setFieldVal(singleOpt);
    }

  }, [field.value, projName]);

  return (
    <Tooltip
      title="こちらで工事名が検索出来ます。"
      open={searchTTOpen} onOpen={handleSearchTTOpen}
      onClose={handleSearchTTClose}
      placement="right"
      arrow

    >
      <Autocomplete
      value={fieldVal}
      onInputChange={(_, value)=>{
        setInputVal(value);
      }}
      onChange={(_, val)=>{
        console.log('Onchange', val?.id);
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

    </Tooltip>
  );
};
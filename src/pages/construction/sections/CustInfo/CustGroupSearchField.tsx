import { Autocomplete, TextField, Stack } from '@mui/material';
import { KeyOfConstructionDetails } from './../../form';
import { useField } from 'formik';
import { useState } from 'react';
import { useLazyEffect } from '../../../../hooks';
import { getCustGroupOptions, SearchOption  } from '../../api/searchCustGroup';
import { Caption } from '../../../../components/ui/typographies';




export const CustGroupSearchField = () => {
  const name : KeyOfConstructionDetails = 'custGroupId';
  const [options, setOptions] = useState<readonly SearchOption[]>([]);
  const [fieldValue, setFieldValue] = useState<SearchOption | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [field, meta, helpers] = useField(name);

  const { onBlur } = field;
  const { setValue } = helpers;
  const { error, touched } = meta;

  useLazyEffect(()=>{
    if (inputValue){
      getCustGroupOptions(inputValue)
        .then(resp => setOptions(resp))
        .catch(err => console.error('Incorrect Input ', err.message));
    }
  }, [inputValue], 1000);

  const resolvedHelperText = touched && error ? error : '※顧客情報登録を先にしてください。';



  return (
    <Autocomplete
    noOptionsText="入力してください"
    value={fieldValue}
    onChange={(e, option: SearchOption) => {
      setFieldValue(option);
      setValue(option?.id || '');
    }}
    onBlur={onBlur}

    inputValue={inputValue}
    onInputChange={(_e: any, newValue, reason) => {
      console.log('reason', reason);
      setInputValue(newValue);

    }}

    filterOptions={(x) => x} // Fetching from server, need to disable the built-in filtering of the Autocomplete component by overriding the filterOptions prop..

    options={options}
    getOptionLabel={(option: SearchOption) => option.name || ''}
    isOptionEqualToValue={(option, value) => {
      return option.id === value.id;
    }}
    renderOption={(p, option: SearchOption) => {
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
    sx={{ width: 300 }}

    renderInput={(params) => <TextField
      {...params}
      name={name}
      label="氏名（検索）"
      error={Boolean(error && touched)}
      helperText={ resolvedHelperText }
      placeholder="山田　タロウ"

    />}
  />
  );
};
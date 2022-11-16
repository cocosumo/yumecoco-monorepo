import { Autocomplete, CircularProgress, Stack, TextField, TextFieldProps } from '@mui/material';
import { useSearchProjects } from 'kokoas-client/src/hooksQuery';
import { ComponentProps, useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { Caption } from '../typographies';


type Opt = {
  id: string,
  projName: string
};



export const SearchProjects = (props: Omit<ComponentProps<typeof Autocomplete<Opt>>, 'renderInput' | 'options'> & {
  label: string,
  name?: string
  inputProps?: TextFieldProps,

}) => {

  const {
    label,
    name,
    value,
    inputProps,
    fullWidth = true,
    onChange,
    onInputChange,
    ...autoCompleteProps
  } = props;
  
  const [hadFocus, setHadFocus] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [fieldVal, setFieldVal] = useState<typeof value>(value);
  const [options, setOptions] = useState<Array<Opt>>([]);
  const debouncedInput = useDebounce(inputVal, 1000);

  const { data: newOptions = [], isFetching } = useSearchProjects<Opt[]>(
    debouncedInput, 
    {
      enabled: hadFocus,
      select: (d) => d.map((projRec)=>{
        const { $id, projName: recProjName } = projRec;
        return {
          id: $id.value,
          projName: recProjName.value,
        };
      }),
    });

  useEffect(() => {
    if (newOptions?.length) {
      setOptions(newOptions);
    }
  }, [newOptions]);

  return (
    <Autocomplete
      {...autoCompleteProps}
      fullWidth={fullWidth}
      value={value ?? fieldVal ?? null}
      options={options}
      onFocus={() => setHadFocus(true)}
      onInputChange={onInputChange ? onInputChange : (_, val) => {
        setInputVal(val);
      }}
      onChange={onChange ? onChange : (_, val)=>{
        setFieldVal(val);
      }}
      getOptionLabel={(opt)=> opt.projName}
      isOptionEqualToValue={(opt, v) => opt.id === v.id}
      filterOptions={(x) => x}
      renderInput={(params) => (
        <TextField
          {...params}
          {...inputProps}
          label={label}
          name={name}
          fullWidth
          InputProps={isFetching ?  { endAdornment: <CircularProgress size={20} /> } : params.InputProps}
          placeholder="山田　タロウ"
        />)}
      renderOption={(p, opt) => {
        const key = `listItem-${opt.id}`;
        return (
          <li {...p} key={key}>
            <Stack>
              {opt.projName}
              <Caption text={`id: ${opt.id}`} />
            </Stack>
          </li>
        );
      }}

    />
  );

};
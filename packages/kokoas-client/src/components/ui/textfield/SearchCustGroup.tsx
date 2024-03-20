import { Autocomplete, TextField, Stack, CircularProgress, TextFieldProps } from '@mui/material';
import { format } from 'date-fns';
import { useSearchCustGroup } from 'kokoas-client/src/hooksQuery/useSearchCustGroup';
import { ComponentProps, useEffect, useState } from 'react';
import { ICustgroups } from 'types';
import { useDebounceValue } from 'usehooks-ts';

import { Caption } from '../typographies';

export interface SearchOption {
  name: string,
  id: string,
  subTitle?: string,
  secondaryLabel?: string
  record?: ICustgroups
}



export const SearchCustGroup = (props: Omit<ComponentProps<typeof Autocomplete<SearchOption>>, 'renderInput' | 'options'> & {
  inputProps: TextFieldProps,
}) => {
  const {
    value,
    inputProps,
    onChange,
    onInputChange,
    ...autoCompleteProps
  } = props;

  const [hadFocus, setHadFocus] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [fieldVal, setFieldVal] = useState<typeof value>(value);
  const [options, setOptions] = useState<Array<SearchOption>>([]);

  const [debouncedInput] = useDebounceValue(inputVal, 1000);

  const {
    data: newOptions,
    isFetching,
  } = useSearchCustGroup<SearchOption[]>(
    {
      easySearch: debouncedInput,
    },
    {
      enabled: hadFocus,
      select: (d) => d.map((record)=>{
        const { uuid, storeName, 作成日時, members } = record;
        const mainCust = members.value[0].value;
        const custNames = members.value.map((m) => m.value.customerName.value).join('、');

        return {
          name: custNames,
          id: uuid.value,
          subTitle: `${storeName.value} ${mainCust.address2.value}`,
          secondaryLabel: format(Date.parse(作成日時.value), 'yyyy-MM-dd' ),
          record: record,
        };

      }),
    },
  );

  useEffect(() => {
    if (newOptions?.length) {
      setOptions(newOptions);
    }
  }, [newOptions]);

  return (
    <Autocomplete
      {...autoCompleteProps}
      value={value ?? fieldVal ?? null}
      options={options}
      onFocus={() => setHadFocus(true)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      onInputChange={onInputChange ? onInputChange : (_, val) => {
        setInputVal(val);
      }}
      onChange={onChange ? onChange : (_, val)=>{
        setFieldVal(val);
      }}
      getOptionLabel={(opt) => opt.name}
      isOptionEqualToValue={(opt, val) => opt.id === val.id}
      filterOptions={(x) => x}
      sx={{
        width: 400,
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          {...inputProps}
          size='small'
          InputProps={isFetching ?  { 
            endAdornment: <CircularProgress size={20} />, 
          } : params.InputProps}
          placeholder="山田　タロウ"
          
        />)}
      renderOption={(p, opt) => {
        const key = `listItem-${opt.id}`;
        return (
          <li {...p} key={key}>
            <Stack>
              {opt.name}
              {opt.subTitle && <Caption text={opt.subTitle} />}
              {opt.secondaryLabel && <Caption text={`${opt.secondaryLabel} `} />}
            </Stack>
          </li>
        );
      }}

    />
  );
};
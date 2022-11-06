import { Autocomplete, TextField, Stack, CircularProgress, TextFieldProps } from '@mui/material';
import { format } from 'date-fns';
import { useSearchCustGroup } from 'kokoas-client/src/hooksQuery/useSearchCustGroup';
import { ComponentProps, useEffect, useState } from 'react';
import { ICustgroups } from 'types';
import { useDebounce } from 'usehooks-ts';

import { Caption } from '../typographies';

export interface SearchOption {
  name: string,
  id: string,
  subTitle?: string,
  secondaryLabel?: string
  record?: ICustgroups
}



export const SearchCustGroup = (props: Omit<ComponentProps<typeof Autocomplete<SearchOption>>, 'renderInput'> & {
  inputProps: TextFieldProps,
}) => {
  const {
    inputProps,
    ...autoCompleteProps
  } = props;


  const [inputVal, setInputVal] = useState('');
  const [fieldVal, setFieldVal] = useState<SearchOption | null>(null);
  const [options, setOptions] = useState<Array<SearchOption>>([]);

  const debouncedInput = useDebounce(inputVal, 1000);

  const { 
    data: newOptions, 
    isFetching,
  } = useSearchCustGroup<SearchOption[]>(
    {
      easySearch: debouncedInput,
    }, 
    {
      select: (d) => d.map((record)=>{
        const { $id, storeName, 作成日時, members, custNames } = record;
        const mainCust = members.value[0].value;
        const mainCustName = mainCust.customerName.value;

        return {
          name: custNames.value || mainCustName,
          id: $id.value,
          subTitle: `${storeName.value} ${mainCust.address2.value}`,
          secondaryLabel: format(Date.parse(作成日時.value), 'yyyy-MM-dd' ),
          record: record,
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
      value={fieldVal}
      options={options}
      onInputChange={(_, value)=>{
        setInputVal(value);
      }}
      getOptionLabel={(opt)=> opt.name}
      onChange={(_, val)=>{
        setFieldVal(val);
      }}
      isOptionEqualToValue={(opt, value) => opt.id === value.id}
      filterOptions={(x) => x}
      renderInput={(params) => (
        <TextField
          {...params}
          {...inputProps}
          InputProps={isFetching ?  { endAdornment: <CircularProgress size={20} /> } : params.InputProps}
          placeholder="山田　タロウ"
        />)}
      renderOption={(p, opt) => {
        const key = `listItem-${opt.id}`;
        return (
          <li {...p} key={key}>
            <Stack>
              {opt.name}
              {opt.subTitle && <Caption text={opt.subTitle} />}
              {opt.secondaryLabel && <Caption text={`${opt.secondaryLabel} id: ${opt.id}`} />}
            </Stack>
          </li>
        );
      }}

    />
  );
};
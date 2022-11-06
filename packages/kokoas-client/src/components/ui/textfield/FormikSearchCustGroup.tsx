import { Autocomplete, TextField, Stack, CircularProgress } from '@mui/material';
import { format } from 'date-fns';
import { useField } from 'formik';
import { useSearchCustGroup } from 'kokoas-client/src/hooksQuery/useSearchCustGroup';
import { useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';

import { Caption } from '../typographies';

export interface SearchOption {
  name: string,
  id: string,
  subTitle?: string,
  secondaryLabel?: string
  record?: any
}

export const FormikSearchCustGroup = (props: {
  name: string,
  label: string,
  custNames?: string,
  disabled?: boolean,
  handleChange?: () => void
}) => {
  const [inputVal, setInputVal] = useState('');
  const [fieldVal, setFieldVal] = useState<SearchOption | null>(null);
  const [options, setOptions] = useState<Array<SearchOption>>([]);
  const [field, meta, helpers] = useField(props);
  const { error, touched } = meta;

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
  

  const {
    custNames,
    disabled = false,
    label,
    handleChange,
  } = props;


  useEffect(()=>{
    if (!field.value) {
      setFieldVal(null);
    } else if (options.length === 0 && !!custNames) {
      const singleOpt = { name: custNames, id: field.value };
      setOptions([singleOpt]);
      setFieldVal(singleOpt);
    } else if (options.length === 1) {
      setFieldVal(options[0]);
    }

    /* When projId is already available, make it the sole option  */
    if (options.length === 0 && custNames) {
  
      const singleOpt = { name: custNames, id: field.value };
      setOptions([singleOpt]);
      setFieldVal(singleOpt);
    }

  }, [field.value, options, custNames]);

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
        handleChange?.();
      }}
      options={options}
      getOptionLabel={(opt)=> opt.name}
      isOptionEqualToValue={(opt, value) => opt.id === value.id}
      filterOptions={(x) => x}
      renderInput={(params) => (
        <TextField
          {...params}
          name={field.name}
          label={label}
          error={Boolean(error && touched)}
          helperText={error && touched ? error : ''}
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
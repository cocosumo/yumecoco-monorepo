import { Autocomplete, InputBase, Stack, Typography, createFilterOptions } from '@mui/material';
import { forwardRef, useMemo } from 'react';
import { EmpStatus, IEmployees } from 'types';

type Option = {
  empId: string,
  sortNumber: string,
  empName: string,
  mainStore: string,
  empNameReading: string,
  status: EmpStatus,
};

interface SearchByNameProps {
  selectedRecord: IEmployees | undefined,
  filteredData: IEmployees[] | undefined,
  onChange: (emdId: string | undefined) => void,
  onBlur?: () => void,
  name?: string,
}

const filterOptions = createFilterOptions({
  matchFrom: 'any',
  stringify: (option: Option) => option.empName + option.empNameReading,
});


export const SearchByName = forwardRef<HTMLInputElement, SearchByNameProps >(({
  selectedRecord,
  filteredData,
  onChange,
  onBlur,
  name,
}, ref) => {


  const options = useMemo(() => {
    return filteredData?.map<Option>(({ 
      uuid,
      文字列＿氏名: empName,
      氏名ふりがな: empNameReading,
      mainStore,
      sort: sortNumber,
      状態: status,
    }) => {
      return ({
        empId: uuid.value,
        sortNumber: sortNumber.value,
        empName: empName.value,
        empNameReading: empNameReading.value,
        mainStore: mainStore.value,
        status: status.value as EmpStatus,
      });
    }) || [];
  }, [filteredData]);


  const parsedValue = useMemo(() => {
    return selectedRecord 
      ? options
        ?.find(({ empId }) => empId === selectedRecord.uuid.value)
      : null;
  }, [selectedRecord, options]);

  return (
    <Autocomplete
      value={parsedValue}
      options={options}
      sx={{ ml: 1, flex: 1 }}
      filterOptions={filterOptions}
      getOptionLabel={(option) => option.empName}
      onBlur={onBlur}
      onChange={(_, newValue) => {
        const newRecord = filteredData?.find(({ uuid }) => uuid.value === newValue?.empId);
        onChange(newRecord?.uuid.value);
      }}
      renderOption={(
        props, 
        {
          empName,
          status,
          sortNumber,
        },
      ) => (
        <li {...props}>
          <Stack >
            {empName}            
            <Typography sx={{ color: 'text.secondary' }}>
              {sortNumber && `#${sortNumber} `}
              {status !== '有効'  && ('退職者')}
            </Typography>
            
          </Stack>
        </li>
      )}
      renderInput={(params) => {
        const { 
          InputLabelProps: _1, 
          InputProps: _2, 
          ...rest } = params;

        return (
          <InputBase 
            {...params.InputProps}
            {...rest}
            name={name}
            placeholder='氏名・ふりがな'
            inputRef={ref}
          />);
      }}
    />
  );
});

SearchByName.displayName = 'SearchByName';
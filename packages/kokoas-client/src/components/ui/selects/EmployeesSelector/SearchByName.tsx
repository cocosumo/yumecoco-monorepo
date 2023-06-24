import { Autocomplete, InputBase, Stack, Typography, createFilterOptions } from '@mui/material';
import { useAllEmployees } from 'kokoas-client/src/hooksQuery';
import { useMemo } from 'react';
import { EmpStatus, IEmployees } from 'types';

type Option = {
  empId: string,
  sortNumber: string,
  empName: string,
  mainStore: string,
  empNameReading: string,
  status: EmpStatus,
};

const filterOptions = createFilterOptions({
  matchFrom: 'any',
  stringify: (option: Option) => option.empName + option.empNameReading,
});


export const SearchByName = ({
  selectedRecord,
  onChange,
}:{
  selectedRecord: IEmployees | undefined,
  onChange: (empRecord: IEmployees | undefined) => void,
}) => {

  const { data } = useAllEmployees();

  const options = useMemo(() => {
    return data?.map<Option>(({ 
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
  }, [data]);


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
      onChange={(_, newValue) => {
        const newRecord = data?.find(({ uuid }) => uuid.value === newValue?.empId);
        onChange(newRecord);
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
            placeholder='氏名・ふりがな'
          />);
      }}
    />
  );
};
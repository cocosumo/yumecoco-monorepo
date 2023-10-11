import Divider from '@mui/material/Divider';
import { Box, FormHelperText, FormLabel, IconButton, Stack, Tooltip } from '@mui/material';
import { SearchByNumber } from './SearchByNumber';
import { forwardRef, useCallback, useMemo, useState } from 'react';
import { SearchByName } from './SearchByName';
import { FilterOptions, useFilteredEmployees } from './useFilteredEmployees';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IEmployees } from 'types';

interface EmployeeSelectorProps {
  label: string,
  /** 社員のuuid */
  value: string,
  onChange?: (
    /**　選択された社員のuuid */
    empId: string, 
    /** 社員のレコード */
    empRec?: IEmployees
  ) => void,
  onBlur?: () => void,
  filter?: FilterOptions,
  required?: boolean,
  error?: boolean,
  helperText?: string,
  name?: string,
}

export const EmployeeSelector = forwardRef<HTMLInputElement, EmployeeSelectorProps>(({
  label,
  value,
  onChange,
  onBlur,
  filter,
  required,
  error,
  helperText,
  name,
}, ref) => {

  const [includeInactive, setIncludeInactive] = useState(false);
  const { 
    data,
    filteredData,
  } = useFilteredEmployees({
    ...filter,
    includeInactive,
    initialEmpId: value,
  });



  const selectedEmpRecord = useMemo(() => {
    if (!data) return undefined;
    return data.find((empRecord) => empRecord.uuid.value === value);
  }, [data, value]);

  const {
    sort: sortNumber,
  } = selectedEmpRecord || {};
  
  const handleChange = useCallback(
    (empId: string | undefined ) => {
      if (onChange) {
        onChange(empId || '', data?.find((empRecord) => empRecord.uuid.value === empId));
      }
    }, 
    [onChange, data],
  );

  return (
    <Stack spacing={0.4} width={300}>
    
      <FormLabel 
        required={required}
        error={error}
      >
        {label}
      </FormLabel>
    
      <Box
        sx={{ 
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: error ? 'red' : 'grey.500',
          borderRadius: 1,
          p: '0px 4px', 
          display: 'flex', 
          alignItems: 'center', 
        }}
      >
        <SearchByNumber 
          empSortNumber={sortNumber?.value || ''}
          onChange={handleChange}
          onBlur={onBlur}
        />

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

        <SearchByName
          name={name}
          onChange={handleChange}
          selectedRecord={selectedEmpRecord}
          filteredData={filteredData}
          onBlur={onBlur}
          ref={ref}
        />

        <Tooltip 
          title={`退職者を${includeInactive ? '非表示' : '表示'}`}
          onClick={() => setIncludeInactive((prev) => !prev)}
        >
          <IconButton size='small'>
            {includeInactive && <VisibilityIcon />}
            {!includeInactive && <VisibilityOffIcon />}
          </IconButton>
        </Tooltip>
      </Box>
      <FormHelperText error={error}>
        {helperText}
      </FormHelperText>
    </Stack>
  );
});

EmployeeSelector.displayName = 'EmployeeSelector';
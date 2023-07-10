import Divider from '@mui/material/Divider';
import { Box, FormLabel, IconButton, Stack, Tooltip } from '@mui/material';
import { SearchByNumber } from './SearchByNumber';
import { useCallback, useMemo, useState } from 'react';
import { SearchByName } from './SearchByName';
import { FilterOptions, useFilteredEmployees } from './useFilteredEmployees';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';


export const EmployeeSelector = ({
  label,
  value,
  onChange,
  onBlur,
  filter,
  required,
}:{
  label: string,
  /** 社員のuuid */
  value: string,
  onChange?: (empId: string,) => void,
  onBlur?: () => void,
  filter?: FilterOptions,
  required?: boolean,
}) => {
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
    (empId: string | undefined) => {
      if (onChange) {
        onChange(empId || '');
      }
    }, 
    [onChange],
  );

  return (
    <Stack spacing={0.5} width={300}>
    
      <FormLabel required={required}>
        {label}
      </FormLabel>
    
      <Box
        sx={{ 
          bgcolor: 'background.paper',
          border: '1px solid #ced4da',
          borderRadius: 1,
          p: '2px 4px', 
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
          onChange={handleChange}
          selectedRecord={selectedEmpRecord}
          filteredData={filteredData}
          onBlur={onBlur}
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
    </Stack>
  );
};
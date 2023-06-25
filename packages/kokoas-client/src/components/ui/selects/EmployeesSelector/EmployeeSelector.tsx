import Divider from '@mui/material/Divider';
import { Box, FormLabel, Stack } from '@mui/material';
import { SearchByNumber } from './SearchByNumber';
import { useCallback, useState } from 'react';
import { IEmployees } from 'types';
import { SearchByName } from './SearchByName';
import { OpenPicker } from './OpenPicker';

export const EmployeeSelector = ({
  onChange,
}:{
  onChange?: (empId: string, empRecord: IEmployees | undefined) => void,
}) => {
  const [selectedEmpRecord, setEmpRecord] = useState<IEmployees | undefined>(undefined);
  
  const handleChange = useCallback(
    (newEmpRecord: IEmployees | undefined) => {
      setEmpRecord(newEmpRecord);
      if (onChange) {
        onChange(newEmpRecord?.uuid.value || '', newEmpRecord);
      }
    }, 
    [onChange],
  );

  const {
    sort: sortNumber,
  } = selectedEmpRecord || {};


  return (
    <Stack spacing={0.5} width={300}>
    
      <FormLabel>
        従業員
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
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <SearchByName
          onChange={handleChange}
          selectedRecord={selectedEmpRecord}
        />
        <OpenPicker />
      </Box>
    </Stack>
  );
};
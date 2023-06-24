import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Box, FormLabel, Stack } from '@mui/material';
import { SearchByNumber } from './SearchByNumber';
import { useCallback, useState } from 'react';
import { IEmployees } from 'types';

export const EmployeeSelector = () => {
  const [selectedEmpRecord, setEmpRecord] = useState<IEmployees | undefined>(undefined);
  
  const handleChange = useCallback(
    (newEmpRecord: IEmployees | undefined) => {
      setEmpRecord(newEmpRecord);
    }, 
    [],
  );

  const {
    sort: sortNumber,
  } = selectedEmpRecord || {};

  console.log(selectedEmpRecord);

  return (
    <Stack spacing={0.5}>
    
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
          minWidth: 280,
        }}
      >
        <SearchByNumber 
          empSortNumber={sortNumber?.value || ''}
          onChange={handleChange}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="氏名"
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Box>
    </Stack>
  );
};
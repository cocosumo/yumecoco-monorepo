import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

export const SelectYear = () => {
  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <FormControl 
      fullWidth
      size='small'
      sx={{
        maxWidth: '150px',
      }}
    >
      <InputLabel id="demo-simple-select-label">
        年度
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value={10}>
          2023
        </MenuItem>
        <MenuItem value={20}>
          2022
        </MenuItem>
        <MenuItem value={30}>
          2021
        </MenuItem>
      </Select>
    </FormControl>
  );
};
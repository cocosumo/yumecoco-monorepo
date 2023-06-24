import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export const CocoConstSelect = () => {

  return (
    <FormControl 
      size='small'
      sx={{
        width: 300,
      }}
    >
      <InputLabel>
        工事種別
      </InputLabel>
      <Select
      //value={age}
        label="工事担当者"
      >
        <MenuItem value={10}>
          Ten
        </MenuItem>
        <MenuItem value={20}>
          Twenty
        </MenuItem>
        <MenuItem value={30}>
          Thirty
        </MenuItem>
      </Select>

    </FormControl>
  );
};
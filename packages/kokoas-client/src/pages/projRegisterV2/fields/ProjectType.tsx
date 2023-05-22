import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export const ProjectType = () => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">
        工事種別
      </InputLabel>
      <Select
        //value={age}
        label="Age"
        //onChange={handleChange}
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
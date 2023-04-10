import { Autocomplete, TextField } from '@mui/material';

export const AutoLookup = ({
  options,
  label,
} : {
  label: string,
  options: Array<{
    label: string,
    id: string,
  }>
}) => {

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );

};
import {  Checkbox, FormControl, FormControlLabel, InputAdornment, Stack, TextField } from '@mui/material';

export const PaymentField = () => {

  return (

    <FormControl>
      <Stack direction={'row'} spacing={1}>
        <FormControlLabel control={<Checkbox size={'medium'} />} label={'契約金'} />
        <TextField
          variant={'standard'}
          inputProps={{
            style: { textAlign: 'right' },
          }}
          InputProps={{

            endAdornment: (
              <InputAdornment position="end">
                円
              </InputAdornment>),
          }}
        />

      </Stack>
    </FormControl>


  );
};